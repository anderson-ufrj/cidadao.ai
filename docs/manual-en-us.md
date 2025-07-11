# 📋 User Manual - Cidadão.AI

**Version:** 1.0.0  
**Date:** January 2025  
**Language:** English (US)

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Installation](#-installation)
3. [Configuration](#-configuration)
4. [Getting Started](#-getting-started)
5. [Command Line Interface (CLI)](#-command-line-interface-cli)
6. [REST API](#-rest-api)
7. [Multi-Agent System](#-multi-agent-system)
8. [Use Cases](#-use-cases)
9. [Troubleshooting](#-troubleshooting)
10. [Frequently Asked Questions](#-frequently-asked-questions)

---

## 🎯 Overview

### What is Cidadão.AI?

**Cidadão.AI** is an artificial intelligence platform specialized in public transparency analysis. The system uses an advanced multi-agent architecture to transform complex data from Brazil's Transparency Portal into intelligent investigations and comprehensive reports.

### Key Features

- **🔍 Anomaly Detection**: Identifies irregularities in contracts, expenses, and public biddings
- **📊 Pattern Analysis**: Discovers hidden trends and correlations in government data
- **📄 Report Generation**: Creates natural language reports in Markdown, HTML, and JSON formats
- **🌐 Complete REST API**: Endpoints for integration with external systems
- **⚡ Real-time Processing**: Streaming results as they are discovered
- **🔐 Robust Security**: JWT authentication, rate limiting, and comprehensive auditing

### System Architecture

Cidadão.AI is built with a microservices architecture based on specialized agents:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   REST API      │    │ Multi-Agents    │
│   (Planned)     │◄──►│   FastAPI       │◄──►│   Specialized   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Database      │    │   Transparency  │    │   LLM Providers │
│ PostgreSQL/Redis│    │   Portal API    │    │ Groq/Together   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technologies Used

- **Backend**: Python 3.11+, FastAPI, Pydantic
- **AI/ML**: LangChain, Hugging Face Transformers, SHAP/LIME
- **LLM**: Groq, Together AI, Hugging Face
- **Database**: PostgreSQL, Redis, ChromaDB
- **Authentication**: JWT, API Key
- **Observability**: Structured logging, performance metrics

---

## 🛠️ Installation

### Prerequisites

Before installing Cidadão.AI, ensure you have:

- **Python 3.11** or higher
- **Git** for version control
- **Transparency Portal API key**
- **LLM API keys** (Groq, Together AI, or Hugging Face)

### Installation via Git

```bash
# 1. Clone the repository
git clone https://github.com/anderson-ufrj/cidadao.ai.git
cd cidadao-ai

# 2. Create a virtual environment
python -m venv venv

# 3. Activate the virtual environment
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 4. Install dependencies
pip install -e ".[dev]"

# 5. Verify installation
cidadao --version
```

### Installation via Docker

```bash
# 1. Clone the repository
git clone https://github.com/anderson-ufrj/cidadao.ai.git
cd cidadao-ai

# 2. Build Docker image
docker build -t cidadao-ai .

# 3. Run the container
docker run -p 8000:8000 \
  -e TRANSPARENCY_API_KEY=your_key_here \
  -e GROQ_API_KEY=your_groq_key \
  cidadao-ai
```

### Installation Verification

To verify successful installation:

```bash
# Test the CLI
cidadao --help

# Test the API (if configured)
curl http://localhost:8000/health
```

---

## ⚙️ Configuration

### Configuration File (.env)

Cidadão.AI uses environment variables for configuration. Copy the example file and configure your keys:

```bash
# Copy the example file
cp .env.example .env

# Edit the file with your keys
nano .env
```

### Required Environment Variables

```bash
# Transparency Portal API
TRANSPARENCY_API_KEY=your_transparency_portal_key

# LLM Providers (at least one required)
GROQ_API_KEY=your_groq_key
TOGETHER_API_KEY=your_together_ai_key
HUGGINGFACE_API_KEY=your_huggingface_key

# API Settings
JWT_SECRET_KEY=your_secret_jwt_key_here
```

### Optional Environment Variables

```bash
# Runtime environment
APP_ENV=development  # development, staging, production

# Server settings
HOST=0.0.0.0
PORT=8000
DEBUG=true

# Rate limiting settings
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000
RATE_LIMIT_PER_DAY=10000

# Log settings
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR

# LLM provider URLs
GROQ_API_BASE_URL=https://api.groq.com/openai/v1
TOGETHER_API_BASE_URL=https://api.together.xyz/v1
```

### Obtaining API Keys

#### Transparency Portal

1. Visit: https://api.portaldatransparencia.gov.br/swagger-ui/index.html
2. Register in the system
3. Request an API key
4. Wait for approval (may take several days)

#### Groq

1. Visit: https://console.groq.com/
2. Create a free account
3. Generate a new API key
4. Copy the key to the .env file

#### Together AI

1. Visit: https://api.together.xyz/
2. Register on the platform
3. Access the dashboard and generate an API key
4. Configure in the .env file

#### Hugging Face

1. Visit: https://huggingface.co/
2. Create an account
3. Go to Settings → Access Tokens
4. Generate a new token
5. Configure in the .env file

### Configuration Validation

After configuring environment variables, validate the configuration:

```bash
# Test API connectivity
cidadao test-connection

# Check service status
curl http://localhost:8000/health/detailed
```

---

## 🚀 Getting Started

### 1. First Run

After installation and configuration, start the system:

```bash
# Start API server
python -m src.api.app

# Or using uvicorn directly
uvicorn src.api.app:app --reload --host 0.0.0.0 --port 8000
```

### 2. System Verification

```bash
# Check if API is working
curl http://localhost:8000/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-01-24T15:30:00Z",
  "version": "1.0.0",
  "uptime": 10.5
}
```

### 3. Access Interactive Documentation

Open your browser and go to:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 4. First Investigation via CLI

```bash
# Simple investigation
cidadao investigate "suspicious emergency contracts"

# Investigation with filters
cidadao investigate "directed biddings" \
  --org "26000" \
  --year 2024 \
  --min-value 1000000
```

### 5. First Investigation via API

```bash
# Start investigation
curl -X POST "http://localhost:8000/api/v1/investigations/start" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "contracts with suspicious prices",
    "data_source": "contracts",
    "anomaly_types": ["price", "vendor"]
  }'

# Response:
{
  "investigation_id": "inv-12345",
  "status": "started",
  "message": "Investigation queued for processing"
}
```

### 6. Monitor Progress

```bash
# Via API - Status
curl "http://localhost:8000/api/v1/investigations/inv-12345/status"

# Via API - Real-time streaming
curl "http://localhost:8000/api/v1/investigations/stream/inv-12345"

# Via CLI
cidadao status inv-12345
```

### 7. Get Results

```bash
# Complete results via API
curl "http://localhost:8000/api/v1/investigations/inv-12345/results"

# Via CLI
cidadao results inv-12345 --format json
```

---

## 💻 Command Line Interface (CLI)

### Main Commands

Cidadão.AI offers an intuitive and powerful command line interface:

#### Anomaly Investigation

```bash
# Basic investigation
cidadao investigate "investigation description"

# Investigation with specific filters
cidadao investigate "suspicious contracts" \
  --source contracts \
  --org "26000" \
  --year 2024 \
  --min-value 1000000 \
  --anomaly-types price,vendor,temporal

# Investigation with specific output
cidadao investigate "irregular biddings" \
  --output results.json \
  --format json \
  --explain
```

#### Pattern Analysis

```bash
# Trend analysis
cidadao analyze trends \
  --source contracts \
  --period 6months \
  --org "Ministry of Health"

# Correlation analysis
cidadao analyze correlations \
  --variables value,duration,vendor \
  --source contracts

# Pattern detection
cidadao analyze patterns \
  --type vendor \
  --source contracts \
  --org "26000"
```

#### Report Generation

```bash
# Executive report
cidadao report generate \
  --type executive_summary \
  --title "Q1 2024 Analysis" \
  --investigations inv-001,inv-002 \
  --format html

# Detailed report
cidadao report generate \
  --type detailed_analysis \
  --source contracts \
  --period "2024-01-01,2024-12-31" \
  --format markdown

# List available reports
cidadao report list --status completed
```

#### Monitoring and Status

```bash
# System status
cidadao status

# Specific investigation status
cidadao status inv-12345

# Real-time monitoring
cidadao watch --org "26000" --threshold 0.8

# System logs
cidadao logs --tail 100 --level ERROR
```

#### Configuration and Testing

```bash
# Test connectivity
cidadao test-connection

# Configure API keys
cidadao config set GROQ_API_KEY "your_key_here"

# Show current configuration
cidadao config show

# Clear cache
cidadao cache clear
```

### Global Options

```bash
# Options available for all commands
--verbose, -v        # Detailed output
--quiet, -q          # Minimal output
--config FILE        # Specific configuration file
--output FILE        # Output file
--format FORMAT      # Output format (json, yaml, table, csv)
--no-cache          # Disable cache
--timeout SECONDS   # Custom timeout
```

### Practical CLI Usage Examples

#### Complete Contract Investigation

```bash
# 1. Investigate suspicious contracts
cidadao investigate "emergency contracts in small cities" \
  --source contracts \
  --year 2024 \
  --min-value 500000 \
  --anomaly-types price,vendor \
  --output contract_investigation.json

# 2. Analyze patterns in results
cidadao analyze patterns \
  --type vendor \
  --input contract_investigation.json \
  --output vendor_patterns.json

# 3. Generate final report
cidadao report generate \
  --type investigation_report \
  --title "Suspicious Emergency Contracts - 2024" \
  --input contract_investigation.json,vendor_patterns.json \
  --format html \
  --output final_report.html
```

#### Continuous Monitoring

```bash
# Monitor anomalies in real-time
cidadao watch \
  --org "Ministry of Health" \
  --threshold 0.9 \
  --alert-email admin@company.com \
  --check-interval 3600  # Check every hour
```

---

## 🌐 REST API

### API Overview

The Cidadão.AI REST API provides programmatic access to all system functionalities. It is based on REST standards and returns data in JSON format.

**Base URL**: `http://localhost:8000`  
**Version**: `v1`  
**Interactive Documentation**: `/docs`

### Authentication

#### API Key Authentication

```bash
# Include header in all requests
curl -H "X-API-Key: your_api_key" \
  http://localhost:8000/api/v1/investigations/
```

#### JWT Authentication

```bash
# 1. Get token (login endpoint to be implemented)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 2. Use token in requests
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/investigations/
```

### Main Endpoints

#### Health Check

```bash
# Basic status
GET /health

# Detailed status
GET /health/detailed

# Kubernetes probes
GET /health/live    # Liveness
GET /health/ready   # Readiness
```

#### Investigations

```bash
# Start investigation
POST /api/v1/investigations/start
{
  "query": "suspicious contracts",
  "data_source": "contracts",
  "filters": {"year": 2024},
  "anomaly_types": ["price", "vendor"],
  "include_explanations": true
}

# List investigations
GET /api/v1/investigations/?status=completed&limit=10

# Investigation status
GET /api/v1/investigations/{id}/status

# Complete results
GET /api/v1/investigations/{id}/results

# Real-time stream
GET /api/v1/investigations/stream/{id}

# Cancel investigation
DELETE /api/v1/investigations/{id}
```

#### Analysis

```bash
# Start analysis
POST /api/v1/analysis/start
{
  "analysis_type": "spending_trends",
  "data_source": "contracts",
  "time_range": {"start": "2024-01-01", "end": "2024-12-31"},
  "include_correlations": true
}

# Trend analysis
GET /api/v1/analysis/trends?data_source=contracts&time_period=6months

# Correlation analysis
GET /api/v1/analysis/correlations?variables=value,duration&data_source=contracts

# Pattern detection
GET /api/v1/analysis/patterns?data_source=contracts&pattern_type=vendor

# Analysis results
GET /api/v1/analysis/{id}/results
```

#### Reports

```bash
# Generate report
POST /api/v1/reports/generate
{
  "report_type": "executive_summary",
  "title": "Transparency Analysis Q1 2024",
  "data_sources": ["contracts", "expenses"],
  "investigation_ids": ["inv-001"],
  "output_format": "markdown",
  "target_audience": "executive"
}

# Available templates
GET /api/v1/reports/templates

# Get report
GET /api/v1/reports/{id}

# Download report
GET /api/v1/reports/{id}/download?format=html

# List reports
GET /api/v1/reports/?report_type=executive_summary&limit=10

# Delete report
DELETE /api/v1/reports/{id}
```

### HTTP Status Codes

- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **400 Bad Request**: Request validation error
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource state conflict
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Internal server error
- **502 Bad Gateway**: External service error
- **503 Service Unavailable**: Service temporarily unavailable

### Rate Limiting

The API implements rate limiting to prevent abuse:

- **Per minute**: 60 requests
- **Per hour**: 1,000 requests
- **Per day**: 10,000 requests

Response headers include limit information:
```
X-RateLimit-Limit-Minute: 60
X-RateLimit-Remaining-Minute: 45
X-RateLimit-Reset: 1642789200
```

### Data Streaming

For long operations, the API offers real-time streaming via Server-Sent Events:

```javascript
// JavaScript example
const eventSource = new EventSource(
  'http://localhost:8000/api/v1/investigations/stream/inv-12345'
);

eventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  
  if (data.type === 'progress') {
    console.log(`Progress: ${data.progress * 100}%`);
  } else if (data.type === 'anomaly') {
    console.log('New anomaly found:', data.result);
  } else if (data.type === 'completion') {
    console.log('Investigation completed');
    eventSource.close();
  }
};
```

---

## 🤖 Multi-Agent System

### Agent Architecture

Cidadão.AI uses a multi-agent architecture where each agent has specific responsibilities:

#### 1. Master Agent (Orchestrator)
- **Function**: Coordinates other agents and manages workflow
- **Capabilities**: Planning, reflection, and strategy optimization
- **Usage**: Entry point for complex investigations

#### 2. Investigator Agent
- **Function**: Detects anomalies and irregularities in data
- **Capabilities**: 
  - Price anomaly detection
  - Vendor concentration identification
  - Suspicious temporal pattern analysis
  - Duplicate contract detection
- **Algorithms**: Z-score, isolation forest, outlier detection

#### 3. Analyst Agent
- **Function**: Performs statistical analysis and identifies patterns
- **Capabilities**:
  - Spending trend analysis
  - Variable correlations
  - Organizational behavioral patterns
  - Seasonal and temporal analysis
- **Methods**: Regression, clustering, time series analysis

#### 4. Reporter Agent
- **Function**: Generates natural language reports
- **Capabilities**:
  - Executive reports
  - Detailed technical analysis
  - Multiple output formats
  - Audience adaptation

#### 5. Context Memory Agent
- **Function**: Manages episodic and semantic memory
- **Capabilities**:
  - Remember previous investigations
  - Cross-session context
  - Incremental learning

#### 6. Semantic Router
- **Function**: Routes queries to appropriate agents
- **Capabilities**:
  - Intent analysis
  - Intelligent routing
  - Resource optimization

### Agent Workflow

```mermaid
graph TD
    A[User Query] --> B[Semantic Router]
    B --> C{Query Type}
    C -->|Anomalies| D[Investigator Agent]
    C -->|Patterns| E[Analyst Agent]
    C -->|Reports| F[Reporter Agent]
    D --> G[Context Memory]
    E --> G
    F --> G
    G --> H[Master Agent]
    H --> I[Final Result]
```

### Inter-Agent Communication

Agents communicate through:

#### Structured Messages
```python
{
  "sender": "investigator_agent",
  "receiver": "reporter_agent",
  "message_type": "anomaly_detected",
  "payload": {
    "anomaly_id": "anom-001",
    "type": "price_anomaly",
    "confidence": 0.95,
    "data": {...}
  },
  "timestamp": "2025-01-24T15:30:00Z"
}
```

#### Shared Context
```python
{
  "conversation_id": "conv-12345",
  "user_id": "user-789",
  "session_data": {
    "investigation_focus": "emergency_contracts",
    "findings": [...],
    "context_memory": {...}
  }
}
```

### Agent Configuration

#### Code Configuration
```python
from src.agents import InvestigatorAgent, AnalystAgent

# Configure Investigator Agent
investigator = InvestigatorAgent(
    llm_provider="groq",
    confidence_threshold=0.8,
    max_anomalies=100,
    explanation_detail="high"
)

# Configure Analyst Agent
analyst = AnalystAgent(
    llm_provider="together",
    analysis_depth="comprehensive",
    correlation_threshold=0.7
)
```

#### Environment Configuration
```bash
# Investigator Agent settings
INVESTIGATOR_CONFIDENCE_THRESHOLD=0.8
INVESTIGATOR_MAX_ANOMALIES=100
INVESTIGATOR_LLM_PROVIDER=groq

# Analyst Agent settings
ANALYST_CORRELATION_THRESHOLD=0.7
ANALYST_TREND_SENSITIVITY=0.05
ANALYST_LLM_PROVIDER=together
```

---

## 🎯 Use Cases

### 1. Investigative Journalism

#### Scenario: Emergency Contracts Investigation
A journalist wants to investigate suspicious emergency contracts during the pandemic.

```bash
# Investigation via CLI
cidadao investigate "COVID-19 emergency contracts with inflated prices" \
  --source contracts \
  --date-range "2020-03-01,2022-12-31" \
  --keywords "emergency,COVID,pandemic" \
  --min-value 100000 \
  --anomaly-types price,vendor,temporal \
  --explain

# Generate journalistic report
cidadao report generate \
  --type investigation_report \
  --title "Emergency Contracts During Pandemic" \
  --target-audience journalist \
  --format html \
  --include-evidence
```

#### Expected Results:
- List of contracts with suspicious prices
- Detailed anomaly explanations
- Additional investigation suggestions
- Report formatted for publication

### 2. Government Auditing

#### Scenario: Public Agency Audit
Internal auditor needs to analyze Ministry of Health spending.

```bash
# Comprehensive analysis via API
curl -X POST "http://localhost:8000/api/v1/analysis/start" \
  -H "Content-Type: application/json" \
  -d '{
    "analysis_type": "organizational_behavior",
    "data_source": "contracts",
    "filters": {"organization_code": "26000"},
    "time_range": {"start": "2024-01-01", "end": "2024-12-31"},
    "include_correlations": true,
    "include_trends": true
  }'

# Generate audit report
curl -X POST "http://localhost:8000/api/v1/reports/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "report_type": "audit_report",
    "title": "Ministry of Health Audit 2024",
    "target_audience": "technical",
    "output_format": "markdown",
    "include_raw_data": true
  }'
```

### 3. NGOs and Transparency

#### Scenario: Continuous Spending Monitoring
NGO wants to continuously monitor education spending.

```bash
# Configure monitoring
cidadao watch \
  --org "Ministry of Education" \
  --categories "education,teaching,school" \
  --threshold 0.85 \
  --alert-webhook "https://ngo.org/webhook/alerts" \
  --frequency daily

# Transparency dashboard
cidadao report generate \
  --type transparency_dashboard \
  --title "Education Dashboard - $(date +%B\ %Y)" \
  --data-sources contracts,expenses \
  --target-audience general \
  --format html \
  --auto-update daily
```

### 4. Academic Research

#### Scenario: Public Spending Efficiency Study
Researcher wants to analyze correlations between spending and results.

```python
import asyncio
from cidadao_ai import CidadaoClient

async def academic_research():
    client = CidadaoClient()
    
    # Correlation analysis
    correlations = await client.analyze_correlations(
        variables=["contract_value", "execution_time", "delivery_result"],
        data_source="contracts",
        time_range="2020-2024",
        method="pearson"
    )
    
    # Efficiency analysis
    efficiency = await client.analyze_efficiency(
        metric="cost_benefit",
        group_by="agency",
        period="quarterly"
    )
    
    return {
        "correlations": correlations,
        "efficiency": efficiency
    }

# Execute research
results = asyncio.run(academic_research())
```

### 5. Citizen Oversight

#### Scenario: Citizen Checking Local Spending
Citizen wants to verify local government spending.

```bash
# Municipal investigation via CLI
cidadao investigate "suspicious spending São Paulo city hall" \
  --scope municipal \
  --location "São Paulo,SP" \
  --categories construction,services \
  --period 2024 \
  --explain-citizen

# Citizen report
cidadao report generate \
  --type citizen_report \
  --title "São Paulo Public Spending 2024" \
  --language simple \
  --format html \
  --include-graphics
```

---

## 🔧 Troubleshooting

### Common Problems and Solutions

#### 1. API Authentication Error

**Problem**: `401 Unauthorized` when making requests

**Possible Causes**:
- Invalid or expired API key
- Malformed authentication header
- Insufficient permissions

**Solutions**:
```bash
# Check API keys
cidadao config show

# Test connectivity
cidadao test-connection

# Regenerate configuration
cp .env.example .env
# Edit .env with new keys

# Verify header format
curl -H "X-API-Key: your_key_here" http://localhost:8000/health
```

#### 2. Rate Limit Exceeded

**Problem**: `429 Too Many Requests`

**Solutions**:
```bash
# Check current limits
curl -I http://localhost:8000/health

# Wait for reset (check X-RateLimit-Reset header)
# Or implement exponential backoff in code

# Increase limits (if necessary)
export RATE_LIMIT_PER_MINUTE=120
export RATE_LIMIT_PER_HOUR=2000
```

#### 3. Investigation Timeouts

**Problem**: Investigations take too long or expire

**Solutions**:
```bash
# Increase timeout
cidadao investigate "query" --timeout 300

# Use more specific filters
cidadao investigate "query" \
  --date-range "2024-01-01,2024-01-31" \
  --max-records 1000

# Monitor progress via streaming
curl "http://localhost:8000/api/v1/investigations/stream/{id}"
```

#### 4. Transparency Portal Connection Error

**Problem**: `502 Bad Gateway` or timeouts

**Solutions**:
```bash
# Check Portal status
curl -I https://api.portaldatransparencia.gov.br/api-de-dados/orgaos

# Verify API key
curl -H "chave-api-dados: your_key" \
  https://api.portaldatransparencia.gov.br/api-de-dados/orgaos

# Configure retry and backoff
export TRANSPARENCY_API_RETRY_ATTEMPTS=5
export TRANSPARENCY_API_BACKOFF_FACTOR=2
```

#### 5. Memory/Performance Issues

**Problem**: System slow or low memory

**Solutions**:
```bash
# Clear cache
cidadao cache clear

# Check memory usage
docker stats cidadao-ai  # If using Docker

# Optimize settings
export MAX_CONCURRENT_REQUESTS=10
export CACHE_TTL=3600
export MAX_RESULTS_PER_PAGE=100
```

### Logging and Debugging

#### Enable Detailed Logs

```bash
# Configure log level
export LOG_LEVEL=DEBUG

# Log to file
export LOG_FILE=/var/log/cidadao-ai.log

# Structured logs
export LOG_FORMAT=json
```

#### Check Logs

```bash
# Via CLI
cidadao logs --tail 100 --level ERROR

# Via Docker
docker logs cidadao-ai --tail 100

# Via file
tail -f /var/log/cidadao-ai.log | grep ERROR
```

#### Debug Mode

```bash
# Run in debug mode
python -m src.api.app --debug

# Or via uvicorn
uvicorn src.api.app:app --reload --log-level debug
```

### Backup and Recovery

#### Data Backup

```bash
# Configuration backup
cp .env .env.backup

# Results backup (if using local database)
pg_dump cidadao_ai > backup_$(date +%Y%m%d).sql

# Redis cache backup
redis-cli --rdb backup_redis_$(date +%Y%m%d).rdb
```

#### Data Recovery

```bash
# Restore configuration
cp .env.backup .env

# Restore database
psql cidadao_ai < backup_20250124.sql

# Restore Redis cache
redis-cli --rdb backup_redis_20250124.rdb
```

---

## ❓ Frequently Asked Questions

### Installation and Configuration

**Q: What are the minimum system requirements?**
A: Python 3.11+, 4GB RAM, 2GB disk space, internet connection for external APIs.

**Q: Can I use the system without LLM API keys?**
A: No, at least one LLM key (Groq, Together AI, or Hugging Face) is required for AI agents to function.

**Q: How do I get a Transparency Portal key?**
A: Visit https://api.portaldatransparencia.gov.br/, register and request a key. The process may take several days for approval.

**Q: Does the system work offline?**
A: Not completely. The system needs internet connection for external APIs (Transparency Portal and LLMs), but can store data locally for later queries.

### Usage and Features

**Q: What's the difference between investigation and analysis?**
A: Investigation focuses on detecting specific anomalies, while analysis identifies general patterns and trends in data.

**Q: Can I process data from multiple agencies simultaneously?**
A: Yes, use broad filters or run separate investigations for each agency and then combine results.

**Q: How do I interpret confidence scores?**
A: Scores of 0.0-0.3 (low), 0.3-0.7 (medium), 0.7-1.0 (high confidence). Recommend investigating anomalies with score > 0.7.

**Q: Can reports be customized?**
A: Yes, there are templates for different audiences and you can customize format, sections, and detail level.

### Performance and Limits

**Q: How many records can the system process?**
A: Depends on available memory, but typically processes hundreds of thousands of records. For larger datasets, use filters to divide into batches.

**Q: Why do some investigations take so long?**
A: Complex investigations with many records and multiple anomaly types can be slow. Use more specific filters or monitor via streaming.

**Q: Is there a daily request limit?**
A: By default: 60/minute, 1000/hour, 10000/day. These limits can be adjusted as needed.

### Security and Privacy

**Q: Is data stored in the system?**
A: By default, only in temporary cache. For persistence, configure database. Sensitive data is never logged.

**Q: Is the system secure for government data?**
A: Yes, implements JWT authentication, rate limiting, audit logs, and can be deployed in isolated environment.

**Q: How does operation auditing work?**
A: Every operation is logged with cryptographic hash, timestamp, and complete action traceability.

### Integration and Development

**Q: Can I integrate with other systems?**
A: Yes, via complete REST API with OpenAPI/Swagger. Supports webhooks for real-time notifications.

**Q: Are there SDKs for other languages besides Python?**
A: Currently only native Python. For other languages, use the REST API directly.

**Q: How can I contribute to development?**
A: The project is currently proprietary. For partnerships or licensing, contact: andersonhs27@gmail.com

### Troubleshooting

**Q: What to do if API returns error 500?**
A: Check logs with `cidadao logs --level ERROR`, verify external API connectivity, and restart service if necessary.

**Q: How do I update to a new version?**
A: `git pull origin main && pip install -e ".[dev]" --upgrade`. Always backup before updating.

**Q: Where do I report bugs or suggest improvements?**
A: Open an issue on GitHub: https://github.com/anderson-ufrj/cidadao.ai/issues

---

## 📞 Support and Contact

### Additional Documentation
- **API Reference**: `/docs` (when server is running)
- **GitHub**: https://github.com/anderson-ufrj/cidadao.ai
- **Issues**: https://github.com/anderson-ufrj/cidadao.ai/issues

### Developer Contact
**Anderson H. Silva**  
*Digital Intelligence Architect*

- 📧 **Email**: andersonhs27@gmail.com
- 🔗 **LinkedIn**: https://www.linkedin.com/in/anderson-h-silva95/
- 🐦 **Twitter/X**: https://twitter.com/neural_thinker

### Licensing and Partnerships
For commercial licensing, partnerships, or custom implementations, contact directly.

---

**© 2025 Anderson H. Silva. All rights reserved.**

*This manual was generated for Cidadão.AI version 1.0.0. For the most up-to-date version, check the online documentation.*