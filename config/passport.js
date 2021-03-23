const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const bcrypt = require(`bcrypt`);
const db = require(`./database`);

passport.use(new LocalStrategy({usernameField: `email`}, (username, password, done) => {
	db.query(`CALL usp_getUserByEmail(?)`, [username], (err, results, fields) => {
		const user = results[0][0];
		if (err) return done(err);
		if (results[0].length < 1) return done(nulll, false);
		bcrypt.compare(password, user.password, (err, valid) => {
			if (err) return done(err);
			if (!valid) return done(null, false);
			return done(null, user);
		});
	});
}));

passport.serializeUser((user, done) => {
	return done(null, user.userId);
});

passport.deserializeUser((id, done) => {
	db.query(`CALL usp_getUserById(?)`, [id], (err, results, fields) => {
		const user = results[0][0];
		done(err, user);
	})
});
