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
	npm run build

lint:
	npm run lint

deploy:
	npm run build -- --env.deploy

report:
	npm run build -- --env.report
