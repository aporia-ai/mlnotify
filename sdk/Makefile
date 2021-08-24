SHELL := /bin/bash

# Install dependencies
install-deps:
	@echo [!] Installing Semver
	@sudo wget https://raw.githubusercontent.com/fsaintjacques/semver-tool/master/src/semver -O /usr/bin/semver
	@sudo chmod +x /usr/bin/semver

	@echo [!] Installing yq
	@sudo wget https://github.com/mikefarah/yq/releases/download/v4.6.1/yq_linux_amd64 -O /usr/bin/yq && sudo chmod +x /usr/bin/yq

	@echo [!] Installing Poetry + Nox
	@sudo apt install python3-setuptools
	@sudo pip3 install poetry nox --upgrade

# Run tests
test:
	@echo [!] Running tests
	@nox
