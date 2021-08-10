from mlnotify.hooks import apply_hooks
from mlnotify.plugins.notify import NotifyPlugin
from mlnotify.plugins_manager import PluginsManager

plugins_manager = PluginsManager()
plugins_manager.register_plugin(NotifyPlugin())

apply_hooks(before=plugins_manager.run_before, after=plugins_manager.run_after)

start = plugins_manager.run_before
end = plugins_manager.run_after
