const express = require('express')
const bodyParser = require('body-parser');

const Prices = require('../models/prices');
const priceRouter = express.Router();

priceRouter.use(bodyParser.json());

priceRouter.route('/')
.get((req,res,next) => {
    console.log(req.query);
    Prices.find(req.query)
    .then((prices) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(prices);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Prices.create(req.body)
    .then((price) => {
        console.log("Price created", price);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(price);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /prices');
})
.delete((req, res, next) => {
    Prices.deleteMany({})
    .then((resp) => {
        console.log ("Deleted all prices");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

priceRouter.route('/:priceId')
.get((req,res,next) => {
    Prices.findById(req.params.priceId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /prices/'+ req.params.priceId);
})
.put((req, res, next) => {
    Prices.findByIdAndUpdate(req.params.priceId, {
        $set: req.body
    }, { new: true })
    .then((price) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(price);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Prices.findByIdAndRemove(req.params.priceId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = priceRouter;

