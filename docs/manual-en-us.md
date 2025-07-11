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