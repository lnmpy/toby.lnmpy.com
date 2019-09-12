export PATH := node_modules/.bin/:$(PATH)

SHELL = /bin/bash
DIST = dist
BUCKET = apps.lnmpy.com
BUCKET_PREFIX = toby/

.PHONY: build
.PHONY: config

all: start

start:
	npm run dev

install:
	yarn install

lint:
	npm run lint

clean:
	rm -rf ${DIST}/*

deploy: clean
	$(eval GIT_COMMIT = $(shell git rev-parse --verify HEAD --short))
	npm run build -- --env.deploy --env.git_sha='$(GIT_COMMIT)'
	aws s3 sync ${DIST} s3://${BUCKET}/${BUCKET_PREFIX} --acl public-read --region ap-northeast-2 --cache-control max-age=86400
	aws s3 cp ${DIST}/index.html s3://${BUCKET}/${BUCKET_PREFIX}/index.html --acl public-read --region ap-northeast-2 --cache-control no-cache

report:
	npm run build -- --env.report
