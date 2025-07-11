# Cidadão.AI - Documento de Arquitetura Técnica

## 📋 Visão Geral

**Nome do Projeto:** Cidadão.AI  
**Slogan:** *"O que Brasília esconde, nossa IA revela."*  
**Versão:** 1.0.0  
**Data:** Janeiro 2025  
**Autor:** Anderson H. Silva  
**Repositório:** `github.com/anderson-ufrj/cidadao.ai`  
**Licença:** Proprietária - Todos os direitos reservados

### Missão
Criar um sistema multi-agente de IA que democratize o acesso e a compreensão dos dados públicos brasileiros, transformando informações brutas do Portal da Transparência em insights acionáveis através de processamento de linguagem natural.

### Pilar Filosófico
*A máquina que não apenas entende o Estado — mas o interroga.*

### Objetivos Técnicos
- [ ] Implementar arquitetura multi-agente com LangChain e reflexão autônoma
- [ ] Integrar LLMs open-source via Hugging Face com fine-tuning brasileiro
- [ ] Criar pipeline de dados real-time com a API gov.br
- [ ] Desenvolver sistema de detecção de anomalias com explicabilidade (XAI)
- [ ] Construir interface conversacional com streaming e memória contextual
- [ ] Implementar CLI e SDK para acesso programático
- [ ] Garantir auditabilidade completa com logs imutáveis
- [ ] Garantir 100% de cobertura de testes críticos

## 🏗️ Arquitetura do Sistema

### Design Principles
1. **Domain-Driven Design (DDD)** - Separação clara de domínios
2. **Event-Driven Architecture** - Comunicação assíncrona entre componentes
3. **SOLID Principles** - Código limpo e manutenível
4. **12-Factor App** - Pronto para cloud desde o início
5. **GitOps** - Infraestrutura como código

### Diagrama de Alto Nível

```mermaid
graph TB
    subgraph "Interface Layer"
        UI[React Dashboard]
        CHAT[Chat Interface]
        CLI[CLI Tool]
        SDK[Python SDK]
    end
    
    subgraph "API Gateway"
        GW[FastAPI Gateway]
        WS[WebSocket Server]
    end
    
    subgraph "Agent Orchestration"
        MA[Master Agent w/ Reflection]
        CM[Context Memory Agent]
        IA[Investigator Agent]
        AA[Analyst Agent]
        RA[Reporter Agent]
        SR[Semantic Router]
    end
    
    subgraph "Core Services"
        LLM[LLM Service w/ Fine-tuning]
        DS[Data Service]
        AS[Alert Service]
        XAI[Explainable AI Service]
        AL[Audit Logger]
    end
    
    subgraph "Memory & Storage"
        EM[(Episodic Memory - Redis)]
        SM[(Semantic Memory - ChromaDB)]
        PG[(PostgreSQL)]
        VS[(Vector Store)]
    end
    
    subgraph "External"
        GOV[Portal Transparência API]
        HF[Hugging Face API]
        S3[S3/IPFS Audit Logs]
    end
    
    UI --> GW
    CHAT --> WS
    CLI --> GW
    SDK --> GW
    GW --> SR
    WS --> MA
    SR --> MA
    SR --> CM
    SR --> IA
    SR --> AA
    SR --> RA
    MA --> CM
    MA --> IA
    MA --> AA
    MA --> RA
    CM --> EM
    CM --> SM
    IA --> LLM
    IA --> XAI
    AA --> LLM
    RA --> LLM
    LLM --> HF
    DS --> GOV
    MA --> DS
    DS --> PG
    MA --> EM
    LLM --> VS
    AL --> S3
    MA --> AL
```

## 📁 Estrutura de Diretórios

