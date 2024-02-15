const dotenv = require('dotenv');

const GET_SOMETHING = `SELECT * FROM tablename where id = $1`;

module.exports={
    GET_SOMETHING
}