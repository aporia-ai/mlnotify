from mlnotify.mlnotify import plugin_manager
from mlnotify.plugins.base import BasePlugin

try:
    from mlnotify.jupyter_magic import load_ipython_extension
    ipy = get_ipython()
    load_ipython_extension(ipy)
except:
    # not in jupyter notebook
    pass

start = plugin_manager.run_before
end = plugin_manager.run_after

__all__ = [start, end, plugin_manager, BasePlugin]
