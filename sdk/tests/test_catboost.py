from typing import Any

import pytest
from sklearn import datasets
import catboost

import mlnotify  # noqa: F401
from tests.utils import MockedNotifyPlugin

SKLearnSampleData = Any


@pytest.fixture
def sample_data() -> SKLearnSampleData:

    return datasets.load_digits()


# CatBoostRegressor
def test_catboost_regressor_model(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = catboost.CatBoostRegressor()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()

# CatBoostClassifier
def test_catboost_classifier_model(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = catboost.CatBoostClassifier()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()
