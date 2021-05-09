import os
from pathlib import Path
import sys

os.system(f"cd {Path(__file__).resolve().parent.parent} && {sys.argv[1]}")  # noqa: S605
