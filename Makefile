.PHONY: dev
dev:
	docker-compose -f docker-compose.dev.yml \
		up --build

# GCP

# Build and tag the images
.PHONY: build
build:
	docker-compose -f docker-compose.gcp.yml build

.PHONY: push
push:
	docker-compose -f docker-compose.gcp.yml push

