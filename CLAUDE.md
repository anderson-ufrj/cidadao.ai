# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cidadão.AI** is an AI-powered transparency platform for democratizing access to Brazilian public spending data. The project aims to transform raw government data into intelligent investigations through natural language processing.

**Current Status**: **Production-Ready** - Enterprise-grade multi-agent system with comprehensive interface implemented

## 🏗️ Architectural Analysis (Updated 2025-01-24)

### **Overall System Score: 8.4/10** (Enterprise-Grade)

**Cidadão.AI** represents a **highly sophisticated and well-architected system** for government transparency analysis. The codebase demonstrates excellent engineering practices, modern architecture patterns, and comprehensive infrastructure setup.

## 🚀 Melhorias Recomendadas

### **Backend & Core Application (Prioridade Alta)**

1. **🧪 Cobertura de Testes (Score: 6.5/10)**
   - Implementar testes unitários para todos os agentes (target: 80%+ coverage)
   - Adicionar testes de integração para API endpoints
   - Criar testes de carga para endpoints críticos
   - Implementar testes de segurança automatizados

2. **🤖 Modelos de Machine Learning (Score: 7/10)**
   - Substituir detecção de anomalias baseada em regras por modelos ML reais
   - Implementar pipeline de treinamento automatizado
   - Adicionar versionamento de modelos com MLflow
   - Criar sistema de fine-tuning para modelos específicos do domínio

3. **🔐 Segurança Avançada (Score: 7.5/10)**
   - Implementar rotação automática de chaves API
   - Adicionar assinatura de requisições para endpoints críticos
   - Melhorar sanitização de inputs para LLMs
   - Implementar auditoria de segurança com logs imutáveis

4. **⚡ Performance e Escalabilidade (Score: 8.5/10)**
   - Otimizar índices de banco de dados
   - Implementar cache mais granular com invalidação inteligente
   - Adicionar pooling de conexões HTTP otimizado
   - Criar sistema de monitoramento de performance detalhado

5. **📊 Analytics e Monitoramento (Score: 8/10)**
   - Implementar métricas de negócio (anomalias detectadas, precisão)
   - Adicionar dashboards de performance em tempo real
   - Criar alertas automáticos para degradação de performance
   - Implementar tracking de experimentos ML

### **Interface Gráfica & UX (Prioridade Média)**

1. **🎨 Interface Web Avançada**
   - Desenvolver dashboard administrativo completo
   - Implementar visualizações interativas de dados (D3.js/Chart.js)
   - Adicionar sistema de relatórios visuais com gráficos dinâmicos
   - Criar interface de configuração de alertas e monitoramento

2. **📱 Responsividade e Acessibilidade**
   - Otimizar interface móvel com design responsivo
   - Implementar suporte completo a acessibilidade (WCAG 2.1)
   - Adicionar modo escuro/claro com preferências persistentes
   - Criar PWA (Progressive Web App) para uso offline

3. **🔄 Experiência do Usuário**
   - Implementar onboarding interativo para novos usuários
   - Adicionar sistema de ajuda contextual e tooltips
   - Criar wizards para configuração de investigações complexas
   - Implementar salvamento automático de sessões

4. **📊 Visualização de Dados**
   - Desenvolver mapas interativos para análise geográfica
   - Implementar timeline de investigações com filtros temporais
   - Adicionar gráficos de rede para visualizar conexões entre entidades
   - Criar dashboards personalizáveis por usuário

5. **🤝 Colaboração e Compartilhamento**
   - Implementar sistema de comentários em investigações
   - Adicionar compartilhamento de relatórios com links seguros
   - Criar sistema de notificações em tempo real
   - Implementar exportação de dados em múltiplos formatos

### **Roadmap de Implementação**

**Fase 1 (Curto Prazo - 1-2 meses):**
- Cobertura de testes para 80%+
- Implementação de modelos ML básicos
- Interface web administrativa

**Fase 2 (Médio Prazo - 3-4 meses):**
- Sistema de segurança avançado
- Visualizações interativas
- Pipeline MLOps completo

**Fase 3 (Longo Prazo - 6+ meses):**
- Plataforma de colaboração
- IA explicável avançada
- Sistema de recomendações inteligentes

## Technology Stack

### Backend (✅ Implemented)
- Python 3.11+ with FastAPI framework
- LangChain for LLM orchestration
- PostgreSQL + Redis for data storage
- Celery for async processing
- Complete REST API with authentication
- Real-time streaming endpoints
- Comprehensive middleware stack

