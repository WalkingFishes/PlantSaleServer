const express = require('express');
const bodyParser = require('body-parser');
// const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});


const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpwg|png|gif)$/)) {
        return cb(new Error('You can only upload image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
.get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
// .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
.post(cors.corsWithOptions, (req, res) => {
    // console.log(req);
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" });
    }
    const myFile = req.files.file;
    const cwd = __dirname;

    myFile.mv(`${__dirname}/../public/images/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.status(200).send({name: myFile.name, path: `/${myFile.name}`});
    });
})
// .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
// .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
.delete(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;


