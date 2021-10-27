from IPython.core.magic import Magics, magics_class, line_cell_magic
from mlnotify.mlnotify import plugin_manager

# Jupyter line and cell magic
@magics_class
class MLNotifyMagic(Magics):
    @line_cell_magic
    def notify(self, line, cell=None):
        plugin_manager.run_before()
        self.shell.run_cell(line)
        if cell is not None:
            self.shell.run_cell(cell)
        plugin_manager.run_after()


def register_jupyter_magic():
    ipython = get_ipython()
    ipython.register_magics(MLNotifyMagic)

