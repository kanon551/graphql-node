const express = require('express');
const exampleRouter = require('./exampleRouter');

const mainRouter = express.Router();

    mainRouter.use("/example", exampleRouter);

module.exports = mainRouter