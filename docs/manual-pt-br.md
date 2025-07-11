# 📋 Manual do Usuário - Cidadão.AI

**Versão:** 1.0.0  
**Data:** Janeiro 2025  
**Idioma:** Português (Brasil)

---

## 📑 Índice

1. [Visão Geral](#-visão-geral)
2. [Instalação](#-instalação)
3. [Configuração](#-configuração)
4. [Primeiros Passos](#-primeiros-passos)
5. [Interface de Linha de Comando (CLI)](#-interface-de-linha-de-comando-cli)
6. [API REST](#-api-rest)
7. [Sistema Multi-Agentes](#-sistema-multi-agentes)
8. [Casos de Uso](#-casos-de-uso)
9. [Solução de Problemas](#-solução-de-problemas)
10. [Perguntas Frequentes](#-perguntas-frequentes)

---

## 🎯 Visão Geral

### O que é o Cidadão.AI?

O **Cidadão.AI** é uma plataforma de inteligência artificial especializada em análise de transparência pública. O sistema utiliza uma arquitetura multi-agente avançada para transformar dados complexos do Portal da Transparência em investigações inteligentes e relatórios compreensíveis.

### Principais Funcionalidades

- **🔍 Detecção de Anomalias**: Identifica irregularidades em contratos, despesas e licitações públicas
- **📊 Análise de Padrões**: Descobre tendências e correlações ocultas nos dados governamentais
- **📄 Geração de Relatórios**: Cria relatórios em linguagem natural nos formatos Markdown, HTML e JSON
- **🌐 API REST Completa**: Endpoints para integração com sistemas externos
- **⚡ Processamento em Tempo Real**: Streaming de resultados conforme são descobertos
- **🔐 Segurança Robusta**: Autenticação JWT, rate limiting e auditoria completa

### Arquitetura do Sistema

O Cidadão.AI é construído com uma arquitetura de microsserviços baseada em agentes especializados:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API REST      │    │ Multi-Agentes   │
│   (Planejado)   │◄──►│   FastAPI       │◄──►│   Specialized   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Database      │    │   Portal da     │    │   LLM Providers │
│ PostgreSQL/Redis│    │ Transparência   │    │ Groq/Together   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Tecnologias Utilizadas

- **Backend**: Python 3.11+, FastAPI, Pydantic
- **IA/ML**: LangChain, Hugging Face Transformers, SHAP/LIME
- **LLM**: Groq, Together AI, Hugging Face
- **Banco de Dados**: PostgreSQL, Redis, ChromaDB
- **Autenticação**: JWT, API Key
- **Observabilidade**: Logging estruturado, métricas de performance

---

## 🛠️ Instalação

### Pré-requisitos

Antes de instalar o Cidadão.AI, certifique-se de ter:

- **Python 3.11** ou superior
- **Git** para controle de versão
- **Chave da API** do Portal da Transparência
- **Chaves das APIs** de LLM (Groq, Together AI, ou Hugging Face)

### Instalação via Git

```bash
# 1. Clone o repositório
git clone https://github.com/anderson-ufrj/cidadao.ai.git
cd cidadao-ai

# 2. Crie um ambiente virtual
python -m venv venv

# 3. Ative o ambiente virtual
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 4. Instale as dependências
pip install -e ".[dev]"

# 5. Verifique a instalação
cidadao --version
```

### Instalação via Docker

```bash
# 1. Clone o repositório
git clone https://github.com/anderson-ufrj/cidadao.ai.git
cd cidadao-ai

# 2. Build da imagem Docker
docker build -t cidadao-ai .

# 3. Execute o container
docker run -p 8000:8000 \
  -e TRANSPARENCY_API_KEY=sua_chave_aqui \
  -e GROQ_API_KEY=sua_chave_groq \
  cidadao-ai
```

### Verificação da Instalação

Para verificar se a instalação foi bem-sucedida:

```bash
# Teste o CLI
cidadao --help

# Teste a API (se configurada)
curl http://localhost:8000/health
```

---

## ⚙️ Configuração

### Arquivo de Configuração (.env)

O Cidadão.AI utiliza variáveis de ambiente para configuração. Copie o arquivo de exemplo e configure suas chaves:

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo com suas chaves
nano .env
```

### Variáveis de Ambiente Obrigatórias

```bash
# API do Portal da Transparência
TRANSPARENCY_API_KEY=sua_chave_portal_transparencia

# Provedores de LLM (pelo menos um obrigatório)
GROQ_API_KEY=sua_chave_groq
TOGETHER_API_KEY=sua_chave_together_ai
HUGGINGFACE_API_KEY=sua_chave_huggingface

# Configurações da API
JWT_SECRET_KEY=sua_chave_secreta_jwt_aqui
```

### Variáveis de Ambiente Opcionais

```bash
# Ambiente de execução
APP_ENV=development  # development, staging, production

# Configurações do servidor
HOST=0.0.0.0
PORT=8000
DEBUG=true

# Configurações de rate limiting
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000
RATE_LIMIT_PER_DAY=10000

# Configurações de log
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR

# URLs dos provedores LLM
GROQ_API_BASE_URL=https://api.groq.com/openai/v1
TOGETHER_API_BASE_URL=https://api.together.xyz/v1
```

### Obtenção das Chaves de API

#### Portal da Transparência

1. Acesse: https://api.portaldatransparencia.gov.br/swagger-ui/index.html
2. Registre-se no sistema
3. Solicite uma chave de API
4. Aguarde a aprovação (pode levar alguns dias)

#### Groq

1. Acesse: https://console.groq.com/
2. Crie uma conta gratuita
3. Gere uma nova API key
4. Copie a chave para o arquivo .env

#### Together AI

1. Acesse: https://api.together.xyz/
2. Registre-se na plataforma
3. Acesse o dashboard e gere uma API key
4. Configure no arquivo .env

#### Hugging Face

1. Acesse: https://huggingface.co/
2. Crie uma conta
3. Vá para Settings → Access Tokens
4. Gere um novo token
5. Configure no arquivo .env

### Validação da Configuração

Após configurar as variáveis de ambiente, valide a configuração:

```bash
# Teste a conectividade com as APIs
cidadao test-connection

# Verificar status dos serviços
curl http://localhost:8000/health/detailed
```

---

## 🚀 Primeiros Passos

### 1. Primeira Execução

Após a instalação e configuração, inicie o sistema:

```bash
# Iniciar servidor da API
python -m src.api.app

# Ou usando uvicorn diretamente
uvicorn src.api.app:app --reload --host 0.0.0.0 --port 8000
```

### 2. Verificação do Sistema

```bash
# Verificar se a API está funcionando
curl http://localhost:8000/health

# Resposta esperada:
{
  "status": "healthy",
  "timestamp": "2025-01-24T15:30:00Z",
  "version": "1.0.0",
  "uptime": 10.5
}
```

### 3. Acessar a Documentação Interativa

Abra seu navegador e acesse:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 4. Primeira Investigação via CLI

```bash
# Investigação simples
cidadao investigate "contratos emergenciais suspeitos"

# Investigação com filtros
cidadao investigate "licitações direcionadas" \
  --org "26000" \
  --year 2024 \
  --min-value 1000000
```

### 5. Primeira Investigação via API

```bash
# Iniciar investigação
curl -X POST "http://localhost:8000/api/v1/investigations/start" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "contratos com preços suspeitos",
    "data_source": "contracts",
    "anomaly_types": ["price", "vendor"]
  }'

# Resposta:
{
  "investigation_id": "inv-12345",
  "status": "started",
  "message": "Investigation queued for processing"
}
```

### 6. Acompanhar Progresso

```bash
# Via API - Status
curl "http://localhost:8000/api/v1/investigations/inv-12345/status"

# Via API - Stream em tempo real
curl "http://localhost:8000/api/v1/investigations/stream/inv-12345"

# Via CLI
cidadao status inv-12345
```

### 7. Obter Resultados

```bash
# Resultados completos via API
curl "http://localhost:8000/api/v1/investigations/inv-12345/results"

# Via CLI
cidadao results inv-12345 --format json
```

---

## 💻 Interface de Linha de Comando (CLI)

### Comandos Principais

O Cidadão.AI oferece uma interface de linha de comando intuitiva e poderosa:

#### Investigação de Anomalias

```bash
# Investigação básica
cidadao investigate "descrição da investigação"

# Investigação com filtros específicos
cidadao investigate "contratos suspeitos" \
  --source contracts \
  --org "26000" \
  --year 2024 \
  --min-value 1000000 \
  --anomaly-types price,vendor,temporal

# Investigação com saída específica
cidadao investigate "licitações irregulares" \
  --output results.json \
  --format json \
  --explain
```

#### Análise de Padrões

```bash
# Análise de tendências
cidadao analyze trends \
  --source contracts \
  --period 6months \
  --org "Ministério da Saúde"

# Análise de correlações
cidadao analyze correlations \
  --variables valor,prazo,fornecedor \
  --source contracts

# Detecção de padrões
cidadao analyze patterns \
  --type vendor \
  --source contracts \
  --org "26000"
```

#### Geração de Relatórios

```bash
# Relatório executivo
cidadao report generate \
  --type executive_summary \
  --title "Análise Q1 2024" \
  --investigations inv-001,inv-002 \
  --format html

# Relatório detalhado
cidadao report generate \
  --type detailed_analysis \
  --source contracts \
  --period "2024-01-01,2024-12-31" \
  --format markdown

# Listar relatórios disponíveis
cidadao report list --status completed
```

#### Monitoramento e Status

```bash
# Status do sistema
cidadao status

# Status de investigação específica
cidadao status inv-12345

# Monitoramento em tempo real
cidadao watch --org "26000" --threshold 0.8

# Logs do sistema
cidadao logs --tail 100 --level ERROR
```

#### Configuração e Teste

```bash
# Testar conectividade
cidadao test-connection

# Configurar chaves de API
cidadao config set GROQ_API_KEY "sua_chave_aqui"

# Visualizar configuração atual
cidadao config show

# Limpar cache
cidadao cache clear
```

### Opções Globais

```bash
# Opções disponíveis para todos os comandos
--verbose, -v        # Saída detalhada
--quiet, -q          # Saída mínima
--config FILE        # Arquivo de configuração específico
--output FILE        # Arquivo de saída
--format FORMAT      # Formato de saída (json, yaml, table, csv)
--no-cache          # Desabilitar cache
--timeout SECONDS   # Timeout personalizado
```

### Exemplos Práticos de Uso do CLI

#### Investigação Completa de Contratos

```bash
# 1. Investigar contratos suspeitos
cidadao investigate "contratos emergenciais em cidades pequenas" \
  --source contracts \
  --year 2024 \
  --min-value 500000 \
  --anomaly-types price,vendor \
  --output investigacao_contratos.json

# 2. Analisar padrões nos resultados
cidadao analyze patterns \
  --type vendor \
  --input investigacao_contratos.json \
  --output padroes_fornecedores.json

# 3. Gerar relatório final
cidadao report generate \
  --type investigation_report \
  --title "Contratos Emergenciais Suspeitos - 2024" \
  --input investigacao_contratos.json,padroes_fornecedores.json \
  --format html \
  --output relatorio_final.html
```

#### Monitoramento Contínuo

```bash
# Monitorar anomalias em tempo real
cidadao watch \
  --org "Ministério da Saúde" \
  --threshold 0.9 \
  --alert-email admin@empresa.com \
  --check-interval 3600  # Verificar a cada hora
```

---

## 🌐 API REST

### Visão Geral da API

A API REST do Cidadão.AI fornece acesso programático a todas as funcionalidades do sistema. Ela é baseada nos padrões REST e retorna dados em formato JSON.

**Base URL**: `http://localhost:8000`  
**Versão**: `v1`  
**Documentação Interativa**: `/docs`

### Autenticação

#### Autenticação por API Key

```bash
# Incluir header em todas as requisições
curl -H "X-API-Key: sua_chave_api" \
  http://localhost:8000/api/v1/investigations/
```

#### Autenticação JWT

```bash
# 1. Obter token (endpoint de login será implementado)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 2. Usar token nas requisições
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/investigations/
```

### Endpoints Principais

#### Health Check

```bash
# Status básico
GET /health

# Status detalhado
GET /health/detailed

# Probes do Kubernetes
GET /health/live    # Liveness
GET /health/ready   # Readiness
```

#### Investigações

```bash
# Iniciar investigação
POST /api/v1/investigations/start
{
  "query": "contratos suspeitos",
  "data_source": "contracts",
  "filters": {"ano": 2024},
  "anomaly_types": ["price", "vendor"],
  "include_explanations": true
}

# Listar investigações
GET /api/v1/investigations/?status=completed&limit=10

# Status de investigação
GET /api/v1/investigations/{id}/status

# Resultados completos
GET /api/v1/investigations/{id}/results

# Stream em tempo real
GET /api/v1/investigations/stream/{id}

# Cancelar investigação
DELETE /api/v1/investigations/{id}
```

#### Análises

```bash
# Iniciar análise
POST /api/v1/analysis/start
{
  "analysis_type": "spending_trends",
  "data_source": "contracts",
  "time_range": {"start": "2024-01-01", "end": "2024-12-31"},
  "include_correlations": true
}

# Análise de tendências
GET /api/v1/analysis/trends?data_source=contracts&time_period=6months

# Análise de correlações
GET /api/v1/analysis/correlations?variables=valor,prazo&data_source=contracts

# Detecção de padrões
GET /api/v1/analysis/patterns?data_source=contracts&pattern_type=vendor

# Resultados de análise
GET /api/v1/analysis/{id}/results
```

#### Relatórios

```bash
# Gerar relatório
POST /api/v1/reports/generate
{
  "report_type": "executive_summary",
  "title": "Análise de Transparência Q1 2024",
  "data_sources": ["contracts", "expenses"],
  "investigation_ids": ["inv-001"],
  "output_format": "markdown",
  "target_audience": "executive"
}

# Templates disponíveis
GET /api/v1/reports/templates

# Obter relatório
GET /api/v1/reports/{id}

# Download do relatório
GET /api/v1/reports/{id}/download?format=html

# Listar relatórios
GET /api/v1/reports/?report_type=executive_summary&limit=10

# Deletar relatório
DELETE /api/v1/reports/{id}
```

### Códigos de Status HTTP

- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **400 Bad Request**: Erro de validação na requisição
- **401 Unauthorized**: Autenticação necessária
- **403 Forbidden**: Acesso negado
- **404 Not Found**: Recurso não encontrado
- **409 Conflict**: Conflito de estado do recurso
- **429 Too Many Requests**: Limite de taxa excedido
- **500 Internal Server Error**: Erro interno do servidor
- **502 Bad Gateway**: Erro do serviço externo
- **503 Service Unavailable**: Serviço temporariamente indisponível

### Rate Limiting

A API implementa limitação de taxa para prevenir abuso:

- **Por minuto**: 60 requisições
- **Por hora**: 1.000 requisições
- **Por dia**: 10.000 requisições

Headers de resposta incluem informações de limite:
```
X-RateLimit-Limit-Minute: 60
X-RateLimit-Remaining-Minute: 45
X-RateLimit-Reset: 1642789200
```

### Streaming de Dados

Para operações longas, a API oferece streaming em tempo real via Server-Sent Events:

```javascript
// Exemplo em JavaScript
const eventSource = new EventSource(
  'http://localhost:8000/api/v1/investigations/stream/inv-12345'
);

eventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  
  if (data.type === 'progress') {
    console.log(`Progresso: ${data.progress * 100}%`);
  } else if (data.type === 'anomaly') {
    console.log('Nova anomalia encontrada:', data.result);
  } else if (data.type === 'completion') {
    console.log('Investigação concluída');
    eventSource.close();
  }
};
```

---

## 🤖 Sistema Multi-Agentes

### Arquitetura dos Agentes

O Cidadão.AI utiliza uma arquitetura multi-agente onde cada agente tem responsabilidades específicas:

#### 1. Master Agent (Orquestrador)
- **Função**: Coordena outros agentes e gerencia o fluxo de trabalho
- **Capacidades**: Planejamento, reflexão e otimização de estratégias
- **Uso**: Ponto de entrada para investigações complexas

#### 2. Investigator Agent (Investigador)
- **Função**: Detecta anomalias e irregularidades nos dados
- **Capacidades**: 
  - Detecção de anomalias de preço
  - Identificação de concentração de fornecedores
  - Análise de padrões temporais suspeitos
  - Detecção de contratos duplicados
- **Algoritmos**: Z-score, isolamento florestal, detecção de outliers

#### 3. Analyst Agent (Analista)
- **Função**: Realiza análises estatísticas e identifica padrões
- **Capacidades**:
  - Análise de tendências de gastos
  - Correlações entre variáveis
  - Padrões comportamentais organizacionais
  - Análise sazonal e temporal
- **Métodos**: Regressão, clustering, análise de séries temporais

#### 4. Reporter Agent (Relator)
- **Função**: Gera relatórios em linguagem natural
- **Capacidades**:
  - Relatórios executivos
  - Análises técnicas detalhadas
  - Múltiplos formatos de saída
  - Adaptação para diferentes audiências

#### 5. Context Memory Agent (Memória Contextual)
- **Função**: Gerencia memória episódica e semântica
- **Capacidades**:
  - Lembrança de investigações anteriores
  - Contexto entre sessões
  - Aprendizado incremental

#### 6. Semantic Router (Roteador Semântico)
- **Função**: Direciona consultas para agentes apropriados
- **Capacidades**:
  - Análise de intenção
  - Roteamento inteligente
  - Otimização de recursos

### Fluxo de Trabalho dos Agentes

```mermaid
graph TD
    A[Consulta do Usuário] --> B[Semantic Router]
    B --> C{Tipo de Consulta}
    C -->|Anomalias| D[Investigator Agent]
    C -->|Padrões| E[Analyst Agent]
    C -->|Relatórios| F[Reporter Agent]
    D --> G[Context Memory]
    E --> G
    F --> G
    G --> H[Master Agent]
    H --> I[Resultado Final]
```

### Comunicação Entre Agentes

Os agentes se comunicam através de:

#### Mensagens Estruturadas
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

#### Contexto Compartilhado
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

### Configuração dos Agentes

#### Configuração via Código
```python
from src.agents import InvestigatorAgent, AnalystAgent

# Configurar Investigator Agent
investigator = InvestigatorAgent(
    llm_provider="groq",
    confidence_threshold=0.8,
    max_anomalies=100,
    explanation_detail="high"
)

# Configurar Analyst Agent
analyst = AnalystAgent(
    llm_provider="together",
    analysis_depth="comprehensive",
    correlation_threshold=0.7
)
```

#### Configuração via Environment
```bash
# Configurações do Investigator Agent
INVESTIGATOR_CONFIDENCE_THRESHOLD=0.8
INVESTIGATOR_MAX_ANOMALIES=100
INVESTIGATOR_LLM_PROVIDER=groq

# Configurações do Analyst Agent
ANALYST_CORRELATION_THRESHOLD=0.7
ANALYST_TREND_SENSITIVITY=0.05
ANALYST_LLM_PROVIDER=together
```

---

## 🎯 Casos de Uso

### 1. Jornalismo Investigativo

#### Cenário: Investigação de Contratos Emergenciais
Um jornalista quer investigar contratos emergenciais suspeitos durante a pandemia.

```bash
# Investigação via CLI
cidadao investigate "contratos emergenciais COVID-19 com preços inflacionados" \
  --source contracts \
  --date-range "2020-03-01,2022-12-31" \
  --keywords "emergencial,COVID,pandemia" \
  --min-value 100000 \
  --anomaly-types price,vendor,temporal \
  --explain

# Gerar relatório jornalístico
cidadao report generate \
  --type investigation_report \
  --title "Contratos Emergenciais na Pandemia" \
  --target-audience journalist \
  --format html \
  --include-evidence
```

#### Resultado Esperado:
- Lista de contratos com preços suspeitos
- Explicações detalhadas das anomalias
- Sugestões de investigação adicional
- Relatório formatado para publicação

### 2. Auditoria Governamental

#### Cenário: Auditoria de Órgão Público
Auditor interno precisa analisar gastos do Ministério da Saúde.

```bash
# Análise abrangente via API
curl -X POST "http://localhost:8000/api/v1/analysis/start" \
  -H "Content-Type: application/json" \
  -d '{
    "analysis_type": "organizational_behavior",
    "data_source": "contracts",
    "filters": {"codigo_orgao": "26000"},
    "time_range": {"start": "2024-01-01", "end": "2024-12-31"},
    "include_correlations": true,
    "include_trends": true
  }'

# Gerar relatório de auditoria
curl -X POST "http://localhost:8000/api/v1/reports/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "report_type": "audit_report",
    "title": "Auditoria Ministério da Saúde 2024",
    "target_audience": "technical",
    "output_format": "markdown",
    "include_raw_data": true
  }'
```

### 3. ONGs e Transparência

#### Cenário: Monitoramento Contínuo de Gastos
ONG quer monitorar gastos educacionais continuamente.

```bash
# Configurar monitoramento
cidadao watch \
  --org "Ministério da Educação" \
  --categories "educacao,ensino,escola" \
  --threshold 0.85 \
  --alert-webhook "https://ong.org/webhook/alerts" \
  --frequency daily

# Dashboard de transparência
cidadao report generate \
  --type transparency_dashboard \
  --title "Dashboard Educação - $(date +%B\ %Y)" \
  --data-sources contracts,expenses \
  --target-audience general \
  --format html \
  --auto-update daily
```

### 4. Pesquisa Acadêmica

#### Cenário: Estudo sobre Eficiência de Gastos Públicos
Pesquisador quer analisar correlações entre gastos e resultados.

```python
import asyncio
from cidadao_ai import CidadaoClient

async def pesquisa_academica():
    client = CidadaoClient()
    
    # Análise de correlações
    correlations = await client.analyze_correlations(
        variables=["valor_contrato", "prazo_execucao", "resultado_entrega"],
        data_source="contracts",
        time_range="2020-2024",
        method="pearson"
    )
    
    # Análise de eficiência
    efficiency = await client.analyze_efficiency(
        metric="custo_beneficio",
        group_by="orgao",
        period="quarterly"
    )
    
    return {
        "correlations": correlations,
        "efficiency": efficiency
    }

# Executar pesquisa
results = asyncio.run(pesquisa_academica())
```

### 5. Controle Social

#### Cenário: Cidadão Verificando Gastos Locais
Cidadão quer verificar gastos da prefeitura local.

```bash
# Investigação municipal via CLI
cidadao investigate "gastos suspeitos prefeitura São Paulo" \
  --scope municipal \
  --location "São Paulo,SP" \
  --categories obras,servicos \
  --period 2024 \
  --explain-citizen

# Relatório cidadão
cidadao report generate \
  --type citizen_report \
  --title "Gastos Públicos São Paulo 2024" \
  --language simple \
  --format html \
  --include-graphics
```

---

## 🔧 Solução de Problemas

### Problemas Comuns e Soluções

#### 1. Erro de Autenticação da API

**Problema**: `401 Unauthorized` ao fazer requisições

**Possíveis Causas**:
- Chave de API inválida ou expirada
- Header de autenticação mal formatado
- Permissões insuficientes

**Soluções**:
```bash
# Verificar chaves de API
cidadao config show

# Testar conectividade
cidadao test-connection

# Regenerar configuração
cp .env.example .env
# Editar .env com novas chaves

# Verificar formato do header
curl -H "X-API-Key: sua_chave_aqui" http://localhost:8000/health
```

#### 2. Rate Limit Excedido

**Problema**: `429 Too Many Requests`

**Soluções**:
```bash
# Verificar limites atuais
curl -I http://localhost:8000/health

# Aguardar reset (verificar header X-RateLimit-Reset)
# Ou implementar backoff exponencial no código

# Aumentar limites (se necessário)
export RATE_LIMIT_PER_MINUTE=120
export RATE_LIMIT_PER_HOUR=2000
```

#### 3. Timeout em Investigações

**Problema**: Investigações demoram muito ou expiram

**Soluções**:
```bash
# Aumentar timeout
cidadao investigate "query" --timeout 300

# Usar filtros mais específicos
cidadao investigate "query" \
  --date-range "2024-01-01,2024-01-31" \
  --max-records 1000

# Monitorar progresso via streaming
curl "http://localhost:8000/api/v1/investigations/stream/{id}"
```

#### 4. Erro de Conexão com Portal da Transparência

**Problema**: `502 Bad Gateway` ou timeouts

**Soluções**:
```bash
# Verificar status do Portal
curl -I https://api.portaldatransparencia.gov.br/api-de-dados/orgaos

# Verificar chave de API
curl -H "chave-api-dados: sua_chave" \
  https://api.portaldatransparencia.gov.br/api-de-dados/orgaos

# Configurar retry e backoff
export TRANSPARENCY_API_RETRY_ATTEMPTS=5
export TRANSPARENCY_API_BACKOFF_FACTOR=2
```

#### 5. Problemas de Memória/Performance

**Problema**: Sistema lento ou com pouca memória

**Soluções**:
```bash
# Limpar cache
cidadao cache clear

# Verificar uso de memória
docker stats cidadao-ai  # Se usando Docker

# Otimizar configurações
export MAX_CONCURRENT_REQUESTS=10
export CACHE_TTL=3600
export MAX_RESULTS_PER_PAGE=100
```

### Logs e Debugging

#### Habilitar Logs Detalhados

```bash
# Configurar nível de log
export LOG_LEVEL=DEBUG

# Logs em arquivo
export LOG_FILE=/var/log/cidadao-ai.log

# Logs estruturados
export LOG_FORMAT=json
```

#### Verificar Logs

```bash
# Via CLI
cidadao logs --tail 100 --level ERROR

# Via Docker
docker logs cidadao-ai --tail 100

# Via arquivo
tail -f /var/log/cidadao-ai.log | grep ERROR
```

#### Modo Debug

```bash
# Executar em modo debug
python -m src.api.app --debug

# Ou via uvicorn
uvicorn src.api.app:app --reload --log-level debug
```

### Backup e Recuperação

#### Backup de Dados

```bash
# Backup de configurações
cp .env .env.backup

# Backup de resultados (se usando banco local)
pg_dump cidadao_ai > backup_$(date +%Y%m%d).sql

# Backup de cache Redis
redis-cli --rdb backup_redis_$(date +%Y%m%d).rdb
```

#### Recuperação de Dados

```bash
# Restaurar configurações
cp .env.backup .env

# Restaurar banco
psql cidadao_ai < backup_20250124.sql

# Restaurar cache Redis
redis-cli --rdb backup_redis_20250124.rdb
```

---

## ❓ Perguntas Frequentes

### Instalação e Configuração

**P: Quais são os requisitos mínimos do sistema?**
R: Python 3.11+, 4GB RAM, 2GB de espaço em disco, conexão com internet para APIs externas.

**P: Posso usar o sistema sem chaves de API de LLM?**
R: Não, pelo menos uma chave de LLM (Groq, Together AI ou Hugging Face) é obrigatória para o funcionamento dos agentes de IA.

**P: Como obtenho uma chave do Portal da Transparência?**
R: Acesse https://api.portaldatransparencia.gov.br/, registre-se e solicite uma chave. O processo pode levar alguns dias para aprovação.

**P: O sistema funciona offline?**
R: Não completamente. O sistema precisa de conexão para acessar APIs externas (Portal da Transparência e LLMs), mas pode armazenar dados localmente para consultas posteriores.

### Uso e Funcionalidades

**P: Qual a diferença entre investigação e análise?**
R: Investigação foca em detectar anomalias específicas, enquanto análise identifica padrões e tendências gerais nos dados.

**P: Posso processar dados de múltiplos órgãos simultaneamente?**
R: Sim, use filtros amplos ou execute investigações separadas para cada órgão e depois combine os resultados.

**P: Como interpretar os scores de confiança?**
R: Scores de 0.0-0.3 (baixa), 0.3-0.7 (média), 0.7-1.0 (alta confiança). Recomenda-se investigar anomalias com score > 0.7.

**P: Os relatórios podem ser customizados?**
R: Sim, há templates para diferentes audiências e você pode personalizar formato, seções e nível de detalhamento.

### Performance e Limites

**P: Quantos registros o sistema pode processar?**
R: Depende da memória disponível, mas tipicamente processa centenas de milhares de registros. Para datasets maiores, use filtros para dividir em lotes.

**P: Por que algumas investigações demoram muito?**
R: Investigações complexas com muitos registros e múltiplos tipos de anomalia podem demorar. Use filtros mais específicos ou monitore via streaming.

**P: Existe limite de requisições por dia?**
R: Por padrão: 60/minuto, 1000/hora, 10000/dia. Esses limites podem ser ajustados conforme necessário.

### Segurança e Privacidade

**P: Os dados ficam armazenados no sistema?**
R: Por padrão, apenas em cache temporário. Para persistência, configure banco de dados. Dados sensíveis nunca são logados.

**P: O sistema é seguro para dados governamentais?**
R: Sim, implementa autenticação JWT, rate limiting, logs de auditoria e pode ser deployado em ambiente isolado.

**P: Como funciona a auditoria das operações?**
R: Toda operação é logada com hash criptográfico, timestamp e rastreabilidade completa das ações.

### Integração e Desenvolvimento

**P: Posso integrar com outros sistemas?**
R: Sim, via API REST completa com OpenAPI/Swagger. Suporta webhooks para notificações em tempo real.

**P: Há SDK para outras linguagens além de Python?**
R: Atualmente apenas Python nativo. Para outras linguagens, use a API REST diretamente.

**P: Como contribuir com o desenvolvimento?**
R: O projeto é proprietário atualmente. Para parcerias ou licenciamento, contate: andersonhs27@gmail.com

### Solução de Problemas

**P: O que fazer se a API retorna erro 500?**
R: Verifique logs com `cidadao logs --level ERROR`, verifique conectividade das APIs externas e reinicie o serviço se necessário.

**P: Como atualizar para nova versão?**
R: `git pull origin main && pip install -e ".[dev]" --upgrade`. Sempre faça backup antes de atualizar.

**P: Onde reportar bugs ou sugerir melhorias?**
R: Abra uma issue no GitHub: https://github.com/anderson-ufrj/cidadao.ai/issues

---

## 📞 Suporte e Contato

### Documentação Adicional
- **API Reference**: `/docs` (quando servidor está rodando)
- **GitHub**: https://github.com/anderson-ufrj/cidadao.ai
- **Issues**: https://github.com/anderson-ufrj/cidadao.ai/issues

### Contato do Desenvolvedor
**Anderson H. Silva**  
*Arquiteto de Inteligência Digital*

- 📧 **Email**: andersonhs27@gmail.com
- 🔗 **LinkedIn**: https://www.linkedin.com/in/anderson-h-silva95/
- 🐦 **Twitter/X**: https://twitter.com/neural_thinker

### Licenciamento e Parcerias
Para questões de licenciamento comercial, parcerias ou implementações customizadas, entre em contato diretamente.

---

**© 2025 Anderson H. Silva. Todos os direitos reservados.**

*Este manual foi gerado para a versão 1.0.0 do Cidadão.AI. Para a versão mais atualizada, consulte a documentação online.*