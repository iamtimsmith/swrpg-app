const bcrypt = require(`bcrypt`);
const passport = require(`passport`);
const db = require(`../config/database`);

module.exports = {
	signupPage: (req, res) => res.render(`signup`),
	signup: (req, res) => {
		const {name, email, password, confirm} = req.body;
		if (!name || !email || !password || !confirm) {
			req.flash(`danger`, `You must fill out all of the fields!`);
			return res.render(`signup`, {flashes: req.flash()});
		}
		if (password !== confirm) {
			req.flash(`danger`, `Passwords do not match. Please try again!`);
			return res.render(`signup`, {flashes: req.flash()});
		}
		// Check to see if email is in use
		db.query(`CALL usp_getUserByEmail(?)`, [email], (err, results, fields) => {
			const user = results[0];
			if (err) throw err;
			if (user.length > 0) {
				req.flash(`danger`, `This email address is already being used!`);
				return res.render(`signup`, {flashes: req.flash()});
			}
			bcrypt.hash(password, 10, (error, hash) => {
				if (error) throw error;
				db.query(`CALL usp_createUser(?, ?, ?)`, [name, email, hash], (err, results, fields) => {
					req.flash(`success`, `Your account was successfully created!`);
					return res.redirect(`/`);
				});
			});
		});
	},
	login: (req, res) => res.render(`login`),
}
