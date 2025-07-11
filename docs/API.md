# 📡 API Documentation - Cidadão.AI

## 🚀 Quick Start

### Starting the API Server

```bash
# Development
uvicorn src.api.app:app --reload --host 0.0.0.0 --port 8000

# Production
python -m src.api.app
```

### API Documentation
- **Interactive Docs**: http://localhost:8000/docs
- **OpenAPI JSON**: http://localhost:8000/openapi.json
- **Root Info**: http://localhost:8000/

## 🔐 Authentication

The API supports two authentication methods:

### 1. API Key Authentication
```bash
curl -H "X-API-Key: your-api-key-here" \
  http://localhost:8000/api/v1/investigations/
```

### 2. JWT Authentication
```bash
# Get token (implement login endpoint)
TOKEN="your-jwt-token"

curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/investigations/
```

### Development Mode
In development environment, authentication is optional for testing.

## 🏥 Health Check Endpoints

### Basic Health Check
```http
GET /health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-24T15:30:00Z",
  "version": "1.0.0",
  "uptime": 3600.5,
  "services": {
    "transparency_api": {
      "status": "healthy",
      "response_time": 0.234,
      "last_checked": "2025-01-24T15:30:00Z"
    }
  }
}
```

### Detailed Health Check
```http
GET /health/detailed
```

### Kubernetes Probes
```http
GET /health/live    # Liveness probe
GET /health/ready   # Readiness probe
```

## 🔍 Investigation Endpoints

### Start Investigation
```http
POST /api/v1/investigations/start
```

Request:
```json
{
  "query": "contratos emergenciais suspeitos em 2024",
  "data_source": "contracts",
  "filters": {
    "ano": 2024,
    "valor_inicial": 1000000
  },
  "anomaly_types": ["price", "vendor", "temporal"],
  "include_explanations": true,
  "stream_results": false
}
```

Response:
```json
{
  "investigation_id": "12345678-1234-1234-1234-123456789012",
  "status": "started",
  "message": "Investigation queued for processing"
}
```

### Stream Results (Real-time)
```http
GET /api/v1/investigations/stream/{investigation_id}
```

Server-Sent Events stream:
```
data: {"type": "progress", "progress": 0.1, "current_phase": "data_collection"}

data: {"type": "anomaly", "result": {...}, "timestamp": "2025-01-24T15:30:00Z"}

data: {"type": "completion", "status": "completed", "total_anomalies": 15}
```

### Get Investigation Status
```http
GET /api/v1/investigations/{investigation_id}/status
```

Response:
```json
{
  "investigation_id": "12345678-1234-1234-1234-123456789012",
  "status": "running",
  "progress": 0.75,
  "current_phase": "anomaly_detection",
  "records_processed": 1250,
  "anomalies_detected": 12
}
```

### Get Complete Results
```http
GET /api/v1/investigations/{investigation_id}/results
```

Response:
```json
{
  "investigation_id": "12345678-1234-1234-1234-123456789012",
  "status": "completed",
  "query": "contratos emergenciais suspeitos em 2024",
  "anomalies_found": 15,
  "total_records_analyzed": 2500,
  "results": [
    {
      "anomaly_id": "anom-001",
      "type": "price",
      "severity": "high",
      "confidence": 0.95,
      "description": "Contrato com valor 340% acima da média",
      "explanation": "Este contrato apresenta valor significativamente superior...",
      "affected_records": [...],
      "suggested_actions": ["Verificar processo licitatório", "Analisar justificativas"]
    }
  ],
  "summary": "Foram identificadas 15 anomalias em 2.500 contratos analisados...",
  "confidence_score": 0.87,
  "processing_time": 45.2
}
```

### List Investigations
```http
GET /api/v1/investigations/?status=completed&limit=10
```

### Cancel Investigation
```http
DELETE /api/v1/investigations/{investigation_id}
```

## 📊 Analysis Endpoints

### Start Pattern Analysis
```http
POST /api/v1/analysis/start
```