```
cidadao-ai/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── cd.yml
│   │   └── security.yml
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── src/
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── base_agent.py
│   │   ├── master_agent.py
│   │   ├── context_memory_agent.py
│   │   ├── investigator_agent.py
│   │   ├── analyst_agent.py
│   │   ├── reporter_agent.py
│   │   └── semantic_router.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── exceptions.py
│   │   ├── logging.py
│   │   ├── constants.py
│   │   ├── audit_logger.py
│   │   └── ethics_guard.py
│   ├── llm/
│   │   ├── __init__.py
│   │   ├── base_llm.py
│   │   ├── multi_provider_llm.py
│   │   ├── fine_tuning/
│   │   │   ├── __init__.py
│   │   │   ├── dataset_builder.py
│   │   │   └── lora_trainer.py
│   │   ├── prompts/
│   │   │   ├── __init__.py
│   │   │   ├── templates.py
│   │   │   ├── chains.py
│   │   │   └── reflection_prompts.py
│   │   └── embeddings/
│   │       ├── __init__.py
│   │       └── vector_store.py
│   ├── memory/
│   │   ├── __init__.py
│   │   ├── episodic_memory.py
│   │   ├── semantic_memory.py
│   │   └── conversation_graph.py
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── base_tool.py
│   │   ├── transparency_api.py
│   │   ├── data_analyzer.py
│   │   ├── visualizer.py
│   │   ├── alert_system.py
│   │   └── explainable_ai.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── data_service.py
│   │   ├── cache_service.py
│   │   ├── monitoring_service.py
│   │   ├── notification_service.py
│   │   └── event_sourcing.py
│   ├── cli/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── commands/
│   │   │   ├── investigate.py
│   │   │   ├── analyze.py
│   │   │   ├── report.py
│   │   │   └── watch.py
│   │   └── utils.py
│   ├── sdk/
│   │   ├── __init__.py
│   │   ├── client.py
│   │   ├── models.py
│   │   └── exceptions.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── agents.py
│   │   │   ├── analytics.py
│   │   │   ├── memory.py
│   │   │   └── health.py
│   │   ├── websocket/
│   │   │   ├── __init__.py
│   │   │   └── handlers.py
│   │   └── middleware/
│   │       ├── __init__.py
│   │       ├── auth.py
│   │       ├── cors.py
│   │       ├── rate_limit.py
│   │       └── audit.py
│   └── ml/
│       ├── __init__.py
│       ├── anomaly_detection.py
│       ├── explainable_anomaly.py
│       ├── time_series.py
│       ├── clustering.py
│       └── pattern_recognition.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── multiagent/
│       ├── __init__.py
│       └── simulation_tests.py
├── scripts/
│   ├── setup_dev.sh
│   ├── run_migrations.py
│   ├── seed_data.py
│   ├── setup_llm_providers.py
│   └── fine_tune_model.py
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.dev.yml
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── deployment/
│   └── examples/
├── infrastructure/
│   ├── terraform/
│   ├── kubernetes/
│   └── observability/
│       ├── prometheus/
│       └── grafana/
├── .env.example
├── .gitignore
├── .pre-commit-config.yaml
├── Makefile
├── pyproject.toml
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── CHANGELOG.md
```

## 🛠️ Stack Tecnológica

### Backend
- **Python 3.11+** - Linguagem principal
- **FastAPI** - Framework web assíncrono
- **LangChain** - Orquestração de LLM
- **Typer** - CLI framework
- **Pydantic V2** - Validação de dados
- **SQLAlchemy 2.0** - ORM
- **Alembic** - Migrações de banco
- **Celery** - Processamento assíncrono
- **Redis** - Cache e fila de mensagens

### IA/ML
- **Hugging Face Transformers** - LLMs
- **Groq API** - LLM ultra-rápido (desenvolvimento)
- **Together AI** - LLMs alternativos
- **FAISS** - Vector store principal
- **ChromaDB** - Semantic memory
- **scikit-learn** - ML clássico
- **Prophet** - Séries temporais
- **UMAP/HDBSCAN** - Clustering
- **SHAP/LIME** - Explainable AI
- **PEFT + LoRA** - Fine-tuning eficiente

