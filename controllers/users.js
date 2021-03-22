const bcrypt = require(`bcrypt`);
const passport = require(`passport`);
const db = require(`../config/database`);

module.exports = {
	signupPage: (req, res) => res.render(`signup`),
	signup: (req, res) => {
		const {name, email, password, confirm} = req.body;
		if (!name || !email || !password || !confirm) return res.render(`signup`, {error: `You must fill out all of the fields!`});
		if (password !== confirm) return res.render(`signup`, {error: `Passwords do not match. Please try again!`});
		// Check to see if email is in use
		db.query(`CALL usp_getUserByEmail(?)`, [email], (err, results, fields) => {
			const user = results[0];
			if (err) throw err;
			if (user.length > 0) return res.render(`signup`, {error: `This email address is already being used!`});
			bcrypt.hash(password, 10, (error, hash) => {
				if (error) throw error;
				db.query(`CALL usp_createUser(?, ?, ?)`, [name, email, hash], (err, results, fields) => {
					return res.redirect(`/`);
				});
			});
		});
	},
	login: (req, res) => res.render(`login`),
}
