# 🔐 HashiCorp Vault Integration

## Overview

Cidadão.AI integrates with HashiCorp Vault for enterprise-grade secret management with intelligent caching, circuit breaker patterns, and graceful fallback to environment variables.

## Architecture

```
Application → SecretManager → VaultClient → HashiCorp Vault
     ↓              ↓             ↓              ↓
  Settings    Schema Validation  Cache/Circuit   Secure Storage
                                 Breaker
```

## Features

### 🏗️ **Production-Grade Architecture**
- **Intelligent Caching**: TTL-based cache with LRU eviction
- **Circuit Breaker**: Prevents cascading failures
- **Graceful Fallback**: Falls back to environment variables
- **Health Monitoring**: Real-time status and metrics
- **Audit Logging**: Comprehensive access logging

### 🔧 **Authentication Methods**
- **Token Authentication**: Simple token-based auth
- **AppRole**: Role-based authentication for services
- **Kubernetes**: Native Kubernetes service account auth

### 📦 **Secret Schemas**
- **Database**: Connection strings and credentials
- **JWT**: Signing keys and configuration
- **API Keys**: External service credentials
- **Redis**: Cache and queue credentials
- **Infrastructure**: MinIO, ChromaDB, PgAdmin passwords
- **Users**: Development user accounts

## Quick Start

### 1. **Development Setup**

```bash
# Start Vault in development mode
docker-compose up vault

# Initialize Vault with secrets
./scripts/setup_vault.sh

# Set environment variables
export VAULT_TOKEN="your-vault-token"
export VAULT_URL="http://localhost:8200"
```

### 2. **Application Integration**

```python
from src.core.config import get_settings_with_vault
from src.api.auth import AuthManager

# Load configuration with Vault
settings = await get_settings_with_vault()

# Initialize auth with Vault
auth_manager = await AuthManager.from_vault()
```

### 3. **Environment Variables**

```bash
# Vault Configuration
VAULT_URL=http://localhost:8200
VAULT_TOKEN=your_vault_token
VAULT_SECRET_PATH=secret/cidadao-ai
VAULT_FALLBACK_TO_ENV=true
VAULT_REQUIRE=false
```

## Configuration

### VaultConfig Options

```python
@dataclass
class VaultConfig:
    # Connection
    url: str = "http://localhost:8200"
    token: Optional[str] = None
    timeout: int = 10
    
    # Authentication  
    auth_method: str = "token"  # token, approle, k8s
    role_id: Optional[str] = None
    secret_id: Optional[str] = None
    
    # Paths
    secret_path: str = "secret/cidadao-ai"
    
    # Caching
    cache_ttl: int = 300  # 5 minutes
    max_cache_size: int = 1000
    
    # Reliability
    max_retries: int = 3
    circuit_breaker_threshold: int = 5
    circuit_breaker_timeout: int = 60
    
    # Fallback
    fallback_to_env: bool = True
    require_vault: bool = False
```

## Secret Organization

Secrets are organized in a hierarchical structure:

```
secret/cidadao-ai/
├── application/
│   └── secret_key
├── jwt/
│   ├── secret_key
│   ├── algorithm
│   ├── access_token_expire_minutes
│   └── refresh_token_expire_days
├── database/
│   ├── url
│   ├── username
│   ├── password
│   ├── host
│   ├── port
│   └── database
├── redis/
│   ├── url
│   └── password
├── api_keys/
│   ├── transparency_api_key
│   ├── groq_api_key
│   ├── together_api_key
│   └── huggingface_api_key
├── infrastructure/
│   ├── minio_access_key
│   ├── minio_secret_key
│   ├── chroma_auth_token
│   └── pgadmin_password
└── users/
    ├── admin_email
    ├── admin_password
    ├── admin_name
    ├── analyst_email
    ├── analyst_password
    └── analyst_name
```

## Usage Examples

### Basic Secret Retrieval

