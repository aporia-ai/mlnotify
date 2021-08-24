from dataclasses import dataclass

import qrcode
import requests

from mlnotify.plugins.base import BasePlugin

BASE_URL = "https://mlnotify.aporia.com"


@dataclass
class TrainingInfo:
    """The training information - the id - a 6 digits number, and token - a secret which allows to end the training."""

    id: str
    token: str


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

        Reports the training start to the server and saves the created id, token & url.
        Then it prints:
            * The stored url
            * A QR code of the stored url
            * A text explaining how to get a notification via the above url & qr
        """
        self.training_info = self.report_training_start()
        self.url = f"{BASE_URL}/training/{self.training_info.id}"

        self.print_qr(self.url)
        print(self.url)
        print("\nScan the QR code or enter the url to get a notification when your training is done\n\n")

    def after(self):
        """This function will run after the hooked function finished.

        Sends a 'training_complete' message to the server with
        This training's uuid
        """
        self.report_training_end(self.training_info)

    @staticmethod
    def print_qr(url: str):
        """Generates and prints a QR of the stored url."""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(url)

        qr.print_ascii()

    @staticmethod
    def report_training_start() -> TrainingInfo:
        """Reports training start to the server.

        Returns:
            trainingInfo (TrainingInfo): the training info created by the server
        """
        response = requests.post(f"{BASE_URL}/.netlify/functions/training-start")

        response.raise_for_status()

        body = response.json()
        return TrainingInfo(id=body["trainingId"], token=body["trainingToken"])

    @staticmethod
    def report_training_end(training_info: TrainingInfo):
        """Reports training end to the server."""
        response = requests.post(
            f"{BASE_URL}/.netlify/functions/training-end",
            json={
                "trainingId": training_info.id,
                "trainingToken": training_info.token,
            },
        )

        response.raise_for_status()
