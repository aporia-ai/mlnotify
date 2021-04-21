from typing import Type
from unittest.mock import Mock

import pytest

from mlnotify.plugins.notify import NotifyPlugin


@pytest.fixture
def mocked_notify_plugin() -> Type[NotifyPlugin]:
    NotifyPlugin.before = Mock()  # type: ignore[assignment]
    NotifyPlugin.after = Mock()  # type: ignore[assignment]

    return NotifyPlugin
