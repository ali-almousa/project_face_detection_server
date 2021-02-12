const handleSignin = (req, res, bcrybt, db) => {
	const { email, password } = req.body;
	if (!email || !password){
		return res.status(400).json("empty fields are prohibited!")
	}
	db.select('*').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrybt.compareSync( password, data[0].hash);
		if (isValid){
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json('unable to get user'))
		}else{
			res.status(400).json('wrong credentialss');
		}

	})
	.catch(err => res.status(400).json("wrong credentials"))
}

module.exports = {
	handleSignin: handleSignin
}