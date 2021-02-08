# Horus

A project for learning about microservices observability. 

* Centralized Logging
* Distributed Tracing

## Development Requirements

- Docker Compose v1.23.2
- OSX or GNU/Linux

## Development Setup

1. Clone this repo and open the root folder in an IDE like *Visual Studio Code*.

2. For each microservice, rename `example.env` to `.env` and supply the needed secrets.
    > TODO: Eliminate this friction.

3. Start all microservices in *development mode*.

        make dev

    > In Development Mode
    >
    > - You can attach a remote debugger to a running Docker service for seemless debugging like placing breakpoints and watching variables.
    > - Changes to source files will automatically restart the corresponding docker service.

4. Optionally, attach the IDE's debugger to a service as follows in Visual Studio Code: *shift+cmd+D > Select a debug configuration > F5*.
    > All vscode debug configurations are stored in *.vscode/launch.json*. You can modify configs as you see fit.

5. Visit http://localhost:16686 to view traces.

### Useful dev commands

    # list all running services
    docker-compose -f docker-compose.dev.yml ps

    # stop all services
    docker-compose -f docker-compose.dev.yml down

    # restart all [or specific] service
    docker-compose -f docker-compose.dev.yml \
        up -d --no-deps --build [service-name]

    # tail logs from all [or specific] service
    docker-compose -f docker-compose.dev.yml \
        logs -f [service-name]
        
    # see how an image was built
    docker history <image-name>

## Project Architecture

### Logging Infrastructure

![](docs/container-architecture.svg)

Read this [article](https://hackernoon.com/monitoring-containerized-microservices-with-a-centralized-logging-architecture-ba6771c1971a) for more details.

### Tracing Infrastructure

![Tracing Backend Architecture](docs/distributed-tracing/tracing-backend.svg)

Read this [article](#todo) for more details.

## Miscellaneous Notes

### TODO (Improvement Considerations)

- Research **jaeger-operator**

- Name Duplication: The value of the `API_SERVER_ADDRESS` variable in *user-simulator/.env* depends on the service name `api-server` specified in *docker-compose.yml*. If we rename the service, we must also change the variable. Is there a way to make this DRY?

- In the log-shipper container, I had to install a logz.io-specific plugin. Can't this step be eliminated since fluentd is capable of connecting to https endpoints without plugins?

- Use sub-second precision for fluentd timestamps (probably best to use nanoseconds.)

### Best practices

1. You can pass secrets for a microservice using the `env_file` attribute in *docker-compose.yml*.
2. Microservices can communicate using their service names if they are in the same docker network.
3. Do these things to ensure a dockerized application can receive signals: https://hynek.me/articles/docker-signals/. 

    Use exec-form ENTRYPOINT in Dockerfile. If starting your app from a shell or shell script, exec your app in that script so that the shell replaces it's process with your app - instead of spawning your app as a subprocess of the shell.

    `eval "command"` runs the command as a child process which returns to the current process on exit. `exec command` replaces the current process with the new command process, and returns to the grand-parent process on exit. In a shell, `echo $$` gives you the current PID.

### Docker Networking

By default each containerized process runs in an isolated network namespace. For inter-container communication, place them in the same network namespace.

### References

- https://medium.com/lucjuggery/docker-in-development-with-nodemon-d500366e74df
- https://blog.risingstack.com/how-to-debug-a-node-js-app-in-a-docker-container/
- https://codefresh.io/docker-tutorial/debug_node_in_docker/
- https://code.visualstudio.com/docs/editor/debugging