from pathlib import Path
from typing import Any, Dict, Union

from numpy import random
import pytest
import xgboost

import mlnotify  # noqa: F401
from tests.utils import MockedNotifyPlugin

SampleNpData = Dict[str, Union[list, Any]]


def test_manual(mocked_notify_plugin: MockedNotifyPlugin):
    mlnotify.start()
    mocked_notify_plugin.before.assert_called_once()

    mlnotify.end()
    mocked_notify_plugin.after.assert_called_once()