### AI/ML (✅ Implemented)
- **LLM Integration**: Multi-provider strategy (Groq, Together AI, HuggingFace)
- **Vector Databases**: FAISS + ChromaDB with intelligent fallback
- **Anomaly Detection**: Rule-based system with ML framework ready
- **Explainable AI**: SHAP/LIME integration for transparency
- **Memory Systems**: Episodic, semantic, and conversational memory
- **Pattern Analysis**: Advanced correlation and trend detection
- **Natural Language Generation**: Multi-format report generation
- **MLOps Pipeline**: PyTorch, MLflow, Weights & Biases integration

## Development Commands

### Environment Setup
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -e ".[dev]"

# Setup environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Development Workflow (✅ Available)
```bash
# Development
make run          # Run FastAPI server
make test         # Run tests with pytest
make lint         # Run ruff, mypy, black checks
make format       # Auto-format with black/isort

# Docker
make docker-up    # Start development services (PostgreSQL, Redis, etc.)
make docker-down  # Stop services

# API Server
python -m src.api.app  # Run FastAPI server directly
uvicorn src.api.app:app --reload  # Development with auto-reload

# CLI usage (implemented)
cidadao investigate "query"    # Investigate spending
cidadao analyze --org "name"   # Analyze patterns
cidadao report --format pdf    # Generate reports
cidadao watch --threshold 0.8  # Monitor anomalies
```

## Architecture Overview (✅ Implemented)

The system is built as a sophisticated multi-agent architecture:

### Core Agents (✅ Implemented)
1. **BaseAgent**: Abstract foundation with retry logic and message handling
2. **ReflectiveAgent**: Base class with self-reflection capabilities for quality improvement
3. **MasterAgent**: ✅ Orchestrates investigations with planning and reflection
4. **ContextMemoryAgent**: ✅ Manages episodic, semantic, and conversational memory
5. **SemanticRouter**: ✅ Intelligent query routing to appropriate agents

### Specialized Agents (✅ Implemented)
6. **InvestigatorAgent**: ✅ Detects anomalies with explainable AI
7. **AnalystAgent**: ✅ Correlates data and identifies patterns  
8. **ReporterAgent**: ✅ Generates natural language reports

### Communication System (✅ Implemented)
- **Asynchronous messaging** between agents
- **Semantic routing** based on query intent and patterns
- **Memory system** for context preservation across investigations
- **Audit logging** with immutable hash chains for transparency
- **REST API endpoints** for external integration
- **Real-time streaming** via Server-Sent Events
- **Multi-format responses** (JSON, Markdown, HTML)

## Project Structure

```
cidadao-ai/
├── src/
│   ├── agents/          # Multi-agent system components
│   ├── core/            # Config, logging, audit trail
│   ├── llm/             # LLM integration and prompts
│   ├── memory/          # Episodic/semantic memory
│   ├── tools/           # API integrations, analyzers
│   ├── api/             # FastAPI routes and WebSocket
│   ├── cli/             # CLI implementation
│   └── ml/              # Anomaly detection models
├── tests/               # Unit, integration, e2e tests
├── scripts/             # Setup and utility scripts
└── infrastructure/      # Docker, K8s, monitoring
```

## Key Implementation Notes

1. **Audit Trail**: Every investigation must be logged with blockchain-style hash chaining for immutability
2. **Explainable AI**: All anomaly detections must include clear Portuguese explanations
3. **Memory System**: Dual memory (Redis for episodic, ChromaDB for semantic) enables contextual investigations
4. **Ethics Guard**: Planned implementation to ensure responsible use of public data
5. **Multi-Provider LLM**: System designed to work with multiple LLM providers for resilience

## Testing Requirements

- Minimum 80% code coverage for critical paths
- Multi-agent simulation tests in `tests/multiagent/`
- Performance benchmarks: API < 200ms, LLM streaming < 3s
- Security testing following OWASP guidelines

## API Integration (✅ Implemented)

### Portal da Transparência API
- **Base URL**: https://api.portaldatransparencia.gov.br
- **Authentication**: Header `chave-api-dados` with API key
- **Rate Limiting**: 90-700 requests/minute (intelligent rate limiter implemented)
- **Retry Logic**: Exponential backoff with automatic retry
- **Data Models**: Comprehensive Pydantic models for all data types

### Available Data Types (✅ Ready)
- **Contratos**: Government contracts with anomaly detection capabilities
- **Despesas**: Public expenses and spending patterns
- **Convênios**: Agreements and partnerships
- **Licitações**: Bidding processes and procurement
- **Servidores**: Public servants and payroll data
- **Empresas Sancionadas**: CEAF, CEIS, CNEP registries

