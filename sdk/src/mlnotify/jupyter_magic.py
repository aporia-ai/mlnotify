from IPython.core.magic import Magics, magics_class, line_cell_magic


# mlnotify line and cell magic
@magics_class
class MLNotifyMagic(Magics):
    @line_cell_magic
    def notifyit(self, line, cell=None):
        mlnotify.start()
        self.shell.run_cell(line)
        if cell is not None:
            self.shell.run_cell(cell)
        mlnotify.end()


# Register with iPython
def load_ipython_extension(ipython):
    """
    Any module file that define a function named `load_ipython_extension`
    can be loaded via `%load_ext module.path` or be configured to be
    autoloaded by IPython at startup time.
    """
    # You can register the class itself without instantiating it.  IPython will
    # call the default constructor on it.
    ipython.register_magics(MLNotifyMagic)

