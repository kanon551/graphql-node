const { exampleServiceFunction } = require("../services/exampleService");
const logger = require("../utils/logger");
const responseUtility = require('../utils/responseUtility');



//@desc GET ---
//@route GET /api/example/test
//@access private
const exampleControllerExample = async(req,res,next) => {
    try{
        logger.info("REACHED")
            const response = await exampleServiceFunction();
            return res.status(200).json(responseUtility.build('SUCCESS', response));
    }
    catch(error){
        return next(error);
    }
}

module.exports = {exampleControllerExample};

