/**
 * CIDADÃO.AI - Dashboard Module
 * Handles dashboard data loading, metrics, and visualizations
 */

let dashboardCharts = {};
let dashboardData = {};
let refreshInterval;

/**
 * Initialize Dashboard
 */
async function loadDashboard() {
    console.log('📊 Loading dashboard...');
    
    try {
        // Show loading states
        CidadaoAI.utils.setElementLoading('recent-activity', true);
        
        // Load dashboard data in parallel
        await Promise.all([
            loadDashboardMetrics(),
            loadRecentActivity(),
            loadSystemHealthDisplay()
        ]);
        
        // Initialize charts after data is loaded
        initializeDashboardCharts();
        
        // Set up auto-refresh
        setupDashboardRefresh();
        
        console.log('✅ Dashboard loaded successfully');
        
    } catch (error) {
        console.error('❌ Failed to load dashboard:', error);
        CidadaoAI.utils.showNotification('Erro ao carregar dashboard', 'error');
    }
}

/**
 * Load Key Metrics
 */
async function loadDashboardMetrics() {
    try {
        // Get metrics from multiple endpoints
        const [investigations, health, reports] = await Promise.all([
            CidadaoAI.api.getInvestigations({ limit: 100 }),
            CidadaoAI.api.getHealth(),
            CidadaoAI.api.getReports({ limit: 100 })
        ]);
        
        // Calculate metrics
        const metrics = calculateMetrics(investigations, reports);
        
        // Update metric cards
        updateMetricCards(metrics);
        
        // Store for charts
        dashboardData.metrics = metrics;
        dashboardData.investigations = investigations;
        dashboardData.reports = reports;
        
    } catch (error) {
        console.error('Failed to load metrics:', error);
        // Show placeholder values
        updateMetricCards({
            activeInvestigations: '--',
            anomaliesFound: '--',
            reportsGenerated: '--',
            totalAnalyzed: '--'
        });
    }
}

function calculateMetrics(investigations, reports) {
    const activeInvestigations = investigations.filter(inv => 
        ['pending', 'running'].includes(inv.status)
    ).length;
    
    const anomaliesFound = investigations.reduce((total, inv) => 
        total + (inv.anomalies_detected || 0), 0
    );
    
    const reportsGenerated = reports.length;
    
    const totalAnalyzed = investigations.reduce((total, inv) => 
        total + (inv.total_records_analyzed || 0), 0
    );
    
    return {
        activeInvestigations,
        anomaliesFound,
        reportsGenerated,
        totalAnalyzed: CidadaoAI.utils.formatNumber(totalAnalyzed)
    };
}

function updateMetricCards(metrics) {
    const elements = {
        'active-investigations': metrics.activeInvestigations,
        'anomalies-found': metrics.anomaliesFound,
        'reports-generated': metrics.reportsGenerated,
        'total-analyzed': metrics.totalAnalyzed
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
            
            // Add animation effect
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    });
}

/**
 * Load Recent Activity
 */
