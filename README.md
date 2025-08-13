---
title: Cidadão.AI Backend
emoji: 🏛️
colorFrom: green
colorTo: blue
sdk: docker
app_file: app.py
pinned: false
license: apache-2.0
---

# 🏛️ Cidadão.AI - Backend

> **Sistema multi-agente de IA para transparência pública brasileira**

[![Open Gov](https://img.shields.io/badge/Open-Government-blue.svg)](https://www.opengovpartnership.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)

## 🚀 Quick Start

```bash
# Executar com Docker
docker-compose up -d

# Ou executar localmente
./start.sh

# Acessar
# Interface: http://localhost:7860
# API Docs: http://localhost:7860/docs
```

## 🤖 Sistema Multi-Agente

### 🏹 **Zumbi dos Palmares** - InvestigatorAgent
- **Especialização**: Detecção de anomalias em contratos públicos
- **Capacidades**: Preços suspeitos, concentração de fornecedores, padrões temporais
- **Algoritmos**: Análise estatística Z-Score, Herfindahl-Hirschman adaptado

### 🎭 **Outros Agentes Culturais**
- **Abaporu** (Master Agent) - Orquestração central com auto-reflexão
- **Anita Garibaldi** (Analyst) - Análise de padrões revolucionária  
- **Tiradentes** (Reporter) - Comunicação pela liberdade de informação
- **Machado de Assis** (Textual) - Processamento linguístico genial
- **E mais 13 agentes especializados...**

## 🛡️ Recursos Enterprise

- ✅ **HashiCorp Vault** para gestão de secrets
- ✅ **JWT + OAuth2 + API Keys** multi-layer authentication
- ✅ **Audit trail completo** com rastreabilidade
- ✅ **Rate limiting inteligente** e proteção DDoS
- ✅ **Observabilidade completa** com OpenTelemetry + Prometheus
- ✅ **Docker + Kubernetes** production-ready

## 📊 Fontes de Dados

- 🏛️ **Portal da Transparência Federal** - Contratos e licitações
- 💰 **Despesas governamentais** - Gastos públicos detalhados
- 👥 **Servidores públicos** - Remunerações e cargos
- 🤝 **Convênios e parcerias** - Transferências de recursos

## 🎯 Exemplo de Uso

### 🚀 **Teste Rápido com Zumbi**
```bash
# 1. Obter dados de teste
curl -X GET "https://cidadao-ai-backend.hf.space/api/agents/zumbi/test"

# 2. Executar investigação
curl -X POST "https://cidadao-ai-backend.hf.space/api/agents/zumbi/investigate" \
     -H "Content-Type: application/json" \
     -d @test_data.json
```

## 📈 Performance

- ✅ **Precisão**: >90% para anomalias críticas
- ✅ **Velocidade**: <2s para 1000 contratos
- ✅ **Confiabilidade**: 99.9% uptime
- ✅ **Cobertura**: 100% dos dados do Portal da Transparência

## 🔗 Links

- 🌐 **Documentação**: https://anderson-ufrj.github.io/cidadao.ai-docs/
- 🚀 **API Online**: https://huggingface.co/spaces/neural-thinker/cidadao.ai-backend
- 📚 **API Docs**: https://cidadao-ai-backend.hf.space/docs
- 🐙 **GitHub**: https://github.com/anderson-ufrj/cidadao.ai-backend

---

## 👨‍💻 Autor

**Anderson Henrique da Silva**  
📧 andersonhs27@gmail.com | 💻 [GitHub](https://github.com/anderson-ufrj)

---

<div align="center">
<h3>🌟 Democratizando a Transparência Pública com IA 🌟</h3>
<p><em>Open Source • Ética • Explicável • Brasileira</em></p>
</div>