const { graphqlHTTP } = require('express-graphql');
const { taskSchema } = require('../schemas/taskSchema');
const { taskRoot } = require('../controllers/taskController');
const { handleGraphQLError } = require('../middleware/graphqlErrorHandler');

const graphqlMiddleware = graphqlHTTP({
    schema: taskSchema,
    rootValue: taskRoot,
    graphiql: true,
    customFormatErrorFn: (err) => {
        return handleGraphQLError(err.originalError);
    },
});

module.exports = graphqlMiddleware;