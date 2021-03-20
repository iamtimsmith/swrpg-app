const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const db = require(`./database`);

passport.use(new LocalStrategy({usernameField: `email`}, (username, password, done) => {
	db.query(`CALL usp_getUserByEmail(?)`, [username], (err, results, fields) => {
		const user = results[0];
		if (err) return done(err);
		if (user.length === 0) return done(nulll, false, {message: `Incorrect username.`});
		if (!user[0].validPassword(password)) return done(nulll, false, {message: `Incorrect password.`});
		return done(null, user[0]);
	});
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
	db.query(`CALL usp_getUserById(?)`, [id], (err, results, fields) => {
		const user = results[0][0];
		done(err, user);
	})
});
