import logging
import logging.config

LOGGER_NAME = "mlnotify"
is_logger_initiated = False


def init_logger():
    global is_logger_initiated
    logging.config.dictConfig(
        {
            "version": 1,
            "handlers": {
                "console": {
                    "class": "logging.StreamHandler",
                    "level": "WARNING",
                    "formatter": "standard",
                    "stream": "ext://sys.stdout",
                }
            },
            "formatters": {"standard": {"format": "%(asctime)s [%(name)s] %(levelname)s: %(message)s"}},
            LOGGER_NAME: {"level": "WARNING", "handlers": ["console"]},
            "disable_existing_loggers": False,
        }
    )
    is_logger_initiated = True
    logger = logging.getLogger(LOGGER_NAME)

    logger.debug(f"Logger is set to level {logger.level}")
    return logger


def get_logger():
    """
    Get the logger for the module.
    """
    global is_logger_initiated
    if not is_logger_initiated:
        init_logger()
    return logging.getLogger(LOGGER_NAME)
