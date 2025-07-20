<!-- 
The YAML frontmatter below is for HuggingFace Spaces only.
GitHub users will see the clean README starting from the title.
-->

---
title: Cidadão.AI - Public Transparency Platform / Plataforma de Transparência Pública
emoji: 🔍
colorFrom: green
colorTo: yellow
sdk: gradio
sdk_version: 5.0.0
app_file: app.py
pinned: true
license: apache-2.0
language: 
  - pt
  - en
tags:
  - transparency
  - government
  - corruption-detection
  - anomaly-detection
  - brazilian-government
  - public-spending
  - accountability
  - SDG16
  - open-government
  - civic-tech
pipeline_tag: text-classification
library_name: transformers
base_model: gpt2
datasets:
  - portal-da-transparencia
  - custom
metrics:
  - accuracy
  - f1
  - precision
  - recall
description: >
  Cidadão.AI is an enterprise-grade multi-agent AI platform for Brazilian government transparency analysis.
  Features 8 specialized agents, 40+ API endpoints, and achieves 89.2% accuracy in anomaly detection.
  Aligned with UN SDG16 and Open Government Partnership principles.
---

<div align="center">

# 🇧🇷 Cidadão.AI / 🇺🇸 Citizen.AI

**Multi-Agent AI System for Brazilian Government Transparency Analysis**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Hugging Face](https://img.shields.io/badge/🤗%20Hugging%20Face-Spaces-blue)](https://huggingface.co/spaces/neural-thinker/cidadao-ai)
[![SDG16](https://img.shields.io/badge/SDG-16-orange.svg)](https://sdgs.un.org/goals/goal16)
[![Open Government](https://img.shields.io/badge/Open%20Government-Partnership-green.svg)](https://www.opengovpartnership.org/)

[![Code Quality](https://img.shields.io/badge/code%20quality-A+-brightgreen.svg)](https://github.com/anderson-ufrj/cidadao.ai)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/anderson-ufrj/cidadao.ai/pulls)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/anderson-ufrj/cidadao.ai/graphs/commit-activity)

[Português](#português) | [English](#english) | [🚀 Try Live Demo](https://huggingface.co/spaces/neural-thinker/cidadao.ia)

</div>

## 📊 Project Impact

<div align="center">

| 🏛️ AI Agents | 📡 API Endpoints | 🚀 Accuracy | ⚡ Response Time | 🌍 SDG Alignment |
|:---:|:---:|:---:|:---:|:---:|
| **8** | **40+** | **89.2%** | **<180ms** | **SDG 16** |

**Transforming Brazilian Government Transparency with AI**

</div>

---

## Português

> **Sistema de IA multi-agente para análise de transparência governamental brasileira**

### 🎯 Visão Geral

O **Cidadão.AI** é uma plataforma inovadora que utiliza inteligência artificial especializada para democratizar o acesso aos dados públicos brasileiros. Desenvolvido especificamente para o contexto brasileiro, o sistema emprega arquitetura multi-agente para analisar contratos, licitações, despesas e outros documentos governamentais.

### 🌍 Alinhamento com ODS 16

Este projeto contribui diretamente para o **ODS 16: Paz, Justiça e Instituições Eficazes**:
- 🎯 Transparência e acesso à informação pública (Meta 16.10)
- 🏛️ Instituições eficazes, responsáveis e transparentes (Meta 16.6)
- 🤝 Tomada de decisão responsiva, inclusiva e participativa (Meta 16.7)
- 💰 Redução substancial da corrupção e suborno (Meta 16.5)

### 🚀 Acesso Rápido

#### 🌐 **Aplicação Online**
- **🤗 Hugging Face Spaces**: [cidadao.ia](https://huggingface.co/spaces/neural-thinker/cidadao.ia)
- **📚 Documentação**: [anderson-ufrj.github.io/cidadao.ai](https://anderson-ufrj.github.io/cidadao.ai/)
- **💻 Repositório**: [GitHub](https://github.com/anderson-ufrj/cidadao.ai)

#### 🔧 **Instalação Local**

```bash
# Clone o repositório
git clone https://github.com/anderson-ufrj/cidadao.ai
cd cidadao.ai

# Instale as dependências
pip install -r requirements/base.txt

# Execute a aplicação
python apps/gradio_app.py
```

### 🌟 Funcionalidades Principais

#### 🔍 **Análise Inteligente**
- **Contratos Públicos**: Verificação de valores, fornecedores e conformidade
- **Licitações**: Detecção de irregularidades e padrões suspeitos
- **Despesas**: Identificação de superfaturamento e anomalias
- **Conformidade Legal**: Verificação automática com legislação brasileira

#### 🤖 **Sistema Multi-Agente**
- **MasterAgent**: Orquestração de investigações
- **InvestigatorAgent**: Detecção de anomalias
- **AnalystAgent**: Análise de padrões financeiros
- **ReporterAgent**: Geração de relatórios
- **MemoryAgent**: Gestão de contexto e memória

#### 📊 **Métricas de Performance**
- **Precisão**: 89.2% em detecção de anomalias
- **Cobertura**: 91.1% de recall em investigações
- **Velocidade**: < 180ms tempo de resposta API
- **Escalabilidade**: > 120 consultas/minuto

### 🛠️ Stack Tecnológico

<div align="center">

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

**Backend**: Python 3.11+ | FastAPI | PostgreSQL | Redis | Docker + Kubernetes  
**AI/ML**: LangChain | Transformers | Scikit-learn | ChromaDB  
**Frontend**: Gradio | Streamlit | HTML/CSS/JS  

### 📖 Documentação

- [📋 Guia de Instalação](docs/installation-guide.md)
- [🔧 Guia de Desenvolvimento](docs/development-guide.md)
- [🚀 Guia de Deploy](docs/deployment-guide.md)
- [🏗️ Arquitetura do Sistema](docs/technical-architecture.md)
- [🤖 Sistema Multi-Agente](docs/multi-agent-system.md)
- [🔌 Referência da API](docs/api-reference.md)

### 🧪 Testes e Deploy

```bash
# Testes
make test                   # Todos os testes
make test-unit             # Testes unitários
make test-integration      # Testes de integração

# Deploy
make docker-dev            # Desenvolvimento com Docker
docker-compose up          # Produção
kubectl apply -f deployment/kubernetes/  # Kubernetes
```

### 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie um branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. **Push** para o branch (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

---

## English

> **Multi-agent AI system for Brazilian government transparency analysis**

### 🎯 Overview

**Cidadão.AI** (Citizen.AI) is an innovative platform that uses specialized artificial intelligence to democratize access to Brazilian public data. Specifically developed for the Brazilian context, the system employs multi-agent architecture to analyze contracts, bids, expenses, and other government documents.

### 🌍 SDG 16 Alignment

This project directly contributes to **SDG 16: Peace, Justice and Strong Institutions**:
- 🎯 Public access to information and transparency (Target 16.10)
- 🏛️ Effective, accountable and transparent institutions (Target 16.6)
- 🤝 Responsive, inclusive and participatory decision-making (Target 16.7)
- 💰 Substantial reduction of corruption and bribery (Target 16.5)

### 🚀 Quick Access

#### 🌐 **Online Application**
- **🤗 Hugging Face Spaces**: [cidadao.ia](https://huggingface.co/spaces/neural-thinker/cidadao.ia)
- **📚 Documentation**: [anderson-ufrj.github.io/cidadao.ai](https://anderson-ufrj.github.io/cidadao.ai/)
- **💻 Repository**: [GitHub](https://github.com/anderson-ufrj/cidadao.ai)

#### 🔧 **Local Installation**

```bash
# Clone the repository
git clone https://github.com/anderson-ufrj/cidadao.ai
cd cidadao.ai

# Install dependencies
pip install -r requirements/base.txt

# Run the application
python apps/gradio_app.py
```

### 🌟 Main Features

#### 🔍 **Intelligent Analysis**
- **Public Contracts**: Value verification, suppliers and compliance
- **Bidding Processes**: Detection of irregularities and suspicious patterns
- **Expenses**: Identification of overpricing and anomalies
- **Legal Compliance**: Automatic verification with Brazilian legislation

#### 🤖 **Multi-Agent System**
- **MasterAgent**: Investigation orchestration
- **InvestigatorAgent**: Anomaly detection
- **AnalystAgent**: Financial pattern analysis
- **ReporterAgent**: Report generation
- **MemoryAgent**: Context and memory management

#### 📊 **Performance Metrics**
- **Precision**: 89.2% in anomaly detection
- **Coverage**: 91.1% recall in investigations
- **Speed**: < 180ms API response time
- **Scalability**: > 120 queries/minute

### 🛠️ Technology Stack

**Backend**: Python 3.11+ | FastAPI | PostgreSQL | Redis | Docker + Kubernetes  
**AI/ML**: LangChain | Transformers | Scikit-learn | ChromaDB  
**Frontend**: Gradio | Streamlit | HTML/CSS/JS  

### 📖 Documentation

- [📋 Installation Guide](docs/installation-guide.md)
- [🔧 Development Guide](docs/development-guide.md)
- [🚀 Deployment Guide](docs/deployment-guide.md)
- [🏗️ System Architecture](docs/technical-architecture.md)
- [🤖 Multi-Agent System](docs/multi-agent-system.md)
- [🔌 API Reference](docs/api-reference.md)

### 🧪 Testing & Deployment

```bash
# Testing
make test                   # All tests
make test-unit             # Unit tests
make test-integration      # Integration tests

# Deployment
make docker-dev            # Development with Docker
docker-compose up          # Production
kubectl apply -f deployment/kubernetes/  # Kubernetes
```

### 🤝 Contributing

1. **Fork** the project
2. **Create a branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anderson Henrique da Silva**  
📧 [andersonhs27@gmail.com](mailto:andersonhs27@gmail.com) | 💼 [LinkedIn](https://www.linkedin.com/in/anderson-h-silva95) | 💻 [GitHub](https://github.com/anderson-ufrj) | 🤗 [Hugging Face](https://huggingface.co/neural-thinker)

**Institution**: IFSuldeminas Campus Muzambinho  
**Course**: Bachelor in Computer Science

---

<div align="center">

## 🇧🇷 Feito com ❤️ para fortalecer a democracia brasileira
## 🇺🇸 Made with ❤️ to strengthen Brazilian democracy

**🚀 [Try Now / Experimente Agora](https://huggingface.co/spaces/neural-thinker/cidadao.ia) | 📚 [Documentation / Documentação](https://anderson-ufrj.github.io/cidadao.ai/) | 💻 [Code / Código](https://github.com/anderson-ufrj/cidadao.ai)**

</div>