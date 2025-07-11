/**
 * CIDADÃO.AI - Main JavaScript
 * Handles navigation, global functions, and app initialization
 */

// Global App State
window.CidadaoAI = {
    config: {
        apiBaseUrl: 'http://localhost:8000',
        version: '1.0.0',
        refreshInterval: 30000, // 30 seconds
    },
    state: {
        currentSection: 'dashboard',
        user: null,
        systemStatus: 'unknown',
        activeInvestigations: new Map(),
        activeAnalyses: new Map(),
        notifications: []
    },
    cache: new Map(),
    charts: new Map()
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Cidadão.AI Frontend v' + CidadaoAI.config.version + ' - Initializing...');
    
    initializeNavigation();
    initializeSystemMonitoring();
    initializeNotifications();
    
    // Load initial data
    loadDashboard();
    
    console.log('✅ Cidadão.AI Frontend initialized successfully');
});

/**
 * Navigation Management
 */
function initializeNavigation() {
    // Handle navigation clicks
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            navigateToSection(section);
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.section) {
            navigateToSection(e.state.section, false);
        }
    });
    
    // Set initial state
    const hash = window.location.hash.substr(1);
    if (hash && ['dashboard', 'investigations', 'analysis', 'reports'].includes(hash)) {
        navigateToSection(hash, false);
    }
}

function navigateToSection(sectionName, updateHistory = true) {
    // Update navigation state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        CidadaoAI.state.currentSection = sectionName;
        
        // Load section-specific data
        loadSectionData(sectionName);
        
        // Update URL
        if (updateHistory) {
            history.pushState({section: sectionName}, '', `#${sectionName}`);
        }
    }
}

function loadSectionData(sectionName) {
    switch (sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'investigations':
            loadInvestigations();
            break;
        case 'analysis':
            loadAnalysis();
            break;
        case 'reports':
            loadReports();
            break;
    }
}

/**
 * System Monitoring
 */
function initializeSystemMonitoring() {
    // Check system health on load
    checkSystemHealth();
    
    // Set up periodic health checks
    setInterval(checkSystemHealth, CidadaoAI.config.refreshInterval);
}

async function checkSystemHealth() {
    try {
        const response = await fetch(`${CidadaoAI.config.apiBaseUrl}/health`);
        const data = await response.json();
        
        updateSystemStatus(data.status);
        
        // Update detailed health info if on dashboard
        if (CidadaoAI.state.currentSection === 'dashboard') {
            updateSystemHealthDisplay(data);
        }
        
    } catch (error) {
        console.error('❌ Health check failed:', error);
        updateSystemStatus('error');
    }
}

function updateSystemStatus(status) {
    const statusElement = document.getElementById('system-status');
    if (!statusElement) return;
    
    // Remove existing classes
    statusElement.className = 'badge';
    
    // Update based on status
    switch (status) {
        case 'healthy':
            statusElement.classList.add('bg-success');
            statusElement.innerHTML = '<i class="fas fa-circle me-1"></i>Sistema Online';
            break;
        case 'degraded':
            statusElement.classList.add('bg-warning');
            statusElement.innerHTML = '<i class="fas fa-exclamation-triangle me-1"></i>Sistema Degradado';
            break;
        case 'error':
        default:
            statusElement.classList.add('bg-danger');
            statusElement.innerHTML = '<i class="fas fa-times-circle me-1"></i>Sistema Offline';
            break;
    }
    
    CidadaoAI.state.systemStatus = status;
}

function updateSystemHealthDisplay(healthData) {
    const container = document.getElementById('system-health');
    if (!container) return;
    
    container.innerHTML = `
        <div class="health-item">
            <span>API Status</span>
            <span class="health-status ${healthData.status}">${healthData.status}</span>
        </div>
        <div class="health-item">
            <span>Uptime</span>
            <span class="text-muted">${formatDuration(healthData.uptime)}</span>
        </div>
        <div class="health-item">
            <span>Version</span>
            <span class="text-muted">${healthData.version}</span>
        </div>
    `;
}

/**
 * Notification System
 */
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.className = 'position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 5000) {
    const id = Date.now();
    const notification = document.createElement('div');
    notification.className = `toast slide-in-up`;
    notification.setAttribute('data-bs-autohide', duration > 0);
    notification.setAttribute('data-bs-delay', duration);
    
    const typeIcons = {
        success: 'fa-check-circle text-success',
        error: 'fa-exclamation-circle text-danger',
        warning: 'fa-exclamation-triangle text-warning',
        info: 'fa-info-circle text-info'
    };
    
    notification.innerHTML = `
        <div class="toast-header">
            <i class="fas ${typeIcons[type] || typeIcons.info} me-2"></i>
            <strong class="me-auto">Cidadão.AI</strong>
            <small class="text-muted">agora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    document.getElementById('notifications-container').appendChild(notification);
    
    const toastInstance = new bootstrap.Toast(notification);
    toastInstance.show();
    
    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration + 1000);
    }
    
    // Store in state
    CidadaoAI.state.notifications.push({
        id,
        message,
        type,
        timestamp: new Date()
    });
}

/**
 * Loading States
 */
function showLoading(show = true) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        if (show) {
            overlay.classList.remove('d-none');
        } else {
            overlay.classList.add('d-none');
        }
    }
}

function setElementLoading(elementId, loading = true) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (loading) {
        element.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
                <p class="mt-2 text-muted">Carregando dados...</p>
            </div>
        `;
    }
}

