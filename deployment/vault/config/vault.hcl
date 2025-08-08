# HashiCorp Vault Configuration for Cidadão.AI
# Development Mode Configuration

# Listener configuration
listener "tcp" {
  address = "0.0.0.0:8200"
  tls_disable = 1
}

# Storage backend
storage "file" {
  path = "/vault/data"
}

# API address
api_addr = "http://0.0.0.0:8200"
cluster_addr = "http://0.0.0.0:8201"

# UI configuration
ui = true

# Disable mlock for Docker
disable_mlock = true

# Plugin directory
plugin_directory = "/vault/plugins"

# Logging
log_level = "INFO"
log_format = "json"

# Telemetry (optional)
telemetry {
  prometheus_retention_time = "30s"
  disable_hostname = true
}