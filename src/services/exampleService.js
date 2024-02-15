const nodeProjectRepo = require('../config/dbConnection');
const logger = require('../utils/logger');
const {ExceptionResolver} = require('../middleware/ExceptionResolver');
const {GET_SOMETHING} = require('../queries/exampleQueries');
const { NotFound } = require('../utils/exceptions');


const exampleServiceFunction = async() => {
    try{
            const sampleResponse = await nodeProjectRepo.pool.query(GET_SOMETHING, [1234]);

            if(sampleResponse.status === false){
                throw new NotFound('Something is not found');
            }
            else {
                return 'TESTED SUCCESSFULLY';
            }


    }
    catch(err){
        logger.error(`exampleServiceFunction -> ${err.message}`);
        ExceptionResolver(err, null);
    }
}

module.exports = {exampleServiceFunction};