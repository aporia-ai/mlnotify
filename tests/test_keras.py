from pathlib import Path
from typing import Any, Dict, Union

from keras.models import Sequential
from numpy import loadtxt
import pytest
import tensorflow

import mlnotify  # noqa: F401
from tests.utils import MockedNotifyPlugin

KerasSampleData = Dict[str, Union[list, Any]]


@pytest.fixture
def sample_data() -> KerasSampleData:
    sample_data_path = Path(Path(__file__).parent, "data", "keras.csv")
    dataset = loadtxt(sample_data_path, delimiter=",")
    return {"x": dataset[:, 0:8], "y": dataset[:, 8]}


def test_keras_fit(sample_data: KerasSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    model = Sequential()
    model.compile()
    model.fit(sample_data["x"], sample_data["y"], epochs=1, batch_size=1)

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_keras_train_on_batch(sample_data: KerasSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    model = Sequential()
    model.compile()
    model.train_on_batch(
        sample_data["x"],
        y=None,
        sample_weight=None,
        class_weight=None,
        reset_metrics=True,
        return_dict=False,
    )

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_tensorflow_keras_fit(sample_data: KerasSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    model = tensorflow.keras.models.Sequential()
    model.compile()
    model.fit(sample_data["x"], sample_data["y"], epochs=1, batch_size=1)

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_tensorflow_keras_train_on_batch(sample_data: KerasSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    model = tensorflow.keras.models.Sequential()
    model.compile()
    model.train_on_batch(
        sample_data["x"],
        y=None,
        sample_weight=None,
        class_weight=None,
        reset_metrics=True,
        return_dict=False,
    )

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()
