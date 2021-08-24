from abc import ABC, abstractmethod


class BasePlugin(ABC):
    """Abstract class for plugins."""

    @abstractmethod
    async def before(self) -> None:
        """This function will run prior to the hooked function."""
        pass

    @abstractmethod
    async def after(self) -> None:
        """This function will run after the hooked function finished."""
        pass
