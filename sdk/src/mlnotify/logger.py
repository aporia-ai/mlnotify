import logging
import logging.config

LOGGER_NAME = "mlnotify"


def init_logger():
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
    logger = logging.getLogger(LOGGER_NAME)

    logger.debug(f"Logger level is set to {logger.level}")
    return logger


logger = init_logger()
