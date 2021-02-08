# API Server

Listens for requests, like getting a random token or the current weather or a client, and returns an appropriate response.

## Dev Setup

```sh
make dev

# From another terminal on the host machine, test the server
curl http://localhost:5000/api/v1/tokens
```

## Notes

- To quickly test a container

  ```sh
  docker build -t <image-name> --no-cache . \
      && docker run -it -v $(pwd)/src:/usr/src/app <imgage-name> sh

  docker build -t api-server --no-cache . \
      && docker run -it -v $(pwd)/src:/usr/src/app api-server sh
  ```
- The `-v` flag maps host absolute path to container absolute path.

- Note: The server runs on port `80`, but we expose it as `5000` on the host in order to avoid privilege issues with binding to low number ports. Knowledge bit: [port-mapping cannot be set in dockerfile.](https://stackoverflow.com/questions/36153025/is-it-possible-to-set-docker-port-mappings-to-host-in-dockerfile)