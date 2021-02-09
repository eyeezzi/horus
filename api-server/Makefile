CONTAINER_NAME=api-server
# TODO: use git commit as tag
IMAGE_NAME=gcr.io/dapper-ops/uzziah-api-server

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
	# try mounting a docker volume so that changing files trigger nodemon
	# we mount the node_modules directory from the container to host to avoid overriding
	# it with our src code mount.
	docker run \
	--init \
	--rm \
	--env-file=.env \
	--volume=`pwd`/src:/usr/src/app \
	--volume=/usr/src/app/node_modules \
	-p 127.0.0.1:5000:5000 \
	--name=${CONTAINER_NAME} \
	${IMAGE_NAME}

.PHONY: start
start: build run