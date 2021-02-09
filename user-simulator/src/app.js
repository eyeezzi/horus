const cron = require("node-cron")
const axios = require('axios')

// Ensure all required environment variables are present
if (process.env.JAEGER_SERVICE_NAME == undefined || process.env.JAEGER_SERVICE_NAME.trim == "") {
	throw "Environment variable JAEGER_SERVICE_NAME required but not provided"
}

if (process.env.CRON_SCHEDULE == undefined || process.env.CRON_SCHEDULE.trim == "") {
	throw "Environment variable CRON_SCHEDULE required but not provided"
}

var opentracing = require('opentracing')
// TODO: how to check that initialization worked
var initTracer = require('jaeger-client').initTracerFromEnv;
var tracer = initTracer()

cron.schedule(process.env.CRON_SCHEDULE, async () => {
	try {
		console.log(`Requesting token from API Server`)
		const token = await axios.get(`${process.env.API_SERVER_ADDRESS}/api/v1/tokens`)
		console.log('Received token from server:', token.data)

		const span = tracer.startSpan('whereami-request')

		console.log(`Requesting location info from API Server`)
		const location = await axios.get(`${process.env.API_SERVER_ADDRESS}/api/v1/whereami`, {
			headers: getCarrier(span, tracer)
		})
		console.log('Received location from server:', location.data)

		span.finish()		
	} catch (err) {
		console.error(`Token request failed with error: ${err.message}`)
	}
})

function getCarrier(span, tracer) {
	const carrier = {}
	tracer.inject(span.context(), opentracing.FORMAT_HTTP_HEADERS, carrier)
	return carrier
}