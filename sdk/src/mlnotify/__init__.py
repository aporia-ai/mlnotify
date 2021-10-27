from mlnotify.mlnotify import plugin_manager
from mlnotify.plugins.base import BasePlugin

start = plugin_manager.run_before
end = plugin_manager.run_after


try:
    from mlnotify.jupyter_magic import register_jupyter_magic
    register_jupyter_magic()
except:
    # Not in jupyter notebook
    pass


__all__ = [start, end, plugin_manager, BasePlugin]
