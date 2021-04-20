from pathlib import Path
from typing import Any, Dict, Union

from numpy import loadtxt
import pytest
import xgboost

import mlnotify  # noqa: F401
from tests.utils import MockedNotifyPlugin

SampleNpData = Dict[str, Union[list, Any]]


@pytest.fixture
def sample_data() -> xgboost.DMatrix:
    sample_data_path = Path(Path(__file__).parent, "data", "xgboost.txt")
    return xgboost.DMatrix(sample_data_path)


@pytest.fixture
def sample_np_data() -> SampleNpData:
    sample_data_path = Path(Path(__file__).parent, "data", "keras.csv")
    dataset = loadtxt(sample_data_path, delimiter=",")
    return {"x": dataset[:, 0:8], "y": dataset[:, 8]}


def test_xgboost_train(sample_data: xgboost.DMatrix, mocked_notify_plugin: MockedNotifyPlugin):
    xgboost.train({"max_depth": 1, "eta": 1, "objective": "binary:logistic"}, sample_data, 1)

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_xgboost_sklearn_train(sample_data: xgboost.DMatrix, mocked_notify_plugin: MockedNotifyPlugin):
    xgboost.sklearn.train({"max_depth": 1, "eta": 1, "objective": "binary:logistic"}, sample_data, 1)

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_xgboost_xgbmmodel_train(sample_np_data: SampleNpData, mocked_notify_plugin: MockedNotifyPlugin):
    param_dist = {"objective": "binary:logistic", "n_estimators": 2}
    clf = xgboost.XGBModel(**param_dist)

    clf.fit(sample_np_data["x"], sample_np_data["y"])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()
