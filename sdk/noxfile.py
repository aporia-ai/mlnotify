"""Nox sessions."""
from contextlib import contextmanager
from pathlib import Path
import shutil
import tempfile
from typing import Any

import nox
from nox.sessions import Session

PACKAGE = "mlnotify"


@contextmanager
def install_with_constraints(session: Session, *args: str, **kwargs: Any):
    """Install packages constrained by Poetry's lock file.

    This function is a wrapper for nox.sessions.Session.install. It
    invokes pip to install packages inside of the session's virtualenv.
    Additionally, pip is passed a constraints file generated from
    Poetry's lock file, to ensure that the packages are pinned to the
    versions specified in poetry.lock. This allows you to manage the
    packages as Poetry development dependencies.

    Arguments:
        session: The Session object.
        args: Command-line arguments for pip.
        kwargs: Additional keyword arguments for Session.install.
    """
    try:
        dirname = Path(tempfile.mkdtemp())
        requirements_file = dirname / "requirements.txt"
        session.run(
            "poetry",
            "export",
            "--dev",
            "--without-hashes",
            "--format=requirements.txt",
            "--output={}".format(requirements_file),
            external=True,
        )
        session.install("--constraint={}".format(requirements_file), *args, **kwargs)
    finally:
        shutil.rmtree(dirname)


@nox.session(python=["3.9", "3.8", "3.7", "3.6"])
def tests(session: Session) -> None:
    """Run the test suite."""
    install_with_constraints(session)
    session.install(".", "--upgrade")
    session.run("pytest", *session.posargs)
