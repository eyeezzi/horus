const cron = require("node-cron")
const axios = require('axios')

cron.schedule(process.env.CRON_SCHEDULE, async () => {
	try {
		console.log(`Requesting token from API Server`)
		const token = await axios.get(`${process.env.API_SERVER_ADDRESS}/tokens`)
		console.log('Received token from server:', token.data)

		console.log(`Requesting location info from API Server`)
		const location = await axios.get(`${process.env.API_SERVER_ADDRESS}/whereami`)
		console.log('Received location from server:', location.data)		
	} catch (err) {
		console.error(`Token request failed with error: ${err.message}`)
	}
})
