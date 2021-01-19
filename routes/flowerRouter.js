const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Flowers = require('../models/flowers');
const flowerRouter = express.Router();

flowerRouter.use(bodyParser.json());

flowerRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    console.log(req.query);
    Flowers.find(req.query)
    .populate('price')
    .then((flowers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(flowers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Flowers.create(req.body)
    .then((flower) => {
        Flowers.findById(flower._id)
        .populate('price')
        .then((flower) => {
            console.log("Flower created", flower);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(flower);
        })
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /flowers');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Flowers.deleteMany({})
    .then((resp) => {
        console.log ("Deleted all flowers");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

flowerRouter.route('/:flowerId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, (req,res,next) => {
    Flowers.findById(req.params.flowerId)
    .populate('price')
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /flowers/'+ req.params.flowerId);
})
.put(cors.corsWithOptions, (req, res, next) => {
    Flowers.findByIdAndUpdate(req.params.flowerId, {
        $set: req.body
    }, { new: true })
    .then((flower) => {
        Flowers.findById(flower._id)
        .populate('price')
        .then((flower) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(flower);
        })
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Flowers.findByIdAndRemove(req.params.flowerId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = flowerRouter;
