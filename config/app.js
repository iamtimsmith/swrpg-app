const express = require(`express`);
const app = express();
const routes = require(`./routes`);
require('./database');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(`/`, routes);

module.exports = app;