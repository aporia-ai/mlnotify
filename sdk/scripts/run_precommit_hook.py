import os
from pathlib import Path
import sys

sdk_base_path = Path(__file__).resolve().parent.parent
command = sys.argv[1]
os.system(f"cd {sdk_base_path} && {command}")  # noqa: S605
