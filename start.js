require(`dotenv`).config({path: `./config/.env`});

const app = require(`./config/app`);

app.listen(1127, () => console.log(`Application is Running!`));