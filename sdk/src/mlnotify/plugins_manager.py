from typing import List

from mlnotify.logger import logger
from mlnotify.plugins.base import BasePlugin


class PluginsManager:
    """Manages the plugins.

    The PluginsManager allows registering and clearing plugins,
    as well as invoking their hooks (before, after) serially.
    """

    plugins: List[BasePlugin] = []

    def register_plugin(self, plugin: BasePlugin):
        """Adds a plugin.

        Args:
            plugin (BasePlugin): The plugin to add
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
                except Exception as e:
                    print(f"Failed to run a plugin's `before` function [{plugin}]: {e}")

    def run_after(self):
        """Runs all registered plugins' after function."""
        logger.debug("Running after functions")

        for plugin in self.plugins:
            if hasattr(plugin, "after"):
                try:
                    plugin.after()
                except Exception as e:
                    print(f"Failed to run a plugin's `after` function [{plugin}]: {e}")
