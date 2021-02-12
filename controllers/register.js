const handleRegister = (req, res, bcrybt, db) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password){
		return res.status(400).json("empty fields are prohibited!")
	}
	const hash = bcrybt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);
			})

		})
		.then(trx.commit)
		.catch(trx.rollback)

	})
	.catch(err => res.status(400).json("unable to register: mostly because this user already exists"))

}

module.exports = {
	handleRegister: handleRegister
};