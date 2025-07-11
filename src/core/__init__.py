"""
Module: core
Description: Core functionality initialization
Author: Anderson H. Silva
Date: 2025-01-24
License: Proprietary - All rights reserved
"""

from .config import get_settings, settings
from .constants import (
    APP_NAME,
    APP_VERSION,
    AgentStatus,
    AnomalyType,
    DataSource,
    InvestigationPriority,
    ResponseStatus,
    UserRole,
)
from .exceptions import (
    AgentError,
    CidadaoAIError,
    ConfigurationError,
    InvestigationError,
    LLMError,
    ValidationError,
)
from .logging import get_logger, setup_logging

__all__ = [
    # Config
    "get_settings",
    "settings",
    # Constants
    "APP_NAME",
    "APP_VERSION",
    "AgentStatus",
    "AnomalyType",
    "DataSource",
    "InvestigationPriority",
    "ResponseStatus",
    "UserRole",
    # Exceptions
    "CidadaoAIError",
    "AgentError",
    "InvestigationError",
    "LLMError",
    "ValidationError",
    "ConfigurationError",
    # Logging
    "get_logger",
    "setup_logging",
]

# Initialize logging on import
setup_logging()