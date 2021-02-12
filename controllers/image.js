const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'a41e8d10432d42dfa4f163dbc08bdae2'
});

const handleApiCall = (req, res) => {

	app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => res.json(data))
	.catch(err => res.status(400).json('unable to work with API'))
}


const handleIamge = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'));
}


module.exports = {
	handleIamge: handleIamge,
	handleApiCall: handleApiCall
}