```python
from src.core.secret_manager import get_secret_manager

# Get secret manager instance
secret_manager = await get_secret_manager()

# Get individual secret
jwt_secret = await secret_manager.get_secret("jwt/secret_key")
if jwt_secret.found:
    print(f"JWT secret loaded from {jwt_secret.source}")

# Get typed secret with default
db_port = await secret_manager.get_secret(
    "database/port", 
    default=5432, 
    cast_to=int
)
```

### Schema-Based Secrets

```python
from src.core.secret_manager import get_database_secrets, get_jwt_secrets

# Get validated database secrets
db_secrets = await get_database_secrets()
if db_secrets:
    print(f"Database URL: {db_secrets.url}")
    
# Get JWT secrets
jwt_secrets = await get_jwt_secrets()
if jwt_secrets:
    secret_key = jwt_secrets.secret_key.get_secret_value()
```

### Custom Secret Schema

```python
from src.core.secret_manager import SecretSchema, get_secret_manager
from pydantic import Field, SecretStr

class MyServiceSecrets(SecretSchema):
    """Custom service secrets"""
    api_key: SecretStr = Field(..., description="Service API key")
    endpoint: str = Field(..., description="Service endpoint")
    timeout: int = Field(default=30, description="Request timeout")

# Register and use
secret_manager = await get_secret_manager()
secret_manager.register_schema("my_service", MyServiceSecrets)

# Load secrets
my_secrets = await secret_manager.get_secrets_schema("my_service")
```

## Production Deployment

### 1. **Vault Server Configuration**

```hcl
# vault.hcl
listener "tcp" {
  address = "0.0.0.0:8200"
  tls_cert_file = "/vault/tls/cert.pem"
  tls_key_file = "/vault/tls/key.pem"
}

storage "consul" {
  address = "consul:8500"
  path = "vault/"
}

api_addr = "https://vault.company.com:8200"
cluster_addr = "https://vault.company.com:8201"
ui = true
```

### 2. **Kubernetes Deployment**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cidadao-api
spec:
  template:
    spec:
      serviceAccountName: cidadao-api
      containers:
      - name: api
        image: cidadao-ai:latest
        env:
        - name: VAULT_URL
          value: "https://vault.company.com:8200"
        - name: VAULT_AUTH_METHOD
          value: "kubernetes"
        - name: VAULT_ROLE
          value: "cidadao-api"
        - name: VAULT_REQUIRE
          value: "true"
```

### 3. **AppRole Authentication**

```bash
# Enable AppRole
vault auth enable approle

# Create role
vault write auth/approle/role/cidadao-api \
    token_policies="cidadao-policy" \
    token_ttl=1h \
    token_max_ttl=4h

# Get role credentials
ROLE_ID=$(vault read -field=role_id auth/approle/role/cidadao-api/role-id)
SECRET_ID=$(vault write -field=secret_id -f auth/approle/role/cidadao-api/secret-id)

# Configure application
export VAULT_AUTH_METHOD=approle
export VAULT_ROLE_ID=$ROLE_ID  
export VAULT_SECRET_ID=$SECRET_ID
```

## Monitoring & Observability

### Health Checks

```python
from src.core.secret_manager import get_secret_manager

secret_manager = await get_secret_manager()
health = await secret_manager.health_check()

print(f"Vault Status: {health['vault_status']}")
print(f"Cache Hits: {health['access_stats']['vault_hits']}")
```

### Metrics

The Vault client exports the following metrics:
- `vault_requests_total` - Total requests made
- `vault_cache_hits_total` - Cache hit count
- `vault_cache_misses_total` - Cache miss count
- `vault_circuit_breaker_opens_total` - Circuit breaker opens
- `vault_errors_total` - Error count by type

### Logging

All Vault operations are logged with structured logging:

```json
{
  "timestamp": "2025-01-08T10:30:00Z",
  "level": "info",
  "event": "vault_secret_retrieved",
  "key": "database/password",
  "source": "vault",
  "cached": true,
  "access_count": 15
}
```

## Security Best Practices

### 1. **Secret Rotation**

```bash
# Rotate database password
NEW_PASSWORD=$(openssl rand -base64 32)
vault kv patch secret/cidadao-ai/database password="$NEW_PASSWORD"

