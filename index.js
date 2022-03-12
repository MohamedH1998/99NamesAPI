const express = require('express');
const cors = require('cors');

const namesRoutes = require('./routes/namesRoutes');
const { rateLimiterUsingThirdParty } = require('./middlewares');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/', rateLimiterUsingThirdParty, namesRoutes);

// TODO: replace this with logger
const server = app.listen(PORT, () => console.log(`App is listening on ${PORT}`));

module.exports = {
  server,
  app,
};
