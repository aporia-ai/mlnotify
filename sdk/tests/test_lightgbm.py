from pathlib import Path
from typing import Any

import lightgbm
import pytest
import sklearn.datasets

import mlnotify  # noqa: F401
from tests.utils import MockedNotifyPlugin

LightgbmSampleData = Any


@pytest.fixture
def sample_data() -> LightgbmSampleData:
    sample_data_path = Path(__file__).parent / Path("data", "lightgbm.bin")
    return lightgbm.Dataset(sample_data_path.as_posix())


def test_lightgbm_train(sample_data: LightgbmSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    lightgbm.train({"num_leaves": 2, "objective": "binary"}, sample_data, 1)

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_lightgbm_sklearn_train(
    sample_data: LightgbmSampleData, mocked_notify_plugin: MockedNotifyPlugin
):
    lightgbm.sklearn.train({"num_leaves": 2, "objective": "binary"}, sample_data, 1)

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_lightgbm_lgbmmodel_fit(mocked_notify_plugin: MockedNotifyPlugin):
    X, y = sklearn.datasets.load_digits(n_class=2, return_X_y=True)
    est = lightgbm.LGBMModel(n_estimators=5, objective="binary")
    est.fit(X, y)

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()
