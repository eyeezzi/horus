## Notes

### Local setup

1. Build and run the container.

		docker build --no-cache -t eyeezzi/horus-log-shipper .
		docker run -d --env-file=.env eyeezzi/horus-log-shipper
		// tail the logs to see any incoming messages
		docker logs -f <container-name>

2. From another terminal test sending logs to the shipper. You should see the new incoming message in the log tail and also on your ELK SaaS dashboard.

		curl -X POST -H "Content-Type: application/json" -d '{"msg":"this is a test message"}' http://localhost:24224