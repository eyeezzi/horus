## Running app in standalone container

1. Rename *example.env* to *.env* and supply the `API_SERVER_ADDRESS`. Then run the following commands

	> If the API Server is running in another local container with an exposed port, then run this container in the `host` network so it can access the API Server.

		docker build --no-cache -t eyeezzi/horus-user-simulator .
		docker run -d --env-file=.env eyeezzi/horus-user-simulator
	
		# if api server is running on localhost:5000
		docker run -d --env-file=.env --network=host eyeezzi/horus-user-simulator

2. Verify that this container is generating logs.

		docker ps 
		docker logs -f <container-name>

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