const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose'); // Import mongoose
const dotenv = require("dotenv").config();
const app = express();
const cookieParser = require('cookie-parser');

const port = process.env.PORT;
const server = require('http').Server(app);
const logger = require('./src/utils/logger');
const mainRouter = require('./src/routes/mainRouter');
const morganMiddleware  = require('./src/middleware/morganMiddleware');


const { errorHandler, handle404 } = require('./src/middleware/errorHandler');

// Import connectDb from your connection file
const { connectDb } = require('./src/config/mongoConnection');

// Call connectDb to establish the database connection
connectDb();


server.listen(port, async () => {
    logger.info(`Server is running on port ${port}`);
});


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
const frontend = path.resolve(__dirname, '../build_customer');
app.use(morganMiddleware)
app.use(express.json());
app.use("/api", mainRouter);
app.use(errorHandler);
app.use(handle404);
app.use('*', express.static(frontend));