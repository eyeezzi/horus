const app = require('express')()
const uuid = require('uuid/v1')

app.use('/api/v1/tokens', (req, res) => {
	console.log(`Handling request for token`)
	res.json({token: uuid()})
})
app.use('/api/v1/whereami', (req, res) => {
	// TODO: get geolocation info from IP address
	// TODO: get weather info from geolocation
	// TODO: return everything
	let data = {'info': null}
	res.json(data)
})
const server = app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on ${ server.address().address }:${ server.address().port }`)
})