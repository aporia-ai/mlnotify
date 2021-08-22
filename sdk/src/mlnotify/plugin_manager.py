from typing import List

from mlnotify.logger import logger
from mlnotify.plugins.base import BasePlugin


class PluginManager:
    """Manages the plugins.

    The PluginManager allows registering and clearing plugins,
    as well as invoking their hooks (before, after) serially.
    """

    def __init__(self) -> None:
        self.plugins: List[BasePlugin] = []

    def register_plugin(self, plugin: BasePlugin):
        """Adds a plugin.

        Args:
            plugin: The plugin to add
        """
        self.plugins.append(plugin)

    def clear_plugins(self):
        """Removes all plugins."""
        self.plugins = []

    def run_before(self):
        """Runs all registered plugins' before function."""
        logger.debug("Running before functions")

        for plugin in self.plugins:
            if hasattr(plugin, "before"):
                try:
                    plugin.before()
                except Exception:
                    logger.error(f"Failed to run a plugin's `before` function [{plugin}]", exc_info=True)

    def run_after(self):
        """Runs all registered plugins' after function."""
        logger.debug("Running after functions")

        for plugin in self.plugins:
            if hasattr(plugin, "after"):
                try:
                    plugin.after()
                except Exception:
                    logger.error(f"Failed to run a plugin's `after` function [{plugin}]", exc_info=True)
