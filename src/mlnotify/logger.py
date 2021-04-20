import logging
import logging.config

LOGGER_NAME = "mlnotify"

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

logger.debug(f"Logger is set to level {logger.level}")
