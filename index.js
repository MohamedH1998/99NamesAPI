"use strict"
const express = require("express")
const cors = require("cors")
const namesRoutes = require('./routes/namesRoutes')
const { rateLimiterUsingThirdParty } = require('./middlewares');

const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use("/", rateLimiterUsingThirdParty, namesRoutes.routes)


app.listen(PORT, () => console.log("App is listening on " + PORT))