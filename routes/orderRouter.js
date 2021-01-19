const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Orders = require('../models/orders');
const orderRouter = express.Router();

orderRouter.use(bodyParser.json());

orderRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    console.log(req.query);
    Orders.find(req.query)
    .populate('customer')
    .populate('seller')
    .populate('ordFlower')
    .then((orders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Orders.create(req.body)
    .then((order) => {
        Orders.findById(order.id)
        .populate('customer')
        .populate('seller')
        .then((order) => {
            console.log("Order created", order);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(order);
        })
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /orders');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Orders.deleteMany({})
    .then((resp) => {
        console.log ("Deleted all orders");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

orderRouter.route('/:orderId')
.get(cors.corsWithOptions, (req,res,next) => {
    Orders.findById(req.params.orderId)
    .populate('customer')
    .populate('seller')
    .populate('ordFlower')
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /orders/'+ req.params.orderId);
})
.put(cors.corsWithOptions, (req, res, next) => {
    Orders.findByIdAndUpdate(req.params.orderId, {
        $set: req.body
    }, { new: true })
    .then((order) => {
        Orders.findById(order._id)
        .populate('customer')
        .populate('seller')
        .populate('ordFlower')
        .then((order) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(order);
        })
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Orders.findByIdAndRemove(req.params.orderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = orderRouter;

