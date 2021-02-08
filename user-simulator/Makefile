CONTAINER_NAME=user-simulator
IMAGE_NAME=eyeezzi/horus-user-simulator

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

.PHONY: dev
dev: build run