const express = require('express');
const asyncValidateToken = require('../middleware/validateTokenHandler');
const multer = require('multer');
const { exampleControllerExample } = require('../controllers/exampleController');
const upload = multer();


const exampleRouter = express.Router();

    exampleRouter.route("/test").get(exampleControllerExample);
    // exampleRouter.route("test1").get(asyncValidateToken, exampleControllerExample);
    // exampleRouter.route("test2").get(asyncValidateToken, upload.single('file'), exampleControllerExample);
    // exampleRouter.route("test3").get(asyncValidateToken, upload.array('files'), exampleControllerExample);

module.exports = exampleRouter;