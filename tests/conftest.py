"""
Module: tests.conftest
Description: Pytest configuration and fixtures
Author: Anderson H. Silva
Date: 2025-01-24
License: Proprietary - All rights reserved
"""

import asyncio
import os
from typing import AsyncGenerator, Generator
from unittest.mock import Mock, AsyncMock

import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

# Set test environment
os.environ["APP_ENV"] = "testing"
os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///:memory:"
os.environ["REDIS_URL"] = "redis://localhost:6379/15"

from src.core.config import settings
from src.core.logging import setup_logging


# Setup logging for tests
setup_logging()


@pytest.fixture(scope="session")
def event_loop() -> Generator:
    """Create event loop for async tests."""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    loop.close()


@pytest.fixture
def mock_settings() -> settings:
    """Mock settings for tests."""
    settings.app_env = "testing"
    settings.debug = True
    settings.database_url = "sqlite+aiosqlite:///:memory:"
    return settings


@pytest_asyncio.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Create test database session."""
    engine = create_async_engine(
        settings.get_database_url(async_mode=True),
        echo=False,
    )
    
    async_session = sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
    
    async with async_session() as session:
        yield session
        await session.rollback()
    
    await engine.dispose()


@pytest.fixture
def mock_llm_service() -> Mock:
    """Mock LLM service."""
    mock = Mock()
    mock.generate.return_value = AsyncMock(
        return_value="Mock LLM response"
    )
    mock.stream_generate.return_value = AsyncMock(
        return_value=["Mock", " streaming", " response"]
    )
    return mock


@pytest.fixture
def mock_transparency_api() -> Mock:
    """Mock Portal Transparência API."""
    mock = Mock()
    mock.search_contracts.return_value = AsyncMock(
        return_value={
            "total": 100,
            "items": [
                {
                    "id": "2024-001",
                    "valor": 100000.00,
                    "fornecedor": "Empresa XYZ",
                    "orgao": "Ministério ABC",
                    "data": "2024-01-15",
                }
            ]
        }
    )
    return mock


@pytest.fixture
def mock_redis_client() -> Mock:
    """Mock Redis client."""
    mock = Mock()
    mock.get.return_value = AsyncMock(return_value=None)
    mock.set.return_value = AsyncMock(return_value=True)
    mock.delete.return_value = AsyncMock(return_value=True)
    mock.exists.return_value = AsyncMock(return_value=False)
    return mock


@pytest.fixture
def sample_investigation_query() -> str:
    """Sample investigation query."""
    return "contratos emergenciais sem licitação em 2024"


@pytest.fixture
def sample_investigation_result() -> dict:
    """Sample investigation result."""
    return {
        "query": "contratos emergenciais sem licitação em 2024",
        "findings": [
            {
                "contract_id": "2024-001",
                "value": 500000.00,
                "supplier": "Fornecedor ABC",
                "anomaly_score": 0.85,
                "explanation": "Valor 340% acima da média para contratos similares",
            }
        ],
        "confidence_score": 0.87,
        "sources": ["Portal Transparência", "TCU"],
        "timestamp": "2024-01-24T10:30:00Z",
    }


@pytest.fixture
def sample_agent_context() -> dict:
    """Sample agent context."""
    return {
        "user_id": "test-user-123",
        "session_id": "session-456",
        "investigation_id": "inv-789",
        "previous_queries": [],
        "memory_context": {},
    }


@pytest.fixture
def mock_vector_store() -> Mock:
    """Mock vector store."""
    mock = Mock()
    mock.add_documents.return_value = AsyncMock(return_value=True)
    mock.similarity_search.return_value = AsyncMock(
        return_value=[
            {"content": "Similar document 1", "score": 0.95},
            {"content": "Similar document 2", "score": 0.87},
        ]
    )
    return mock


@pytest.fixture
def mock_memory_service() -> Mock:
    """Mock memory service."""
    mock = Mock()
    mock.store_episodic.return_value = AsyncMock(return_value=True)
    mock.retrieve_episodic.return_value = AsyncMock(return_value=[])
    mock.store_semantic.return_value = AsyncMock(return_value=True)
    mock.retrieve_semantic.return_value = AsyncMock(return_value=[])
    return mock


@pytest.fixture
def auth_headers() -> dict:
    """Authentication headers for API tests."""
    return {
        "Authorization": "Bearer test-token-123",
        "Content-Type": "application/json",
    }


@pytest.fixture
def mock_celery_task() -> Mock:
    """Mock Celery task."""
    mock = Mock()
    mock.delay.return_value = Mock(id="task-123", state="PENDING")
    mock.apply_async.return_value = Mock(id="task-123", state="PENDING")
    return mock


# Markers for test categories
def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line(
        "markers", "unit: mark test as a unit test"
    )
    config.addinivalue_line(
        "markers", "integration: mark test as an integration test"
    )
    config.addinivalue_line(
        "markers", "e2e: mark test as an end-to-end test"
    )
    config.addinivalue_line(
        "markers", "slow: mark test as slow running"
    )
    config.addinivalue_line(
        "markers", "multiagent: mark test as multi-agent test"
    )