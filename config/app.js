const express = require(`express`);
const flash = require(`connect-flash`);
const session = require(`express-session`);
const path = require(`path`);
const routes = require(`./routes`);
const passport = require(`passport`);
const db = require(`./database`);
const app = express();

// Set up templating engine
app.set(`view engine`, `pug`);
// Set up body parsing
app.use(express.json());
app.use(express.urlencoded({extended : false}));
// Set up static folder
app.use(express.static(path.join(__dirname, `public`)));
// Create sessions
app.use(session({
  secret: process.env.SECRET || `secret`,
  key: process.env.KEY || `key`,
  resave: false,
  saveUninitialized: false,
}));
// Set up passport
app.use(passport.initialize());
app.use(passport.session());
// Add flash
app.use(flash());
app.use((req, res, next) => {
  // res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

require(`./passport`);

app.use(`/`, routes);

module.exports = app;
