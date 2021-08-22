from functools import partial, partialmethod
import inspect
from typing import Any, Callable, Type, Union

import gorilla

from mlnotify.logger import logger

GORILLA_SETTINGS = gorilla.Settings(allow_hit=True, store_hit=True)


def base_patch_func(*args, __original_func: Callable, __before: Callable, __after: Callable, **kwargs) -> Any:
    """When patching a method, this function will run instead.

    Args:
        __original_func: The original function before the patch
        __before: The function to run before the original function
        __after: The function to run after the original function
        *args: positional args passed for the original function
        **kwargs: keyword args passed for the original function

    Returns:
        result: The original function's result
    """
    logger.debug("Running patched func", args, kwargs)

    try:
        __before()
    except Exception:
        logger.debug("Failed to run hook function (before)", exc_info=True)

    res = __original_func(*args, **kwargs)

    try:
        __after()
    except Exception:
        logger.debug("Failed to run hook function (after)", exc_info=True)

    return res


def patch(destination: Any, name: str, before: Callable, after: Callable) -> None:
    """This function patches the destination.name function and replaces it with the base_patch_func.

    Args:
        destination: The class/dict to patch
        name: The function name to be replaced
        before: The function to run before the original function
        after: The function to run after the original function
    """
    original_func: Callable = gorilla.get_attribute(destination, name)

    partial_type: Union[Type[partial], Type[partialmethod]] = partialmethod if inspect.isclass(destination) else partial

    patch_func = partial_type(base_patch_func, __original_func=original_func, __before=before, __after=after)
    patch = gorilla.Patch(destination, name, patch_func, settings=GORILLA_SETTINGS)
    gorilla.apply(patch)


def apply_hooks(before: Callable, after: Callable):
    """Applies hooks.

    This function applies all hooks - imports the relevant packages and patches
    the specified functions. Since usually not all packages exist, it runs on
    a best-effort assumption.

    Args:
        before: The function to run before the original function
        after: The function to run after the original function
    """
    logger.debug("Applying hooks")

    # LightGBM
    try:
        import lightgbm

        patch(lightgbm, "train", before=before, after=after)
        patch(lightgbm.sklearn, "train", before=before, after=after)
    except Exception:
        logger.debug("Could not import and patch lightgbm", exc_info=True)

    # XGBoost
    try:
        import xgboost

        patch(xgboost, "train", before=before, after=after)
        patch(xgboost.sklearn, "train", before=before, after=after)
    except Exception:
        logger.debug("Could not import and patch xgboost", exc_info=True)

    # Tensorflow & Keras
    try:
        import tensorflow

        patch(tensorflow.keras.Model, "fit", before=before, after=after)
        patch(tensorflow.keras.Model, "train_on_batch", before=before, after=after)
    except Exception:
        logger.debug("Could not import and patch tensorflow.keras", exc_info=True)
        # If tensorflow.keras patching doesn't work, we can try
        # patching keras as a standalone
        try:
            import keras

            patch(keras.Model, "fit", before=before, after=after)
            patch(keras.Model, "train_on_batch", before=before, after=after)
        except Exception:
            logger.debug("Could not import and patch keras", exc_info=True)

    # SKLearn
    try:
        import sklearn.svm
        import sklearn.tree

        patch(sklearn.svm.SVC, "fit", before=before, after=after)
        patch(sklearn.svm.SVR, "fit", before=before, after=after)
        patch(sklearn.svm.OneClassSVM, "fit", before=before, after=after)
        patch(sklearn.svm.NuSVC, "fit", before=before, after=after)
        patch(sklearn.svm.NuSVR, "fit", before=before, after=after)
        patch(sklearn.svm.LinearSVR, "fit", before=before, after=after)
        patch(sklearn.svm.LinearSVC, "fit", before=before, after=after)
        patch(sklearn.tree.DecisionTreeClassifier, "fit", before=before, after=after)
        patch(sklearn.tree.DecisionTreeRegressor, "fit", before=before, after=after)
    except ImportError:
        logger.debug("Could not import and patch sklearn", exc_info=True)
