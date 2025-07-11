# API Portal da Transparência - Documentação

## Visão Geral

A API do Portal da Transparência é uma ferramenta específica para usuários técnicos que desejam obter dados sem navegar pelo portal web. Através dela, é possível desenvolver programas que se conectam diretamente aos servidores do Portal da Transparência e obtêm os dados desejados.

## Base URL

```
https://api.portaldatransparencia.gov.br/
```

## Documentação Swagger

A documentação completa da API está disponível em:
- **URL**: https://api.portaldatransparencia.gov.br/
- **Formato**: Swagger UI (OpenAPI)

## Autenticação

### 1. Registro Obrigatório

Para usar a API, é necessário obter um token de acesso:

1. **Cadastro de Email**: Registre seu email em:
   ```
   https://portaldatransparencia.gov.br/api-de-dados/cadastrar-email
   ```

2. **Autenticação Gov.br**: Use uma conta Gov.br com nível:
   - **Verificado (Prata)** ou **Comprovado (Ouro)**
   - **CPF/Senha** com autenticação de dois fatores

3. **Recebimento do Token**: A chave será enviada para o email registrado na conta Gov.br

### 2. Uso do Token

O token deve ser incluído no cabeçalho HTTP de todas as requisições:

```http
GET /api/endpoint
Host: api.portaldatransparencia.gov.br
Authorization: Bearer {SEU_TOKEN_AQUI}
```

## Rate Limits

A API possui limites de requisições para garantir estabilidade:

### Horários Normais (06:00 - 23:59)
- **90 requisições por minuto**

### Horários de Menor Tráfego (00:00 - 05:59)
- **300 requisições por minuto**
- **Até 700 requisições por minuto** (limite máximo)

## Endpoints Disponíveis

### 1. Contratos do Poder Executivo Federal
**Endpoint**: `/contratos`

Dados sobre contratos firmados pelo governo federal.

**Parâmetros Principais**:
- `ano`: Ano de referência
- `mes`: Mês de referência
- `orgao`: Código do órgão
- `cnpjContratado`: CNPJ da empresa contratada
- `valor`: Valor do contrato

### 2. Despesas Públicas
**Endpoint**: `/despesas`

Informações sobre gastos do governo federal.

**Parâmetros Principais**:
- `ano`: Ano de execução
- `mes`: Mês de execução
- `orgao`: Código do órgão
- `funcao`: Função orçamentária
- `subfuncao`: Subfunção orçamentária

### 3. Convênios do Poder Executivo Federal
**Endpoint**: `/convenios`

Dados sobre convênios e parcerias.

**Parâmetros Principais**:
- `ano`: Ano de referência
- `mes`: Mês de referência
- `convenente`: Identificação do convenente
- `objeto`: Objeto do convênio

### 4. Licitações do Poder Executivo Federal
**Endpoint**: `/licitacoes`

Informações sobre processos licitatórios.

**Parâmetros Principais**:
- `ano`: Ano de referência
- `mes`: Mês de referência
- `orgao`: Código do órgão
- `modalidade`: Modalidade da licitação

### 5. Servidores do Poder Executivo Federal
**Endpoint**: `/servidores`

Dados sobre servidores públicos federais.

**Parâmetros Principais**:
- `ano`: Ano de referência
- `mes`: Mês de referência
- `orgao`: Código do órgão
- `cpf`: CPF do servidor

## Registros Especiais

### 1. CEAF (Cadastro de Entidades Expulsas da Administração Federal)
**Endpoint**: `/ceaf`

### 2. CEIS (Cadastro Nacional de Empresas Inidôneas e Suspensas)
**Endpoint**: `/ceis`

### 3. CNEP (Cadastro Nacional de Empresas Punidas)
**Endpoint**: `/cnep`

### 4. CEPIM (Entidades Privadas sem Fins Lucrativos Impedidas)
**Endpoint**: `/cepim`

## Programas Sociais

### 1. Bolsa Família
**Endpoint**: `/bolsa-familia`

### 2. Auxílio Emergencial
**Endpoint**: `/auxilio-emergencial`

### 3. BPC (Benefício de Prestação Continuada)
**Endpoint**: `/bpc`

## Estrutura de Resposta Padrão

