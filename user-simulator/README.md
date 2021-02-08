# User Simulator

Periodically sends requests to the API Server for tokens and weather.

## Dev Setup

```sh
# first rename example.env -> .env and provide the needed values
make dev
```

## Notes

### Useful Commands

- To see all networks on the host

		docker network ls

- To see which network a container is on

		docker inspect <container-name> -f "{{json .NetworkSettings.Networks }}"

- To disconnect a container from a network

		docker network disconnect <network-name> <container-name>

- To connect a container to a network

		docker network connect <network-name> <container-name>

	> Docker seems to have a bug where a container cannot be connected to the `host` network. See this [issue](https://github.com/awslabs/aws-sam-cli/issues/669).

- To list all the containers on a network.

		docker network inspect <network-name> -f "{{json .Containers }}"