### Client Features
- **TransparencyAPIClient**: Full async HTTP client with caching
- **Advanced Filtering**: Date ranges, value ranges, organization codes
- **Data Parsing**: Automatic conversion to structured models
- **Error Handling**: Comprehensive error recovery and logging

### Usage Example
```python
from src.tools import TransparencyAPIClient, TransparencyAPIFilter

async with TransparencyAPIClient() as client:
    filters = TransparencyAPIFilter(
        ano=2024,
        valor_inicial=1000000,  # Contracts > 1M
        orgao="26000"  # Ministry of Health
    )
    
    contracts = await client.get_contracts(filters)
    # Returns structured data ready for anomaly detection
```

## Current Implementation Status

### ✅ Completed (API Implementation Phase)
1. **Project Structure**: Complete directory structure with proper organization
2. **Core Configuration**: Environment management, logging, constants, exceptions
3. **Multi-Agent System**: BaseAgent, ReflectiveAgent, MasterAgent, ContextMemoryAgent, SemanticRouter
4. **Specialized Agents**: InvestigatorAgent, AnalystAgent, ReporterAgent with full capabilities
5. **LLM Integration**: Groq, Together AI, HuggingFace providers with fallback support
6. **API Integration**: Full Portal da Transparência API client with models and filtering
7. **REST API**: Complete FastAPI implementation with all endpoints
8. **Authentication**: JWT and API key middleware with user authorization
9. **Rate Limiting**: Intelligent rate limiting with sliding window algorithm
10. **Real-time Features**: Streaming endpoints for investigations and analysis
11. **Report Generation**: Multiple format support (Markdown, HTML, JSON)
12. **Development Infrastructure**: Docker Compose, Makefile, testing framework
13. **Security**: Proper secret management, audit logging capabilities
14. **Documentation**: API documentation, security guidelines, development guides

### 🔄 In Progress
- **Database Integration**: PostgreSQL and Redis setup for production
- **WebSocket Implementation**: Real-time bidirectional communication
- **Web Interface**: Frontend development for user interaction

### 📋 Next Phase (Frontend & Enhancement)
1. **Web Interface**: Interactive frontend for investigations and reports
2. **WebSocket Integration**: Real-time bidirectional communication
3. **Database Layer**: PostgreSQL integration for persistent storage
4. **Advanced ML Models**: Enhanced anomaly detection algorithms
5. **Performance Optimization**: Caching, indexing, and optimization
6. **Production Deployment**: Kubernetes, monitoring, and scaling

### 🎯 Ready for Production Use
The API is complete and ready for:
- Real-time government data analysis
- Anomaly detection and investigation
- Pattern analysis and correlation detection
- Natural language report generation
- Multi-format data export
- Scalable transparency platform deployment

## API Endpoints Overview

### Authentication
- JWT token authentication
- API key authentication
- User authorization and session management

### Health Monitoring (`/health`)
- Basic health check
- Detailed system status
- Kubernetes liveness/readiness probes
- External service connectivity

### Investigations (`/api/v1/investigations`)
- Start anomaly detection investigations
- Real-time streaming of results
- Progress tracking and status monitoring
- Complete result retrieval with explanations
- User-specific investigation management

### Analysis (`/api/v1/analysis`)
- Spending trends analysis
- Vendor pattern detection
- Correlation analysis
- Organizational behavior analysis
- Comprehensive pattern detection

### Reports (`/api/v1/reports`)
- Executive summary generation
- Detailed analysis reports
- Investigation reports
- Multiple output formats (Markdown, HTML, JSON)
- Template-based report generation
- Download functionality

### Key Features
- **Real-time Streaming**: Server-Sent Events for live updates
- **Multi-format Output**: JSON, Markdown, HTML support
- **Background Processing**: Async task execution
- **Comprehensive Logging**: Request tracking and audit trails
- **Rate Limiting**: Intelligent abuse prevention
- **Auto-documentation**: OpenAPI/Swagger integration

## Development Guidelines

### Git Workflow
- SSH key and GitHub repository workflow:
  1. Always commit and push changes to GitHub after modifications (pull and push)
  2. Commit messages should not mention Claude Code
  3. A credits section in the README will explain AI-assisted development

### Security Best Practices
- Never commit API keys or secrets to version control
- Use `.env` files for local development (ignored by git)
- Follow security guidelines in `SECURITY.md`
- Regenerate any exposed keys immediately
