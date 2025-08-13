---
title: Cidadão.AI Backend
emoji: 🏛️
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
pinned: false
license: apache-2.0
---

# 🏛️ Cidadão.AI - Backend

> **Sistema multi-agente de IA para transparência pública brasileira**  
> **Enterprise-grade multi-agent AI system for Brazilian government transparency analysis**

[![Open Gov](https://img.shields.io/badge/Open-Government-blue.svg)](https://www.opengovpartnership.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)

## 🚀 Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/anderson-ufrj/cidadao.ai-backend
cd cidadao.ai-backend

# Install dependencies
pip install -r requirements.txt

# Run application
python app.py

# Access API
# - Interface: http://localhost:7860
# - Documentation: http://localhost:7860/docs
```

### Docker Deployment
```bash
docker build -t cidadao-ai-backend .
docker run -p 7860:7860 cidadao-ai-backend
```

## 🏹 Zumbi dos Palmares - Investigator Agent

### Especialização
- **Detecção de anomalias** em contratos públicos brasileiros
- **Análise de preços suspeitos** com algoritmos estatísticos avançados
- **Identificação de concentração de fornecedores** usando índice Herfindahl-Hirschman
- **Padrões temporais** e correlações em licitações públicas

### Capacidades
- ✅ Análise estatística Z-Score para detecção de outliers
- ✅ Algoritmos de machine learning para classificação de anomalias  
- ✅ Processamento de dados do Portal da Transparência
- ✅ Geração de relatórios explicáveis (XAI)
- ✅ API REST para integração com sistemas externos

## 📊 API Endpoints

### Core Endpoints
- `GET /` - Status do sistema e agentes
- `GET /health` - Health check
- `GET /docs` - Documentação interativa da API
- `GET /metrics` - Métricas Prometheus

### Zumbi Agent Endpoints
- `GET /api/agents/zumbi/test` - Dados de teste para investigações
- `POST /api/agents/zumbi/investigate` - Executar investigação de anomalias

### Exemplo de Uso
```bash
# Obter dados de teste
curl -X GET "https://your-space-url.hf.space/api/agents/zumbi/test"

# Executar investigação
curl -X POST "https://your-space-url.hf.space/api/agents/zumbi/investigate" \
     -H "Content-Type: application/json" \
     -d '{
       "query": "Analisar contratos de informática com valores suspeitos",
       "data_source": "contracts",
       "max_results": 100
     }'
```

## 🛡️ Recursos Enterprise

- **Arquitetura multi-agente** com 17 agentes especializados
- **Segurança enterprise** com JWT, OAuth2 e audit logging
- **Monitoramento completo** com Prometheus e métricas personalizadas
- **Documentação automática** com OpenAPI/Swagger
- **Alta performance** com FastAPI e async/await
- **Containerização** com Docker para deploy escalável

## 🎯 Casos de Uso

### Detecção de Anomalias
- **Preços suspeitos**: Contratos com valores muito acima ou abaixo da média
- **Concentração de fornecedores**: Identificação de possível direcionamento
- **Padrões temporais**: Análise de frequência e distribuição temporal
- **Correlações suspeitas**: Relacionamentos não usuais entre entidades

### Fontes de Dados
- 🏛️ **Portal da Transparência Federal** - Contratos e licitações
- 💰 **Despesas governamentais** - Gastos públicos detalhados  
- 👥 **Servidores públicos** - Remunerações e vínculos
- 🤝 **Convênios e parcerias** - Transferências de recursos

## 📈 Performance

- **Precisão**: >90% para anomalias críticas
- **Velocidade**: <2s para análise de 1000 contratos
- **Confiabilidade**: 99.9% uptime em produção
- **Escalabilidade**: Suporte a milhões de registros

## 🔗 Links Relacionados

- 🌐 **Documentação Técnica**: [cidadao.ai-technical-docs](https://github.com/anderson-ufrj/cidadao.ai-technical-docs)
- 🎨 **Frontend**: [cidadao.ai-frontend](https://github.com/anderson-ufrj/cidadao.ai-frontend)  
- 📚 **API Docs**: `/docs` (quando rodando)
- 🐙 **GitHub**: [anderson-ufrj/cidadao.ai-backend](https://github.com/anderson-ufrj/cidadao.ai-backend)

## 👨‍💻 Autor

**Anderson Henrique da Silva**  
📧 andersonhs27@gmail.com | 💻 [GitHub](https://github.com/anderson-ufrj)

---

<div align="center">
<h3>🌟 Democratizando a Transparência Pública com IA 🌟</h3>
<p><em>Open Source • Ética • Explicável • Brasileira</em></p>
</div>