### Infraestrutura
- **PostgreSQL** - Banco principal
- **Redis** - Cache e pub/sub
- **Docker** - Containerização
- **GitHub Actions** - CI/CD
- **Prometheus + Grafana** - Monitoramento
- **OpenTelemetry** - Distributed tracing
- **S3/IPFS** - Audit logs imutáveis

### Frontend (Fase 2)
- **React 18** - UI Library
- **Next.js 14** - Framework
- **TailwindCSS** - Styling
- **D3.js** - Visualizações
- **Socket.io** - Real-time

## 📝 Convenções de Código

### Git Workflow
```bash
# Branch naming
feature/TAI-123-add-investigator-agent
bugfix/TAI-124-fix-api-timeout
hotfix/TAI-125-critical-security-patch
release/v1.0.0

# Commit message format
<type>(<scope>): <subject>

# Examples
feat(agents): add investigator agent with anomaly detection
fix(api): handle timeout errors in transparency API
docs(readme): update installation instructions
test(agents): add unit tests for master agent
```

### Python Code Style
```python
# File header template
"""
Module: agent.investigator
Description: Investigator agent for anomaly detection
Author: Anderson H. Silva
Date: 2025-01-24
License: Proprietary - All rights reserved
"""

from typing import Optional, List, Dict, Any
import logging
from dataclasses import dataclass
from opentelemetry import trace

logger = logging.getLogger(__name__)
tracer = trace.get_tracer(__name__)


@dataclass
class InvestigationResult:
    """Result of an investigation query."""
    
    query: str
    findings: List[Dict[str, Any]]
    confidence_score: float
    sources: List[str]
    explanation: Optional[str] = None  # XAI explanation
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for API response."""
        return {
            "query": self.query,
            "findings": self.findings,
            "confidence_score": self.confidence_score,
            "sources": self.sources,
            "explanation": self.explanation
        }


class InvestigatorAgent:
    """Agent responsible for detecting anomalies in public spending."""
    
    def __init__(
        self,
        llm_service: LLMService,
        data_service: DataService,
        memory_agent: ContextMemoryAgent,
        xai_service: ExplainableAIService,
        config: Optional[Config] = None
    ) -> None:
        """Initialize the investigator agent."""
        self.llm = llm_service
        self.data = data_service
        self.memory = memory_agent
        self.xai = xai_service
        self.config = config or Config()
        logger.info("InvestigatorAgent initialized")
    
    @tracer.start_as_current_span("investigate")
    async def investigate(
        self,
        query: str,
        context: Optional[Dict[str, Any]] = None
    ) -> InvestigationResult:
        """
        Investigate a query about public spending.
        
        Args:
            query: Natural language query
            context: Optional context from previous investigations
            
        Returns:
            InvestigationResult with findings and explanations
            
        Raises:
            InvestigationError: If investigation fails
        """
        span = trace.get_current_span()
        span.set_attribute("query.length", len(query))
        
        try:
            # Check memory for related investigations
            related_context = await self.memory.get_related_context(query)
            
            # Perform investigation with context
            findings = await self._analyze_data(query, related_context)
            
            # Generate explanations if anomalies found
            if self._has_anomalies(findings):
                explanation = await self.xai.explain_anomalies(findings)
            else:
                explanation = None
            
            # Calculate confidence score
            confidence = self._calculate_confidence(findings, related_context)
            
            # Store in memory for future reference
            result = InvestigationResult(
                query=query,
                findings=findings,
                confidence_score=confidence,
                sources=self._extract_sources(findings),
                explanation=explanation
            )
            
            await self.memory.store_investigation(result)
            
            return result
            
        except Exception as e:
            logger.error(f"Investigation failed: {str(e)}")
            span.record_exception(e)
            raise InvestigationError(f"Failed to investigate: {str(e)}")
```

