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