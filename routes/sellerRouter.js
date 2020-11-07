const express = require('express')
const bodyParser = require('body-parser');

const Sellers = require('../models/sellers');
const sellerRouter = express.Router();

sellerRouter.use(bodyParser.json());

sellerRouter.route('/')
.get((req,res,next) => {
    console.log(req.query);
    Sellers.find(req.query)
    .then((sellers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sellers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Sellers.create(req.body)
    .then((seller) => {
        console.log("Seller created", seller);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(seller);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /sellers');
})
.delete((req, res, next) => {
    Sellers.deleteMany({})
    .then((resp) => {
        console.log ("Deleted all sellers");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

sellerRouter.route('/:sellerId')
.get((req,res,next) => {
    Sellers.findById(req.params.sellerId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /sellers/'+ req.params.sellerId);
})
.put((req, res, next) => {
    Sellers.findByIdAndUpdate(req.params.sellerId, {
        $set: req.body
    }, { new: true })
    .then((seller) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(seller);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Sellers.findByIdAndRemove(req.params.sellerId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = sellerRouter;

