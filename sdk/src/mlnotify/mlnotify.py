from mlnotify.hooks import apply_hooks
from mlnotify.plugin_manager import PluginManager
from mlnotify.plugins.notify import NotifyPlugin

plugin_manager = PluginManager()
plugin_manager.register_plugin(NotifyPlugin())

apply_hooks(before=plugin_manager.run_before, after=plugin_manager.run_after)

start = plugin_manager.run_before
end = plugin_manager.run_after