/**
 * Progress Modal
 */
function showProgressModal(title, onCancel = null) {
    const modal = document.getElementById('progressModal');
    const modalTitle = document.getElementById('progressModalTitle');
    
    if (modalTitle) modalTitle.textContent = title;
    
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Reset progress
    updateProgress(0, 'Iniciando...', '--');
    
    return modalInstance;
}

function updateProgress(percentage, status, phase, logMessage = null) {
    const progressBar = document.getElementById('progressBar');
    const progressStatus = document.getElementById('progressStatus');
    const progressPhase = document.getElementById('progressPhase');
    const progressLog = document.getElementById('progressLog');
    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
    }
    
    if (progressStatus) progressStatus.textContent = status;
    if (progressPhase) progressPhase.textContent = phase;
    
    if (logMessage && progressLog) {
        const logEntry = document.createElement('div');
        logEntry.className = 'text-muted small mb-1';
        logEntry.innerHTML = `<i class="fas fa-chevron-right me-1"></i>${logMessage}`;
        progressLog.appendChild(logEntry);
        
        // Auto-scroll to bottom
        progressLog.scrollTop = progressLog.scrollHeight;
    }
}

/**
 * Utility Functions
 */
function formatCurrency(value, currency = 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

function formatDuration(seconds) {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
    return `${Math.round(seconds / 86400)}d`;
}

function getStatusBadge(status) {
    const badges = {
        'pending': '<span class="status-indicator status-pending"><i class="fas fa-clock"></i>Pendente</span>',
        'running': '<span class="status-indicator status-running"><i class="fas fa-spinner fa-spin"></i>Executando</span>',
        'completed': '<span class="status-indicator status-completed"><i class="fas fa-check"></i>Concluído</span>',
        'failed': '<span class="status-indicator status-failed"><i class="fas fa-times"></i>Falhou</span>',
        'cancelled': '<span class="status-indicator status-pending"><i class="fas fa-ban"></i>Cancelado</span>'
    };
    
    return badges[status] || badges['pending'];
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Cache Management
 */
function getCachedData(key, maxAge = 300000) { // 5 minutes default
    const cached = CidadaoAI.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < maxAge) {
        return cached.data;
    }
    return null;
}

function setCachedData(key, data) {
    CidadaoAI.cache.set(key, {
        data,
        timestamp: Date.now()
    });
}

function clearCache() {
    CidadaoAI.cache.clear();
    showNotification('Cache limpo com sucesso', 'success');
}

/**
 * Error Handling
 */
function handleApiError(error, context = '') {
    console.error(`❌ API Error${context ? ` (${context})` : ''}:`, error);
    
    let message = 'Ocorreu um erro inesperado';
    
    if (error.response) {
        // Server responded with error status
        switch (error.response.status) {
            case 401:
                message = 'Sessão expirada. Faça login novamente.';
                break;
            case 403:
                message = 'Acesso negado. Verifique suas permissões.';
                break;
            case 404:
                message = 'Recurso não encontrado.';
                break;
            case 429:
                message = 'Muitas requisições. Tente novamente em alguns instantes.';
                break;
            case 500:
                message = 'Erro interno do servidor. Tente novamente mais tarde.';
                break;
            default:
                message = `Erro ${error.response.status}: ${error.response.statusText}`;
        }
    } else if (error.request) {
        // Network error
        message = 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    
    showNotification(message, 'error');
    
    return {
        success: false,
        error: message,
        originalError: error
    };
}

/**
 * Global Refresh Functions
 */
function refreshActivity() {
    if (CidadaoAI.state.currentSection === 'dashboard') {
        loadRecentActivity();
    }
}

function refreshInvestigations() {
    if (CidadaoAI.state.currentSection === 'investigations') {
        loadInvestigations();
    }
}

function refreshReports() {
    if (CidadaoAI.state.currentSection === 'reports') {
        loadReports();
    }
}

/**
 * Keyboard Shortcuts
 */
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case '1':
                e.preventDefault();
                navigateToSection('dashboard');
                break;
            case '2':
                e.preventDefault();
                navigateToSection('investigations');
                break;
            case '3':
                e.preventDefault();
                navigateToSection('analysis');
                break;
            case '4':
                e.preventDefault();
                navigateToSection('reports');
                break;
            case 'r':
                e.preventDefault();
                location.reload();
                break;
        }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
        });
    }
});

/**
 * Export functions for global access
 */
window.CidadaoAI.utils = {
    formatCurrency,
    formatNumber,
    formatDate,
    formatDuration,
    getStatusBadge,
    showNotification,
    showLoading,
    setElementLoading,
    showProgressModal,
    updateProgress,
    handleApiError,
    getCachedData,
    setCachedData,
    clearCache,
    debounce,
    throttle
};

// Development helpers
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    window.CidadaoAI.dev = {
        simulateError: () => showNotification('Erro simulado para teste', 'error'),
        simulateSuccess: () => showNotification('Sucesso simulado para teste', 'success'),
        clearCache: clearCache,
        getState: () => CidadaoAI.state,
        getCache: () => CidadaoAI.cache
    };
    
    console.log('🔧 Development mode enabled. Use CidadaoAI.dev for debugging.');
}