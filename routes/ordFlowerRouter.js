const express = require('express')
const bodyParser = require('body-parser');
const cors = require('./cors');

const OrdFlowers = require('../models/ordFlowers');
const ordFlowerRouter = express.Router();

ordFlowerRouter.use(bodyParser.json());

ordFlowerRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    console.log(req.query);
    OrdFlowers.find(req.query)
    .then((ordFlowers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ordFlowers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    OrdFlowers.create(req.body)
    .then((ordFlower) => {
        console.log("OrdFlower created", ordFlower);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ordFlower);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /ordFlowers');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    OrdFlowers.deleteMany({})
    .then((resp) => {
        console.log ("Deleted all ordFlowers");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

ordFlowerRouter.route('/:ordFlowerId')
.get(cors.corsWithOptions, (req,res,next) => {
    OrdFlowers.findById(req.params.ordFlowerId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /ordFlowers/'+ req.params.ordFlowerId);
})
.put(cors.corsWithOptions, (req, res, next) => {
    OrdFlowers.findByIdAndUpdate(req.params.ordFlowerId, {
        $set: req.body
    }, { new: true })
    .then((ordFlower) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ordFlower);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    OrdFlowers.findByIdAndRemove(req.params.ordFlowerId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = ordFlowerRouter;