### Environment Variables
```env
# Application
APP_NAME=cidadao-ai
APP_ENV=development
APP_VERSION=1.0.0
LOG_LEVEL=INFO

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/cidadao_ai
REDIS_URL=redis://localhost:6379/0

# APIs
TRANSPARENCY_API_KEY=your_key_here
TRANSPARENCY_API_BASE_URL=https://api.portaldatransparencia.gov.br
HUGGINGFACE_API_KEY=your_hf_key_here

# LLM Configuration
LLM_MODEL_NAME=mistralai/Mistral-7B-Instruct-v0.2
LLM_TEMPERATURE=0.7
LLM_MAX_TOKENS=2048

# Security
SECRET_KEY=your_secret_key_here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Monitoring
PROMETHEUS_PORT=9090
GRAFANA_PORT=3000
```

## 🚀 Setup Inicial

### 1. Configuração do Repositório
```bash
# Clone e setup
git clone https://github.com/anderson-ufrj/cidadao.ai.git
cd cidadao-ai

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -e ".[dev]"

# Setup pre-commit hooks
pre-commit install

# Copy environment variables
cp .env.example .env

# Setup LLM providers
python scripts/setup_llm_providers.py
```

### 2. Makefile Commands
```makefile
.PHONY: help install test lint format run docker-up docker-down clean cli

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make test       - Run tests"
	@echo "  make lint       - Run linters"
	@echo "  make format     - Format code"
	@echo "  make run        - Run application"
	@echo "  make cli        - Install CLI tool"
	@echo "  make docker-up  - Start containers"
	@echo "  make docker-down - Stop containers"

install:
	pip install -e ".[dev]"
	pre-commit install

test:
	pytest tests/ -v --cov=src --cov-report=html

test-multiagent:
	pytest tests/multiagent/ -v -s

lint:
	ruff check src/ tests/
	mypy src/ --strict
	black src/ tests/ --check

format:
	black src/ tests/
	isort src/ tests/
	ruff check src/ tests/ --fix

run:
	uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000

cli:
	pip install -e .
	cidadao --help

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down
```

### 3. CLI Usage Examples
```bash
# Investigate spending
cidadao investigate "gastos com merenda escolar em MG 2024"

# Analyze patterns
cidadao analyze --org "ministerio-saude" --year 2024

# Generate report
cidadao report --format pdf --output relatorio_q4_2024.pdf

# Watch for anomalies
cidadao watch --threshold 0.8 --notify email

# Export data
cidadao export --query "licitacoes hospital" --format csv
```

### 4. SDK Usage Example
```python
from cidadao_ai import CidadaoClient, InvestigationConfig

# Initialize client
client = CidadaoClient(api_key="your_key")

# Investigate with confidence threshold
result = await client.investigate(
    query="contratos emergenciais covid-19",
    config=InvestigationConfig(
        min_confidence=0.7,
        include_explanations=True,
        use_memory=True
    )
)

# Analyze anomalies
anomalies = await client.detect_anomalies(
    organization="prefeitura-sp",
    period="2024-Q1",
    explain=True
)

# Stream investigation
async for update in client.stream_investigation(query):
    print(f"Thinking: {update.thought}")
    print(f"Confidence: {update.confidence}")
```

## 📊 Métricas de Qualidade

### Code Coverage
- **Target:** > 80% para código crítico
- **Tools:** pytest-cov, codecov

### Performance
- **API Response Time:** < 200ms (p95)
- **LLM Response Time:** < 3s (streaming)
- **Database Queries:** < 50ms

### Security
- **OWASP Top 10** compliance
- **Dependency scanning** via Dependabot
- **Secret scanning** via GitHub

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          pip install -e ".[dev]"
      - name: Run tests
        run: |
          make test
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run linters
        run: |
          make lint

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security checks
        run: |
          pip install safety bandit
          safety check
          bandit -r src/
