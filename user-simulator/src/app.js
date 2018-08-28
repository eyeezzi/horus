// const dotenv = require('dotenv')
// if (process.env.NODE_ENV !== 'production') {
// 	const result = dotenv.config()
// 	if (result.error) {
// 		throw result.error
// 	}
// }

const cron = require("node-cron")
const axios = require('axios')

cron.schedule(process.env.CRON_SCHEDULE, async () => {
	try {
		console.log(`Requesting token from API Server`)
		const token = await axios.get(`${process.env.API_SERVER_ADDRESS}/tokens`)
		console.log('Received token from server:', token.data)
	} catch (err) {
		console.error(`Token request failed with error: ${err.message}`)
	}
})
