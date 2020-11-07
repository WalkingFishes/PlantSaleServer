const express = require('express')
const bodyParser = require('body-parser');

const OrdFlowers = require('../models/ordFlowers');
const ordFlowerRouter = express.Router();

ordFlowerRouter.use(bodyParser.json());

ordFlowerRouter.route('/')
.get((req,res,next) => {
    console.log(req.query);
    OrdFlowers.find(req.query)
    .then((ordFlowers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ordFlowers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    OrdFlowers.create(req.body)
    .then((ordFlower) => {
        console.log("OrdFlower created", ordFlower);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ordFlower);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /ordFlowers');
})
.delete((req, res, next) => {
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
.get((req,res,next) => {
    OrdFlowers.findById(req.params.ordFlowerId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /ordFlowers/'+ req.params.ordFlowerId);
})
.put((req, res, next) => {
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
.delete((req, res, next) => {
    OrdFlowers.findByIdAndRemove(req.params.ordFlowerId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = ordFlowerRouter;

