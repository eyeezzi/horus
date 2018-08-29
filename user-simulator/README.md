## Commands for running app in container

1. Build image from *Dockerfile*

		docker build -t eyeezzi/horus-user-simulator .
		
2. Start container from image. Note the *public:internal* port mapping

		docker run -d eyeezzi/horus-user-simulator

3. Get the container ID and verify port mapping

		docker ps

4. Tail the logs from the container

		docker logs -f <CONTAINER_ID>