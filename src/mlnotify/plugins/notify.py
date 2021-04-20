from uuid import uuid4

import qrcode

from mlnotify.plugins.base import BasePlugin

BASE_URL = "https://mlnotify.com/training"


class NotifyPlugin(BasePlugin):
    """This plugin allows the user to get a notification when his model's training is over.

    The before function prints a url & QR code to stdout. The url leads to mlnotify.com
    with a uuid of this specific training session.

    The after function sends a notification to the mlnotify.com server which will notify
    the user that his model finished training if he entered the website with the
    generated url.
    """

    def __init__(self):
        """Generates an id and a url with that id."""
        self.id = uuid4()
        self.url = f"{BASE_URL}?id={self.id}"

    def before(self):
        """The function to run prior to the hooked function.

        Prints:
        * The stored url
        * A QR code of the stored url
        * A text explaining how to get a notification via the above url & qr
        """
        self.print_qr()
        print(self.url)
        print("\nScan the QR code or enter the url to get a notification when your training is done\n\n")

    def after(self):
        """This function will run after the hooked function finished.

        Sends a 'training_complete' message to the mlnotify.com server with
        This training's uuid
        """
        # TODO
        # Send training_complete message to firebase
        pass

    def print_qr(self):
        """Generates and prints a QR of the stored url."""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(self.url)

        qr.print_ascii()