```

## 📈 Roadmap de Desenvolvimento

### Phase 1: Foundation (Weeks 1-2)
- [ ] Setup inicial do projeto
- [ ] Implementar base agent architecture com reflection
- [ ] Context Memory Agent básico
- [ ] Integração básica com API Portal Transparência
- [ ] Multi-provider LLM service (Groq, Together, HF)
- [ ] Audit logger com hash chain
- [ ] Testes unitários core

### Phase 2: Core Features (Weeks 3-4)
- [ ] Master Agent com reflection loop
- [ ] Investigator Agent com detecção de anomalias
- [ ] Explainable AI service (SHAP/LIME)
- [ ] Sistema de memória episódica (Redis)
- [ ] Semantic Router para agents
- [ ] API REST básica
- [ ] CLI básico com Typer
- [ ] Logging e monitoring com OpenTelemetry

### Phase 3: Advanced Features (Weeks 5-6)
- [ ] Analyst e Reporter agents
- [ ] WebSocket para streaming
- [ ] Memória semântica com ChromaDB
- [ ] SDK Python inicial
- [ ] Fine-tuning dataset builder
- [ ] ML models para anomaly detection
- [ ] Event sourcing completo
- [ ] Dashboard inicial

### Phase 4: Production Ready (Weeks 7-8)
- [ ] Fine-tuning com LoRA no domínio fiscal
- [ ] Ethics guard implementation
- [ ] CLI completo com todas as features
- [ ] SDK Python completo
- [ ] Multiagent simulation tests
- [ ] Otimização de performance
- [ ] Security hardening
- [ ] Documentation completa
- [ ] Deploy automation
- [ ] Load testing

### Phase 5: Premium Features (Month 3+)
- [ ] Crawl autônomo de gastos
- [ ] Governança ética avançada
- [ ] Conversation graph analysis
- [ ] Advanced visualization tools
- [ ] API monetization layer
- [ ] Enterprise features

## 🔐 Segurança

### Princípios
1. **Zero Trust Architecture**
2. **Principle of Least Privilege**
3. **Defense in Depth**
4. **Secure by Default**

### Implementações
- JWT para autenticação
- Rate limiting por IP/user
- Input validation com Pydantic
- SQL injection prevention
- XSS protection
- CORS configuration
- Secrets management

## 📚 Exemplos de Uso

### 🔎 Exemplo 1: Investigar gasto suspeito
```bash
$ cidadao investigate "verba destinada a shows em cidades de até 10 mil habitantes no Norte do Brasil entre 2020 e 2024"

🔍 Investigando gastos públicos...
📊 Analisando 1,247 contratos encontrados...
⚠️  3 anomalias detectadas:

1. Contrato #2023-PA-0042
   Valor: R$ 2.8M (450% acima da média)
   Cidade: São Félix do Xingu (PA) - Pop: 8,213
   Explicação: "Valor incompatível com porte do município.
                Fornecedor registrado 15 dias antes do contrato."
   
2. Contrato #2022-AM-0128
   Valor: R$ 1.2M
   Cidade: Japurá (AM) - Pop: 2,755
   Explicação: "Show nacional em cidade sem infraestrutura 
                aeroportuária. Suspeita de superfaturamento."

💡 Recomendação: Solicitar documentação comprobatória ao TCU
📈 Confiança da análise: 87%
```

### 📊 Exemplo 2: Monitoramento em tempo real
```bash
$ cidadao watch --org "ministerio-saude" --alert-on "anomaly"

👁️  Monitorando Ministério da Saúde...
🔄 Atualização a cada 30 minutos

[14:32] ✅ 127 novos pagamentos analisados - Sem anomalias
[15:02] ⚠️  ALERTA: Compra emergencial detectada
        Item: "Seringas descartáveis"
        Valor: R$ 4.2M (320% acima do histórico)
        Fornecedor: Novo no sistema
        Ação: Investigação automática iniciada...
        
[15:03] 📋 Relatório gerado: MS_Alert_2024_02_15_1502.pdf
```

### 🤖 Exemplo 3: Conversa com o Burocraticus
```python
# Via SDK Python
from cidadao_ai import CidadaoChat

