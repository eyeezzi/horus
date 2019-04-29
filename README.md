# Horus

Monitoring containerized microservices with a centralized logging architecture.

## Dependencies

- Docker Compose v1.23.2

## Setup

1. Signup with an ELK SaaS provider like [Logz.io](logz.io) to obtain an authentication token. Then for each microservice, rename `example.env` to `.env` and supply the needed secrets.

2. Run the following commands.

		docker-compose build --pull
		docker-compose up -d --force-recreate
		
3. Then log into your ELK SaaS and view your microservices logs.

## Project Documentation

### System Architecture

![](docs/container-architecture.svg)

I wrote an accompanying [article](https://hackernoon.com/monitoring-containerized-microservices-with-a-centralized-logging-architecture-ba6771c1971a) explaining this architecture.

## Notes

### Docker Networking

By default each containerized process runs in an isolated network namespace. For inter-container communication, place them in the same network namespace...as seen in *docker-compose.yml*.

### Best practices

1. You can pass secrets for a microservice using the `env_file` attribute in *docker-compose.yml*.
2. Microservices can communicate using their service names if they are in the same docker network.

### Improvement Considerations

1. **Name Duplication:** The value of the `API_SERVER_ADDRESS` variable in *user-simulator/.env* depends on the service name `api-server` specified in *docker-compose.yml*. If we rename the service, we must also change the variable. Is there a way to make this DRY?

2. In the log-shipper container, I had to install a logz.io-specific plugin. Can't this step be eliminated since fluentd is capable of connecting to https endpoints without plugins?