Request:
```json
{
  "analysis_type": "spending_trends",
  "data_source": "contracts",
  "time_range": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  },
  "filters": {
    "codigo_orgao": "26000"
  },
  "include_correlations": true,
  "include_trends": true
}
```

### Get Spending Trends
```http
GET /api/v1/analysis/trends?data_source=contracts&time_period=6months
```

Response:
```json
[
  {
    "metric": "total_spending",
    "direction": "increasing",
    "rate_of_change": 0.15,
    "confidence": 0.92,
    "time_series": [
      {"date": "2024-01", "value": 1500000},
      {"date": "2024-02", "value": 1650000}
    ],
    "significant_events": [
      {
        "date": "2024-03-15",
        "event": "Spike in emergency contracts",
        "impact": 0.25
      }
    ]
  }
]
```

### Get Correlations
```http
GET /api/v1/analysis/correlations?variables=valor,prazo&data_source=contracts
```

Response:
```json
[
  {
    "variable_x": "valor",
    "variable_y": "prazo",
    "correlation_coefficient": 0.73,
    "significance": 0.001,
    "relationship_type": "linear",
    "explanation": "Contratos de maior valor tendem a ter prazos mais longos"
  }
]
```

### Detect Patterns
```http
GET /api/v1/analysis/patterns?data_source=contracts&pattern_type=vendor
```

Response:
```json
[
  {
    "pattern_type": "vendor_concentration",
    "description": "Alto grau de concentração em poucos fornecedores",
    "frequency": 45,
    "confidence": 0.88,
    "examples": [
      {
        "fornecedor": "Empresa ABC LTDA",
        "contratos": 23,
        "valor_total": 5600000
      }
    ],
    "implications": [
      "Possível direcionamento de licitações",
      "Risco de dependência excessiva"
    ]
  }
]
```

## 📄 Report Endpoints

### Generate Report
```http
POST /api/v1/reports/generate
```

Request:
```json
{
  "report_type": "executive_summary",
  "title": "Análise de Transparência - Q1 2024",
  "data_sources": ["contracts", "expenses"],
  "investigation_ids": ["inv-001", "inv-002"],
  "analysis_ids": ["ana-001"],
  "time_range": {
    "start": "2024-01-01",
    "end": "2024-03-31"
  },
  "output_format": "markdown",
  "include_visualizations": true,
  "target_audience": "executive"
}
```

Response:
```json
{
  "report_id": "rep-12345678",
  "status": "started",
  "message": "Report generation queued for processing"
}
```

### Get Report Templates
```http
GET /api/v1/reports/templates
```

Response:
```json
[
  {
    "type": "executive_summary",
    "name": "Relatório Executivo",
    "description": "Resumo executivo com principais achados",
    "target_audience": "executive",
    "sections": ["resumo", "principais_achados", "recomendacoes"],
    "estimated_pages": "2-4"
  }
]
```

### Get Report
```http
GET /api/v1/reports/{report_id}
```

Response:
```json
{
  "report_id": "rep-12345678",
  "title": "Análise de Transparência - Q1 2024",
  "report_type": "executive_summary",
  "output_format": "markdown",
  "generated_at": "2025-01-24T15:30:00Z",
  "word_count": 2500,
  "status": "completed",
  "content": "# Relatório Executivo\n\n## Resumo\n...",
  "metadata": {
    "sections_generated": 5,
    "data_sources_used": 2,
    "target_audience": "executive"
  },
  "download_url": "/api/v1/reports/rep-12345678/download"
}
```

### Download Report
```http
GET /api/v1/reports/{report_id}/download?format=html
```

Formats: `html`, `markdown`, `json`

### List Reports
```http
GET /api/v1/reports/?report_type=executive_summary&limit=10
```

### Delete Report
```http
DELETE /api/v1/reports/{report_id}
```

## 🔧 Rate Limiting

The API implements intelligent rate limiting:

- **Per minute**: 60 requests
- **Per hour**: 1,000 requests  
- **Per day**: 10,000 requests

