from typing import Any

import pytest
from sklearn import datasets, svm, tree

import mlnotify  # noqa: F401
from tests.utils import MockedNotifyPlugin

SKLearnSampleData = Any


@pytest.fixture
def sample_data() -> SKLearnSampleData:
    return datasets.load_digits()


# svm
def test_sklearn_svm_svc_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = svm.SVC()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_svm_svr_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = svm.SVR()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_svm_oneclasssvm_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = svm.OneClassSVM()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_svm_nusvc_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = svm.NuSVC()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_svm_nusvr_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = svm.NuSVR()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_svm_linearsvr_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = svm.LinearSVR()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_svm_linearsvc_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = svm.LinearSVC()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


# tree
def test_sklearn_tree_decisiontreeclassifier_fit(
    sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin
):
    clf = tree.DecisionTreeClassifier()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_tree_extratreeregressor_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = tree.ExtraTreeRegressor()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_tree_extratreeclassifier_fit(sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin):
    clf = tree.ExtraTreeClassifier()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()


def test_sklearn_tree_decisiontreeregressor_fit(
    sample_data: SKLearnSampleData, mocked_notify_plugin: MockedNotifyPlugin
):
    clf = tree.DecisionTreeRegressor()
    clf.fit(sample_data.data[:-1], sample_data.target[:-1])

    mocked_notify_plugin.before.assert_called_once()
    mocked_notify_plugin.after.assert_called_once()
