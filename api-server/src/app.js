const app = require('express')()
const uuid = require('uuid/v1')
const axios = require('axios')

// Ensure all required environment variables are present
if (process.env.JAEGER_SERVICE_NAME == undefined || process.env.JAEGER_SERVICE_NAME.trim == "") {
	throw "Environment variable JAEGER_SERVICE_NAME required but not provided"
}

// For portability, we initialize tracer from envars instead of local options.
// See: https://www.npmjs.com/package/jaeger-client#environment-variables
var opentracing = require('opentracing')
var initTracer = require('jaeger-client').initTracerFromEnv;
var tracer = initTracer()

app.use('/health', (req, res) => {
	res.json(null)
})

app.use('/api/v1/tokens', (req, res) => {
	const span = tracer.startSpan('token-request')

	console.log(`Handling request for token`)
	res.json({token: uuid()})

	span.finish()
})

app.use('/api/v1/whereami', async (req, res, next) => {

	const mainSpan = createContinuationSpan(tracer, req, 'whereami-request')

	try {
		// get location of IP Address
		const IP = '23.16.76.104'
		const locSpan = tracer.startSpan('get-location', {childOf: mainSpan})
		const location = await axios.get(`http://ip-api.com/json/${IP}`)
		locSpan.finish()
		const {lat, lon, city, country} = location.data

		// do some other async task
		const fakeSpan = tracer.startSpan('get-weather', {childOf: mainSpan})
		const _ = await fakeFetch(1500, 0.7)
		fakeSpan.finish()

		// return results
		const data = {lat: lat, lon: lon, city: city, country: country}
		res.json(data)
	} catch(err) {
		mainSpan.setTag('ERROR', err)
		next(err)
	}

	mainSpan.finish()
})

app.use('/', (req, res) => {
	console.log(`Unknown request: ${req.path}`)
	res.sendStatus(404)
})

const server = app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on ${ server.address().address }:${ server.address().port }`)
})

function fakeFetch(msDelay, successRate) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() <= successRate) {
				resolve()
			} else {
				reject('Fake fetch failed randomly.')
			}
		}, msDelay)
	})
}

// If the request is already being traced, continue the trace
// else start a new trace.
function createContinuationSpan(tracer, req, spanName) {
	const incomingSpanContext = tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers)
	
	let newSpan = null
	if (incomingSpanContext == null) {
		newSpan = tracer.startSpan(spanName)
	} else {
		newSpan = tracer.startSpan(spanName, {childOf: incomingSpanContext})
	}

	return newSpan
}