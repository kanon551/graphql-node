const { Pool } = require('pg');
const dotenv = require('dotenv');
const { InternalServerError } = require('../utils/exceptions');

dotenv.config();

const pool = new Pool({
    user: process.env.DEFAULT_USERNAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASS,
    port: process.env.DB_PORT,
  });


const connectDb = async (pool) => {
        try{
            await pool.connect();
            console.log('Successfully connected to Database :', pool.options.database);
        }
        catch(err){
            console.error('connection error', err.stack);
            // process.exit(1);
        }
};

connectDb(pool);
module.exports = { pool };