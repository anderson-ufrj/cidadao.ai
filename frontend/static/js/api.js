/**
 * CIDADÃO.AI - API Client
 * Handles all communication with the backend API
 */

class CidadaoAPI {
    constructor(baseUrl = 'http://localhost:8000') {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.authToken = null;
        this.apiKey = null;
        
        // Rate limiting
        this.requestQueue = [];
        this.isProcessingQueue = false;
        this.maxRequestsPerSecond = 10;
        
        // Request interceptors
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }
    
    /**
     * Authentication
     */
    setAuthToken(token) {
        this.authToken = token;
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    setApiKey(key) {
        this.apiKey = key;
        this.defaultHeaders['X-API-Key'] = key;
    }
    
    clearAuth() {
        this.authToken = null;
        this.apiKey = null;
        delete this.defaultHeaders['Authorization'];
        delete this.defaultHeaders['X-API-Key'];
    }
    
    /**
     * Core HTTP Methods
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: { ...this.defaultHeaders, ...(options.headers || {}) },
            ...options
        };
        
        // Apply request interceptors
        for (const interceptor of this.requestInterceptors) {
            await interceptor(config);
        }
        
        try {
            const response = await fetch(url, config);
            
            // Apply response interceptors
            for (const interceptor of this.responseInterceptors) {
                await interceptor(response);
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
            
        } catch (error) {
            console.error(`API Request failed: ${endpoint}`, error);
            throw error;
        }
    }
    
    async get(endpoint, params = {}) {
        const searchParams = new URLSearchParams(params);
        const url = searchParams.toString() ? `${endpoint}?${searchParams}` : endpoint;
        return this.request(url, { method: 'GET' });
    }
    
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
    
    /**
     * Streaming Support
     */
    async streamRequest(endpoint, onMessage, onError = null, onComplete = null) {
        const url = `${this.baseUrl}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                headers: this.defaultHeaders,
                method: 'GET'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                    if (onComplete) onComplete();
                    break;
                }
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            onMessage(data);
                        } catch (parseError) {
                            console.warn('Failed to parse SSE data:', line);
                        }
                    }
                }
            }
            
        } catch (error) {
            console.error('Stream request failed:', error);
            if (onError) onError(error);
        }
    }
    
    /**
     * Health Check
     */
    async getHealth() {
        return this.get('/health');
    }
    
    async getDetailedHealth() {
        return this.get('/health/detailed');
    }
    
    /**
     * Investigations API
     */
    async startInvestigation(data) {
        return this.post('/api/v1/investigations/start', data);
    }
    
    async getInvestigations(params = {}) {
        return this.get('/api/v1/investigations/', params);
    }
    
    async getInvestigation(id) {
        return this.get(`/api/v1/investigations/${id}/results`);
    }
    
    async getInvestigationStatus(id) {
        return this.get(`/api/v1/investigations/${id}/status`);
    }
    
    async cancelInvestigation(id) {
        return this.delete(`/api/v1/investigations/${id}`);
    }
    
    streamInvestigation(id, onMessage, onError, onComplete) {
        return this.streamRequest(
            `/api/v1/investigations/stream/${id}`,
            onMessage,
            onError,
            onComplete
        );
    }
    
    /**
     * Analysis API
     */
    async startAnalysis(data) {
        return this.post('/api/v1/analysis/start', data);
    }
    
    async getAnalyses(params = {}) {
        return this.get('/api/v1/analysis/', params);
    }
    
    async getAnalysis(id) {
        return this.get(`/api/v1/analysis/${id}/results`);
    }
    
    async getAnalysisStatus(id) {
        return this.get(`/api/v1/analysis/${id}/status`);
    }
    
    async getTrends(params = {}) {
        return this.get('/api/v1/analysis/trends', params);
    }
    
    async getCorrelations(params = {}) {
        return this.get('/api/v1/analysis/correlations', params);
    }
    
    async getPatterns(params = {}) {
        return this.get('/api/v1/analysis/patterns', params);
    }
    
    /**
     * Reports API
     */
    async generateReport(data) {
        return this.post('/api/v1/reports/generate', data);
    }
    
    async getReports(params = {}) {
        return this.get('/api/v1/reports/', params);
    }
    
    async getReport(id) {
        return this.get(`/api/v1/reports/${id}`);
    }
    
    async getReportStatus(id) {
        return this.get(`/api/v1/reports/${id}/status`);
    }
    
    async downloadReport(id, format = 'html') {
        const response = await fetch(`${this.baseUrl}/api/v1/reports/${id}/download?format=${format}`, {
            headers: this.defaultHeaders,
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response.blob();
    }
    
    async deleteReport(id) {
        return this.delete(`/api/v1/reports/${id}`);
    }
    
    async getReportTemplates() {
        return this.get('/api/v1/reports/templates');
    }
    
    /**
     * Batch Operations
     */
    async batchRequest(requests) {
        const promises = requests.map(req => {
            switch (req.method) {
                case 'GET':
                    return this.get(req.endpoint, req.params);
                case 'POST':
                    return this.post(req.endpoint, req.data);
                case 'PUT':
                    return this.put(req.endpoint, req.data);
                case 'DELETE':
                    return this.delete(req.endpoint);
                default:
                    throw new Error(`Unsupported method: ${req.method}`);
            }
        });
        
        return Promise.allSettled(promises);
    }
    
    /**
     * File Upload/Download Helpers
     */
    async downloadFile(url, filename) {
        try {
            const response = await fetch(url, {
                headers: this.defaultHeaders,
                method: 'GET'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(downloadUrl);
            
        } catch (error) {
            console.error('Download failed:', error);
            throw error;
        }
    }
    
    /**
     * Cache Management
     */
    async getCachedOrFetch(key, fetchFn, maxAge = 300000) {
        const cached = CidadaoAI.utils.getCachedData(key, maxAge);
        if (cached) {
            return cached;
        }
        
        const data = await fetchFn();
        CidadaoAI.utils.setCachedData(key, data);
        return data;
    }
    
    /**
     * Error Handling Helpers
     */
    handleError(error, context = '') {
        return CidadaoAI.utils.handleApiError(error, context);
    }
    
    /**
     * Request Interceptors
     */
    addRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor);
    }
    
    addResponseInterceptor(interceptor) {
        this.responseInterceptors.push(interceptor);
    }
    
    /**
     * Rate Limiting (Simple Implementation)
     */
    async rateLimit() {
        return new Promise(resolve => {
            setTimeout(resolve, 1000 / this.maxRequestsPerSecond);
        });
    }
}

// Create global API instance
window.CidadaoAI = window.CidadaoAI || {};
window.CidadaoAI.api = new CidadaoAPI();

// Add common request interceptors
CidadaoAI.api.addRequestInterceptor(async (config) => {
    // Add request ID for tracking
    config.headers['X-Request-ID'] = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Log requests in development
    if (window.location.hostname === 'localhost') {
        console.log('🔄 API Request:', config.method || 'GET', config.url || config.endpoint);
    }
});

// Add common response interceptors
CidadaoAI.api.addResponseInterceptor(async (response) => {
    // Log responses in development
    if (window.location.hostname === 'localhost') {
        const requestId = response.headers.get('X-Request-ID');
        const processTime = response.headers.get('X-Process-Time');
        console.log('✅ API Response:', response.status, requestId, processTime ? `(${processTime}s)` : '');
    }
    
    // Handle rate limiting
    const remaining = response.headers.get('X-RateLimit-Remaining-Minute');
    if (remaining && parseInt(remaining) < 10) {
        CidadaoAI.utils.showNotification(
            `Limite de requisições baixo: ${remaining} restantes`,
            'warning'
        );
    }
});

// API Helper Functions
window.CidadaoAI.apiHelpers = {
    
    /**
     * Quick health check
     */
    async isHealthy() {
        try {
            const health = await CidadaoAI.api.getHealth();
            return health.status === 'healthy';
        } catch {
            return false;
        }
    },
    
    /**
     * Retry failed requests
     */
    async retryRequest(requestFn, maxRetries = 3, delay = 1000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await requestFn();
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                
                console.warn(`Request failed, retrying in ${delay}ms... (${i + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            }
        }
    },
    
    /**
     * Handle file downloads with progress
     */
    async downloadWithProgress(url, filename, onProgress = null) {
        try {
            const response = await fetch(url, {
                headers: CidadaoAI.api.defaultHeaders
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const contentLength = response.headers.get('Content-Length');
            const total = contentLength ? parseInt(contentLength) : 0;
            let loaded = 0;
            
            const reader = response.body.getReader();
            const chunks = [];
            
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                chunks.push(value);
                loaded += value.length;
                
                if (onProgress && total > 0) {
                    onProgress(loaded / total * 100);
                }
            }
            
            const blob = new Blob(chunks);
            const downloadUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(downloadUrl);
            
        } catch (error) {
            console.error('Download with progress failed:', error);
            throw error;
        }
    },
    
    /**
     * Validate API response
     */
    validateResponse(response, requiredFields = []) {
        if (!response) {
            throw new Error('Empty response received');
        }
        
        for (const field of requiredFields) {
            if (!(field in response)) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
        
        return true;
    },
    
    /**
     * Format API errors for display
     */
    formatApiError(error) {
        if (error.response && error.response.data) {
            const data = error.response.data;
            if (data.error && data.error.message) {
                return data.error.message;
            }
        }
        
        return error.message || 'Erro desconhecido';
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CidadaoAPI;
}