from uuid import uuid4

import qrcode
import requests

from mlnotify.plugins.base import BasePlugin

BASE_URL = "https://mlnotify.aporia.com"


class NotifyPlugin(BasePlugin):
    """This plugin allows the user to get a notification when his model's training is over.

    The before function prints a url & QR code to stdout. The url leads to the base url
    with a uuid of this specific training session.

    The after function sends a notification to the server which will notify
    the user that his model finished training if he entered the website with the
    generated url.
    """

    def before(self):
        """The function to run prior to the hooked function.

        Reports the training start to the server and saves the created id & url.
        Then it prints:
        * The stored url
        * A QR code of the stored url
        * A text explaining how to get a notification via the above url & qr
        """
        self.id = self.report_training_start()
        self.url = f"{BASE_URL}/training/{self.id}"

        self.print_qr()
        print(self.url)
        print("\nScan the QR code or enter the url to get a notification when your training is done\n\n")

    def after(self):
        """This function will run after the hooked function finished.

        Sends a 'training_complete' message to the server with
        This training's uuid
        """
        self.report_training_end()

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

    def report_training_start(self) -> str:
        """Reports training start to the server

        Returns:
        * trainingId (str): the training id created by the server
        """
        response = requests.post(f"{BASE_URL}/.netlify/functions/training-start")

        response.raise_for_status()

        body = response.json()
        return body["trainingId"]

    def report_training_end(self):
        """Reports training end to the server."""
        response = requests.post(f"{BASE_URL}/.netlify/functions/training-end", data={"trainingId": self.id})

        response.raise_for_status()
