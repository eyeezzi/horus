CONTAINER_NAME=user-simulator
IMAGE_NAME=gcr.io/dapper-ops/uzziah-user-simulator

# Local Development

.PHONY: dev
dev: build run

.PHONY: build
build:
	docker build -t ${IMAGE_NAME} .

# The docker command in entrypoint gets PID 1; confirm by execing into container and run `ps -eaf`
# The process with PID 1 does not get SIGTERM
# --init executes tini as PID 1 and spawns your entrypoint, forwarding signals to it
# and reaping any zombie process it creates.
.PHONY: run
run:
	docker run \
	--init \
	--rm \
	--network=host \
	--env-file=.env \
	--volume=`pwd`/src:/usr/src/app \
	--volume=/usr/src/app/node_modules \
	--name=${CONTAINER_NAME} \
	${IMAGE_NAME}

# Staging and Production

.PHONY: staging
staging: build push deploy

.PHONY: push
push:
	docker push ${IMAGE_NAME}

.PHONY: deploy
deploy:
	kustomize build k8s | kubectl apply -f -

