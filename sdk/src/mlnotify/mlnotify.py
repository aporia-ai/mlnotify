from mlnotify.hooks import apply_hooks
from mlnotify.plugin_manager import PluginManager
from mlnotify.plugins.notify import NotifyPlugin


def init_plugin_manager():
    """
    Initialize the plugin manager.
    """
    plugin_manager = PluginManager()
    plugin_manager.register_plugin(NotifyPlugin())

    apply_hooks(before=plugin_manager.run_before, after=plugin_manager.run_after)

    return plugin_manager


plugin_manager = init_plugin_manager()
