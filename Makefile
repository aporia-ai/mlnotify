SHELL := /bin/bash

DEFAULT_VERSION=1.0.0

# Bump version
bump-version:
	$(eval CURRENT_VERSION=$(shell git for-each-ref --sort=-v:refname --count=1 refs/tags/[0-9]*.[0-9]*.[0-9]* refs/tags/v[0-9]*.[0-9]*.[0-9]* | cut -d / -f 3-))
	$(eval NEW_VERSION=v$(shell \
		if [ -z $(CURRENT_VERSION) ]; then \
			echo $(DEFAULT_VERSION); \
		else \
			semver bump patch $(CURRENT_VERSION); \
		fi; \
	))

	@git log -1 --pretty="%B" > /tmp/commit-message
	@sed -i '1s/^/\[$(NEW_VERSION)] /' /tmp/commit-message

	@echo [!] Bumping version from $(CURRENT_VERSION) to $(NEW_VERSION)

	@poetry version $(NEW_VERSION) || true
	@git add sdk/pyproject.toml || true

	git commit -F /tmp/commit-message --amend --no-edit

	git tag -a -m "Version $(NEW_VERSION)" $(NEW_VERSION)

	@BRANCH_PROTECTION=`curl https://api.github.com/repos/$(GITHUB_REPOSITORY)/branches/main/protection \
		-H "Authorization: token $(CAMPARIBOT_TOKEN)" -H "Accept:application/vnd.github.luke-cage-preview+json" -X GET -s`; \
	if [ "`echo $$BRANCH_PROTECTION | jq -r '.message'`" != "Branch not protected" ]; \
	then \
		echo [!] Disabling GitHub main branch protection; \
		curl https://api.github.com/repos/$(GITHUB_REPOSITORY)/branches/main/protection \
			-H "Authorization: token $(CAMPARIBOT_TOKEN)" -H "Accept:application/vnd.github.luke-cage-preview+json" -X DELETE; \
		trap '\
			echo [!] Re-enabling GitHub main branch protection; \
			curl https://api.github.com/repos/$(GITHUB_REPOSITORY)/branches/main/protection -H "Authorization: token $(CAMPARIBOT_TOKEN)" \
				-H "Accept:application/vnd.github.luke-cage-preview+json" -X PUT -d "{\"required_status_checks\":{\"strict\":false,\"contexts\":`echo $$BRANCH_PROTECTION | jq '.required_status_checks.contexts'`},\"restrictions\":{\"users\":[],\"teams\":[],\"apps\":[]},\"required_pull_request_reviews\":{\"dismiss_stale_reviews\":false,\"require_code_owner_reviews\":false},\"enforce_admins\":true,\"required_linear_history\":false,\"allow_force_pushes\":true,\"allow_deletions\":false}"; \
		' EXIT; \
	fi; \
	echo [!] Git Push; \
	git push --force;

	echo "::set-output name=bumped_version_commit_hash::`git log --pretty=format:'%H' -n 1`";