chat = CidadaoChat()

# Primeira pergunta
response = await chat.ask(
    "Quanto o governo gastou com publicidade em 2024?"
)

print(response.answer)
# "O governo federal destinou R$ 487,3 milhões para publicidade 
#  e propaganda em 2024, representando um aumento de 23% em 
#  relação a 2023..."

# Pergunta de follow-up (com memória)
response = await chat.ask(
    "E quanto foi especificamente em mídias digitais?"
)

print(response.answer)
# "Dos R$ 487,3 milhões mencionados, R$ 198,7 milhões (40.8%) 
#  foram destinados a mídias digitais, com destaque para..."
```

### 📈 Exemplo 4: Análise preditiva
```bash
$ cidadao analyze --type "predictive" --org "mec" --metric "custo-merenda"

🧮 Analisando séries temporais do MEC...
📊 Métrica: Custo per capita de merenda escolar

Histórico (2020-2024):
2020: R$ 0.87/aluno/dia
2021: R$ 0.92/aluno/dia
2022: R$ 1.04/aluno/dia
2023: R$ 1.18/aluno/dia
2024: R$ 1.31/aluno/dia

📈 Previsão 2025:
- Cenário otimista: R$ 1.42/aluno/dia
- Cenário realista: R$ 1.48/aluno/dia  
- Cenário pessimista: R$ 1.56/aluno/dia

⚠️  Alerta: Crescimento acima da inflação em 3 dos 5 anos
💡 Insight: Possível ineficiência na cadeia de suprimentos
```

### 🔐 Exemplo 5: Auditoria de investigações
```bash
$ cidadao audit --investigation-id "INV-2024-0542"

🔍 Auditoria da Investigação INV-2024-0542
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Data: 2024-02-15 14:32:17 UTC
👤 Usuário: anderson@example.com
🤖 Agentes utilizados:
   - MasterAgent (v2.1.0)
   - InvestigatorAgent (v2.1.0)
   - ExplainableAI (v1.3.0)

📊 Dados processados:
   - 3,421 registros analisados
   - 12 fontes consultadas
   - 98.7% de cobertura

🔗 Hash Chain:
   Previous: 0x7f3a9b2c4e5d6f8a9b0c1d2e3f4a5b6c
   Current:  0x8a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d
   ✅ Integridade verificada

📋 Conclusões auditáveis:
   1. "Superfaturamento de 340%" - Fontes: [API-2024-02-15-doc1247]
   2. "Fornecedor sem histórico" - Fontes: [CNPJ-API, ReceitaWS]
   
🔒 Assinatura digital: RSA-4096-VALID
```

## 🤝 Contributing Guidelines

### Pull Request Process
1. Fork the repository
2. Create feature branch from `develop`
3. Write tests for new features
4. Ensure all tests pass
5. Update documentation
6. Submit PR with detailed description

### Code Review Checklist
- [ ] Tests coverage > 80%
- [ ] No security vulnerabilities
- [ ] Documentation updated
- [ ] Performance impact assessed
- [ ] Backward compatibility maintained

## 🔒 Licença e Propriedade Intelectual

### Licença Proprietária
Este software é propriedade exclusiva de Anderson H. Silva. Todos os direitos reservados.

#### Termos de Uso
- **Proibida** a reprodução, distribuição ou uso comercial sem autorização expressa
- **Proibida** a engenharia reversa ou criação de trabalhos derivados
- **Permitido** uso para avaliação e demonstração mediante acordo prévio

#### Proteção de IP
- Código fonte protegido por direitos autorais
- Algoritmos e metodologias considerados segredo comercial
- Modelos treinados e datasets são propriedade intelectual exclusiva

Para licenciamento comercial ou parcerias, contate: andersonhs27@gmail.com

---

*"O que Brasília esconde, nossa IA revela."* 🔍

*Cidadão.AI - A máquina que não apenas entende o Estado, mas o interroga.*