Rate limit headers are included in responses:
```
X-RateLimit-Limit-Minute: 60
X-RateLimit-Remaining-Minute: 45
X-RateLimit-Reset: 1642789200
```

## 📝 Request/Response Logging

All requests are logged with unique IDs:
```
X-Request-ID: 12345678-1234-1234-1234-123456789012
X-Process-Time: 0.1234
```

## ⚠️ Error Handling

Standard error response format:
```json
{
  "status": "error",
  "status_code": 400,
  "error": {
    "error": "ValidationError",
    "message": "Invalid request parameters",
    "details": {
      "field": "data_source",
      "issue": "must be one of: contracts, expenses, agreements"
    }
  }
}
```

Common status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (access denied)
- `404` - Not Found (resource not found)
- `409` - Conflict (resource state conflict)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error
- `502` - Bad Gateway (external service error)
- `503` - Service Unavailable (service overloaded)

## 🔌 WebSocket (Coming Soon)

Real-time bidirectional communication:
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/investigations');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Investigation update:', data);
};
```

## 🐳 Docker Deployment

```dockerfile
# Dockerfile example
FROM python:3.11-slim

WORKDIR /app
COPY . .
RUN pip install -e .

EXPOSE 8000
CMD ["python", "-m", "src.api.app"]
```

```bash
# Build and run
docker build -t cidadao-ai .
docker run -p 8000:8000 -e APP_ENV=production cidadao-ai
```

## 📊 Monitoring

### Metrics Endpoints (Planned)
- `/metrics` - Prometheus metrics
- `/api/v1/stats` - API usage statistics

### Health Monitoring
Monitor these endpoints for system health:
- `/health/live` - Service is running
- `/health/ready` - Service is ready to handle requests
- `/health/detailed` - Complete system status

## 🔍 Example Integration

### Python Client
```python
import httpx
import asyncio

async def investigate_contracts():
    async with httpx.AsyncClient() as client:
        # Start investigation
        response = await client.post(
            "http://localhost:8000/api/v1/investigations/start",
            json={
                "query": "contratos suspeitos de direcionamento",
                "data_source": "contracts",
                "anomaly_types": ["price", "vendor"]
            },
            headers={"X-API-Key": "your-api-key"}
        )
        
        investigation_id = response.json()["investigation_id"]
        
        # Poll for results
        while True:
            status_response = await client.get(
                f"http://localhost:8000/api/v1/investigations/{investigation_id}/status"
            )
            status = status_response.json()
            
            if status["status"] == "completed":
                break
                
            await asyncio.sleep(5)
        
        # Get results
        results_response = await client.get(
            f"http://localhost:8000/api/v1/investigations/{investigation_id}/results"
        )
        
        return results_response.json()

# Run investigation
results = asyncio.run(investigate_contracts())
print(f"Found {results['anomalies_found']} anomalies")
```

### JavaScript/Node.js Client
```javascript
const axios = require('axios');

async function startInvestigation() {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/v1/investigations/start',
      {
        query: 'contratos emergenciais suspeitos',
        data_source: 'contracts',
        anomaly_types: ['price', 'vendor', 'temporal']
      },
      {
        headers: { 'X-API-Key': 'your-api-key' }
      }
    );
    
    return response.data.investigation_id;
  } catch (error) {
    console.error('Error starting investigation:', error.response.data);
  }
}

// Stream results
const EventSource = require('eventsource');

function streamResults(investigationId) {
  const url = `http://localhost:8000/api/v1/investigations/stream/${investigationId}`;
  const eventSource = new EventSource(url);
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Update:', data);
    
    if (data.type === 'completion') {
      eventSource.close();
    }
  };
}
```

## 📋 Changelog

### v1.0.0 - 2025-01-24
- ✅ Complete REST API implementation
- ✅ Multi-agent system integration
- ✅ Real-time streaming endpoints
- ✅ Authentication and rate limiting
- ✅ Comprehensive error handling
- ✅ Auto-generated documentation