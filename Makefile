export PATH := node_modules/.bin/:$(PATH)

SHELL = /bin/bash
folder = dist


all: start

start:
	npm run dev

install:
	npm install

clean:
	rm -rf $(folder)/*

build:
	npm run build

lint:
	npm run lint

deploy: clean
	npm run build -- --env.deploy

report: clean
	npm run build -- --env.report
