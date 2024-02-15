## 1. Make sure controller always is in this format
--------------------------------------------------

//@desc {method} {personal description}

//@route {method} {/endpoint}

//@access {modifier}

const xyz = async(req, res, next) => {
    try{

            [ ALL YOUR BUSINESS LOGIC ]
            const response = await callYourFunction(req);
            return res.status(200).json(responseUtility.build('SUCCESS', response));
    }
    catch(error){
        return next(error)
    }
}

## 2. Always wrap entire function in try / catch block. Catch block should only have 1 logger.error and ExceptionalResolver nothing more.
-------------------------------------------------------------------------------------------------------------------------------------------

const callYourFunction = (req) => {
    try{

            [ ALL YOUR BUSINESS LOGIC ]
    }
    catch(err){
        logger.error(`callYourFunction -> ${err.message}`) // This helps to know at which function error happend.
        ExceptionResolver(err, null);
    }
}

## 3. Always throw ONLY Custom Exceptions check exceptions.js which contains wide variety of Error Classes
----------------------------------------------------------------------------------------------------------

const callYourFunction = (req) => {
    try{

            [ ALL YOUR BUSINESS LOGIC ]
            throw new NotFound(`YOUR CUSTOM MESSAGE`);
    }
    catch(err){
        logger.error(`callYourFunction -> ${err.message}`)
        ExceptionResolver(err, null);
    }
}

## 4. Handling custom thrown errors and system generated errors
-----------------------------------------------------------------------------------------------------------

const callYourFunction = (req) => {
    try{

            [ ALL YOUR BUSINESS LOGIC ]
            [ SYSTEM GENERATED ERRORS ]
    }
    catch(err){
        logger.error(`callYourFunction -> ${err.message}`)
        ExceptionResolver(err, 'YOUR PERSONAL MESSAGE');

        // ExceptionResolver takes care of system errors ( OR ELSE )
        // Provision given to send a personal message also.
    }
}

## 5. HAPPY CODIING