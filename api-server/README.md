## Commands for running app in container

1. Build image from *Dockerfile*

		docker build -t eyeezzi/horus-api-server .
		
2. Start container from image. Note the *public:internal* port mapping

		docker run -d -p 5000:80 eyeezzi/horus-api-server

3. Get the container ID and verify port mapping

		docker ps

4. Tail the logs from the container

		docker logs -f <CONTAINER_ID>