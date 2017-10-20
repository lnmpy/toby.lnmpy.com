export PATH := node_modules/.bin/:$(PATH)

SHELL = /bin/bash
folder = dist

.PHONY: build
.PHONY: config

all: start

start:
	npm run dev

install:
	yarn install

build:
	@rm -rf dist
	npm run build

lint:
	npm run lint

deploy:
	@rm -rf dist
	$(eval GIT_COMMIT = $(shell git rev-parse --verify HEAD --short))
	npm run build -- --env.deploy --env.git_sha='$(GIT_COMMIT)'

report:
	npm run build -- --env.report