# Update database
psql -h postgres -U admin -c "ALTER USER cidadao PASSWORD '$NEW_PASSWORD';"
```

### 2. **Access Control**

```hcl
# Vault policy for cidadao-api
path "secret/data/cidadao-ai/*" {
  capabilities = ["read"]
}

path "secret/data/cidadao-ai/api_keys/*" {
  capabilities = ["read", "update"]
}
```

### 3. **Audit Logging**

```hcl
# Enable audit logging
vault audit enable file file_path=/vault/logs/audit.log
```

## Troubleshooting

### Common Issues

#### 1. **Vault Connection Failed**

```bash
# Check Vault status
curl -s http://localhost:8200/v1/sys/health | jq

# Check authentication
vault auth -address=http://localhost:8200 $VAULT_TOKEN
```

#### 2. **Secret Not Found**

```bash
# List available secrets
vault kv list secret/cidadao-ai

# Check specific path
vault kv get secret/cidadao-ai/database
```

#### 3. **Permission Denied**

```bash
# Check token capabilities
vault token capabilities secret/cidadao-ai/database

# Check applied policies
vault token lookup
```

### Debug Mode

```bash
# Enable debug logging
export VAULT_LOG_LEVEL=debug
export LOG_LEVEL=debug

# Run application
python -m src.api.app
```

## Migration Guide

### From Environment Variables

1. **Export existing secrets to Vault**

```bash
# Export database credentials
vault kv put secret/cidadao-ai/database \
    url="$DATABASE_URL" \
    password="$DATABASE_PASSWORD"

# Export JWT secrets  
vault kv put secret/cidadao-ai/jwt \
    secret_key="$JWT_SECRET_KEY" \
    algorithm="HS256"
```

2. **Update application configuration**

```python
# Before (environment only)
settings = get_settings()

# After (Vault with fallback)
settings = await get_settings_with_vault()
```

3. **Test and validate**

```bash
# Test secret retrieval
python -c "
import asyncio
from src.core.secret_manager import get_secret_manager

async def test():
    manager = await get_secret_manager()
    secret = await manager.get_secret('database/url')
    print(f'Database URL found: {secret.found}')
    print(f'Source: {secret.source}')

asyncio.run(test())
"
```

## Performance Tuning

### Cache Configuration

```python
# Optimize for high-throughput
vault_config = VaultConfig(
    cache_ttl=600,        # 10 minutes
    max_cache_size=5000,  # Larger cache
    max_retries=5,        # More retries
    timeout=5             # Faster timeout
)
```

### Connection Pooling

```python
# Use connection pooling for high load
import httpx

async with httpx.AsyncClient(
    limits=httpx.Limits(max_connections=20, max_keepalive_connections=10)
) as client:
    vault_client._client = client
```

## API Reference

### VaultClient

Main client for interacting with Vault.

#### Methods

- `async get_secret(key: str, version: Optional[int] = None) -> Optional[str]`
- `async set_secret(key: str, value: str, metadata: Optional[Dict] = None) -> bool`
- `async initialize() -> None`
- `async close() -> None`
- `get_stats() -> Dict[str, Any]`

### SecretManager

High-level interface for secret management.

#### Methods

- `async get_secret(key: str, default: Optional[T] = None, cast_to: Optional[Type[T]] = None) -> SecretResult[T]`
- `async get_secrets_schema(schema_name: str) -> Optional[SecretSchema]`
- `async set_secret(key: str, value: str, metadata: Optional[Dict] = None) -> bool`
- `async health_check() -> Dict[str, Any]`

### Convenience Functions

- `async get_database_secrets() -> Optional[DatabaseSecrets]`
- `async get_jwt_secrets() -> Optional[JWTSecrets]`
- `async get_api_key_secrets() -> Optional[APIKeySecrets]`

---

For additional support, check the logs or contact the development team.