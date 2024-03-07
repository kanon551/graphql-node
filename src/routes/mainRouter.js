const express = require('express');
const graphqlMiddleware = require('../middleware/graphqlMiddleware');


const mainRouter = express.Router();

    mainRouter.use('/graphql', graphqlMiddleware);

module.exports = mainRouter