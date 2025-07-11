# 🔒 Segurança - Cidadão.AI

## ⚠️ AVISO IMPORTANTE DE SEGURANÇA

**A chave da API do Portal da Transparência foi exposta acidentalmente no commit `3bb3298`.**

### 🚨 Ações Necessárias

1. **REGENERAR CHAVE IMEDIATAMENTE**
   - Acesse: https://portaldatransparencia.gov.br/api-de-dados/cadastrar-email
   - Cadastre novamente seu email para obter uma nova chave
   - A chave antiga deve ser considerada comprometida

2. **CONFIGURAR AMBIENTE LOCAL**
   ```bash
   # Copie o arquivo de exemplo
   cp .env.example .env
   
   # Edite o arquivo .env e adicione sua NOVA chave
   nano .env
   
   # Substitua:
   TRANSPARENCY_API_KEY=sua_nova_chave_aqui
   ```

3. **VERIFICAR .gitignore**
   - O arquivo `.env` DEVE estar no `.gitignore`
   - NUNCA commite arquivos `.env` com chaves reais

### 🛡️ Práticas de Segurança

#### Variáveis de Ambiente
- ✅ Use `.env` para desenvolvimento local
- ✅ Use variáveis de ambiente do sistema em produção
- ❌ NUNCA commite chaves/senhas no código
- ❌ NUNCA coloque secrets em arquivos `.example`

#### Chaves e Tokens
- 🔄 Regenere chaves comprometidas imediatamente
- 🔒 Use chaves diferentes para dev/prod
- 📝 Documente quais chaves são necessárias
- ⏰ Implemente rotação regular de chaves

#### Arquivos Sensíveis
Certifique-se que estão no `.gitignore`:
```
.env
.env.local
.env.production
*.key
*.pem
*.p12
config.local.*
secrets.*
```

### 🔍 Como Verificar Exposição

```bash
# Verificar se .env está sendo ignorado
git status

# Verificar histórico por chaves expostas
git log --all --grep="api.key\|token\|secret" --oneline

# Verificar arquivos por padrões sensíveis
grep -r "TRANSPARENCY_API_KEY" . --exclude-dir=.git
```

### 📞 Reportar Problemas

Se encontrar exposição de chaves ou vulnerabilidades:
1. NÃO crie issue público
2. Entre em contato diretamente: andersonhs27@gmail.com
3. Inclua detalhes do problema e como reproduzir

### 🔄 Histórico de Incidents

- **2025-01-24**: Chave Portal da Transparência exposta em commit `3bb3298`
  - Status: ✅ Corrigido em commit `d37f4d6`
  - Ação: Chave removida, nova chave necessária

---

**Lembre-se: Segurança é responsabilidade de todos! 🛡️**