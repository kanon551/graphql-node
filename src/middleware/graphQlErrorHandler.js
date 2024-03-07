const logger = require('../utils/logger');
const { buildGraphQLResponse } = require('./graphqlResponseUtility');
const httpResponse = require('../constants/httpResponse');


const handleGraphQLError = (error) => {
    // Customize error handling logic as needed
    const httpStatusCode = error.code || 500;
    const key = getKeyByStatusCode(httpStatusCode);
    return buildGraphQLResponse(key, null, error.message);
};

const getKeyByStatusCode = (statusCode) => {
    const appMessages = httpResponse.APP_MESSAGES;
  
    for (const key in appMessages) {
      if (appMessages[key].statusCode === statusCode) {
        return key;
      }
    }
  
    // Return a default key or handle the case when the statusCode is not found
    return 'ERROR_SERVER_ERROR';
  };

module.exports = {
    handleGraphQLError,getKeyByStatusCode
};
