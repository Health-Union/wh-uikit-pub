.PHONY: console clean install cleanup-hooks up lint test

console:
	docker-compose run --rm wh-uikit /bin/sh

clean:
	rm -rf node_modules

install:
	docker-compose run --rm wh-uikit yarn

cleanup-hooks:
	find .git/hooks/* | grep -v pre-commit | xargs rm

up:
	docker-compose run --rm --service-ports wh-uikit yarn start --host 0.0.0.0

lint:
	docker-compose run --rm wh-uikit yarn lint

test:
	docker-compose run --rm -e TZ=America/New_York wh-uikit yarn test

