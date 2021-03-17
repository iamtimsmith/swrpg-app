const express = require(`express`);
const routes = require(`./routes`);
const app = express();
require(`./database`);

app.set(`view engine`, `pug`);
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(`/`, routes);

module.exports = app;
