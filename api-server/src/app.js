// const dotenv = require('dotenv')
// if (process.env.NODE_ENV !== 'production') {
// 	const result = dotenv.config()
// 	if (result.error) {
// 		throw result.error
// 	}
// }

const app = require('express')()
const uuid = require('uuid/v1')

app.use('/api/v1/tokens', (req, res) => {
	console.log(`Handling request for token`)
	res.json({token: uuid()})
})

const server = app.listen(process.env.PORT, () => {
	console.log(`Listening on ${ server.address().address }:${ server.address().port }`)
})