async function loadRecentActivity() {
    try {
        const container = document.getElementById('recent-activity');
        if (!container) return;
        
        // Get recent investigations and reports
        const [investigations, reports] = await Promise.all([
            CidadaoAI.api.getInvestigations({ limit: 10 }),
            CidadaoAI.api.getReports({ limit: 10 })
        ]);
        
        // Combine and sort by date
        const activities = [
            ...investigations.map(inv => ({
                type: 'investigation',
                id: inv.investigation_id,
                title: inv.query || 'Investigação',
                status: inv.status,
                timestamp: inv.started_at,
                icon: 'fa-search'
            })),
            ...reports.map(report => ({
                type: 'report',
                id: report.report_id,
                title: report.title || 'Relatório',
                status: report.status,
                timestamp: report.generated_at || report.started_at,
                icon: 'fa-file-alt'
            }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Render activity feed
        container.innerHTML = activities.length > 0 
            ? activities.slice(0, 8).map(renderActivityItem).join('')
            : '<div class="text-center text-muted py-4">Nenhuma atividade recente</div>';
            
    } catch (error) {
        console.error('Failed to load recent activity:', error);
        const container = document.getElementById('recent-activity');
        if (container) {
            container.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Erro ao carregar atividades
                </div>
            `;
        }
    }
}

function renderActivityItem(activity) {
    const timeAgo = getTimeAgo(activity.timestamp);
    const statusBadge = CidadaoAI.utils.getStatusBadge(activity.status);
    
    return `
        <div class="activity-item">
            <div class="d-flex justify-content-between align-items-start">
                <div class="flex-grow-1">
                    <div class="d-flex align-items-center mb-1">
                        <i class="fas ${activity.icon} text-primary me-2"></i>
                        <strong class="me-2">${activity.title}</strong>
                        ${statusBadge}
                    </div>
                    <div class="activity-time">${timeAgo}</div>
                </div>
                <div class="activity-actions">
                    <button class="btn btn-sm btn-outline-primary" 
                            onclick="viewActivityDetails('${activity.type}', '${activity.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    return `${diffDays}d atrás`;
}

/**
 * System Health Display
 */
async function loadSystemHealthDisplay() {
    try {
        const health = await CidadaoAI.api.getDetailedHealth();
        
        const container = document.getElementById('system-health');
        if (!container) return;
        
        const services = health.external_services || {};
        const healthItems = Object.entries(services).map(([service, data]) => `
            <div class="health-item">
                <span>${formatServiceName(service)}</span>
                <span class="health-status ${data.status}">${data.status}</span>
            </div>
        `);
        
        container.innerHTML = `
            <div class="health-item">
                <span>API Status</span>
                <span class="health-status ${health.overall_status}">${health.overall_status}</span>
            </div>
            <div class="health-item">
                <span>Uptime</span>
                <span class="text-muted">${CidadaoAI.utils.formatDuration(health.api?.uptime_seconds || 0)}</span>
            </div>
            <div class="health-item">
                <span>Version</span>
                <span class="text-muted">${health.api?.version || '1.0.0'}</span>
            </div>
            ${healthItems.join('')}
        `;
        
    } catch (error) {
        console.error('Failed to load system health:', error);
    }
}

function formatServiceName(service) {
    const names = {
        'transparency_api': 'Portal Transparência',
        'database': 'Base de Dados',
        'redis': 'Cache Redis'
    };
    return names[service] || service;
}

/**
 * Dashboard Charts
 */
function initializeDashboardCharts() {
    // Anomaly Trends Chart
    initializeAnomalyTrendsChart();
    
    // Anomaly Types Chart
    initializeAnomalyTypesChart();
}

function initializeAnomalyTrendsChart() {
    const ctx = document.getElementById('anomalyTrendsChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (dashboardCharts.anomalyTrends) {
        dashboardCharts.anomalyTrends.destroy();
    }
    
    // Generate sample data (replace with real data)
    const data = generateAnomalyTrendsData();
    
    dashboardCharts.anomalyTrends = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Anomalias Detectadas',
                data: data.values,
                borderColor: '#0066cc',
                backgroundColor: 'rgba(0, 102, 204, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initializeAnomalyTypesChart() {
    const ctx = document.getElementById('anomalyTypesChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (dashboardCharts.anomalyTypes) {
        dashboardCharts.anomalyTypes.destroy();
    }
    
    // Generate sample data (replace with real data)
    const data = generateAnomalyTypesData();
    
    dashboardCharts.anomalyTypes = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    '#0066cc',
                    '#198754',
                    '#ffc107',
                    '#dc3545',
                    '#6f42c1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function generateAnomalyTrendsData() {
    const labels = [];
    const values = [];
    
    // Last 30 days
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }));
        values.push(Math.floor(Math.random() * 20) + 5);
    }
    
    return { labels, values };
}

function generateAnomalyTypesData() {
    return {
        labels: ['Preço', 'Fornecedor', 'Temporal', 'Pagamento', 'Outros'],
        values: [45, 25, 15, 10, 5]
    };
}

/**
 * Dashboard Refresh
 */
function setupDashboardRefresh() {
    // Clear existing interval
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
    
    // Set up new interval (every 30 seconds)
    refreshInterval = setInterval(() => {
        if (CidadaoAI.state.currentSection === 'dashboard') {
            loadDashboardMetrics();
            loadRecentActivity();
        }
    }, 30000);
}

/**
 * Activity Actions
 */
function viewActivityDetails(type, id) {
    switch (type) {
        case 'investigation':
            // Navigate to investigations section and show details
            navigateToSection('investigations');
            // TODO: Show investigation details modal
            break;
        case 'report':
            // Navigate to reports section and show details
            navigateToSection('reports');
            // TODO: Show report details modal
            break;
    }
}

/**
 * Export functions
 */
window.loadDashboard = loadDashboard;
window.refreshActivity = function() {
    loadRecentActivity();
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
    
    // Destroy charts
    Object.values(dashboardCharts).forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
});