```json
{
  "data": [
    {
      "id": "identificador_único",
      "ano": 2024,
      "mes": 1,
      "orgao": {
        "codigo": "12345",
        "nome": "Nome do Órgão"
      },
      "valor": 1000000.00,
      "dataAssinatura": "2024-01-15",
      "objeto": "Descrição do objeto",
      "fornecedor": {
        "cnpj": "12.345.678/0001-90",
        "nome": "Nome da Empresa"
      }
    }
  ],
  "links": {
    "first": "url_primeira_pagina",
    "last": "url_ultima_pagina",
    "prev": "url_pagina_anterior",
    "next": "url_proxima_pagina"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 100,
    "path": "url_base",
    "per_page": 20,
    "to": 20,
    "total": 2000
  }
}
```

## Parâmetros de Paginação

- `pagina`: Número da página (padrão: 1)
- `tamanhoPagina`: Itens por página (máximo: 500)

## Filtros Comuns

### Por Data
- `dataInicio`: Data inicial (formato: DD/MM/YYYY)
- `dataFim`: Data final (formato: DD/MM/YYYY)

### Por Valor
- `valorInicial`: Valor mínimo
- `valorFinal`: Valor máximo

### Por Órgão
- `codigoOrgao`: Código do órgão específico

## Exemplos de Uso

### 1. Buscar Contratos de 2024

```http
GET /contratos?ano=2024&pagina=1&tamanhoPagina=100
Host: api.portaldatransparencia.gov.br
Authorization: Bearer {TOKEN}
```

### 2. Buscar Despesas de um Ministério

```http
GET /despesas?ano=2024&orgao=26000&mes=1
Host: api.portaldatransparencia.gov.br
Authorization: Bearer {TOKEN}
```

### 3. Buscar Contratos Emergenciais

```http
GET /contratos?ano=2024&modalidadeContratacao=1&objeto=emergencial
Host: api.portaldatransparencia.gov.br
Authorization: Bearer {TOKEN}
```

## Códigos de Status HTTP

- **200**: Sucesso
- **400**: Parâmetros inválidos
- **401**: Token inválido ou ausente
- **403**: Acesso negado
- **429**: Rate limit excedido
- **500**: Erro interno do servidor

## Tratamento de Erros

```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Parâmetro 'ano' é obrigatório",
    "details": {
      "parameter": "ano",
      "expected": "YYYY",
      "received": null
    }
  }
}
```

## Boas Práticas

### 1. Rate Limiting
- Implemente controle de requisições por minuto
- Use cache para evitar requisições repetidas
- Faça requisições durante horários de menor tráfego quando possível

### 2. Paginação
- Use paginação para grandes volumes de dados
- Não exceda 500 itens por página
- Processe páginas sequencialmente

### 3. Filtros
- Use filtros específicos para reduzir o volume de dados
- Combine múltiplos filtros para consultas precisas
- Evite consultas muito amplas sem filtros

### 4. Cache
- Cache respostas por pelo menos 1 hora
- Implemente cache inteligente baseado em TTL
- Considere cache local para dados históricos

## Limitações

1. **Dados Históricos**: Alguns endpoints podem ter limitações temporais
2. **Frequência de Atualização**: Dados são atualizados diariamente, semanalmente ou mensalmente
3. **Volume de Dados**: Grandes consultas podem ser lentas
4. **Horário de Manutenção**: API pode ficar indisponível durante manutenções

## Suporte Técnico

Para questões técnicas sobre a API:
- **Portal**: https://portaldatransparencia.gov.br/api-de-dados
- **Registro**: https://portaldatransparencia.gov.br/api-de-dados/cadastrar-email

## Recursos Adicionais

### Dados Abertos
Para datasets completos, use as planilhas de dados abertos disponíveis para download no portal.

### Exemplos de Código
A página da API apresenta exemplos de código-fonte para consumo da API implementados em:
- JavaScript
- Java
- PHP
- .NET

### Catálogo de APIs Governamentais
- **URL**: https://www.gov.br/conecta/catalogo/
- **Portal da Transparência**: https://www.gov.br/conecta/catalogo/apis/portal-da-transparencia-do-governo-federal

## Considerações para Detecção de Anomalias

### Campos Importantes para Análise
1. **Valor dos Contratos**: Identificar superfaturamento
2. **Data de Assinatura vs. Data de Publicação**: Detectar urgência suspeita
3. **Fornecedores**: Analisar concentração e recorrência
4. **Modalidade de Licitação**: Identificar uso excessivo de dispensa
5. **Objeto do Contrato**: Detectar descrições vagas

### Indicadores de Anomalia
1. **Valores**: Contratos com valores muito acima ou abaixo da média
2. **Temporal**: Concentração de contratos em períodos específicos
3. **Fornecedores**: Empresas recém-criadas com contratos grandes
4. **Modalidade**: Uso excessivo de contratação direta
5. **Geográfico**: Concentração de recursos em regiões específicas