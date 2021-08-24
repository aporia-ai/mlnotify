from unittest.mock import Mock

from mlnotify import plugin_manager
import mlnotify  # noqa: F401
from mlnotify.plugins.base import BasePlugin


class DummyPlugin(BasePlugin):
    after = Mock()
    before = Mock()


def test_manual():
    dummy_plugin = DummyPlugin()
    plugin_manager.register_plugin(dummy_plugin)

    mlnotify.start()
    dummy_plugin.before.assert_called_once()

    mlnotify.end()
    dummy_plugin.after.assert_called_once()
