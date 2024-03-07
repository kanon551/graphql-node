
const mongoose = require('mongoose');


const connectDb = async () => {
        try{
            await mongoose.connect(`${process.env.MONGO_CONNECTION_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true`);
            console.log('Successfully connected to Database :', process.env.MONGO_DB);
        }
        catch(err){
            console.error('connection error', err.stack);
            // process.exit(1);
        }
};

module.exports = { connectDb };