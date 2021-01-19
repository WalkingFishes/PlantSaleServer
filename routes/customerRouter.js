const express = require('express')
const bodyParser = require('body-parser');
const cors = require('./cors');

const Customers = require('../models/customers');
const customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    console.log(req.query);
    Customers.find(req.query)
    .then((customers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Customers.create(req.body)
    .then((customer) => {
        console.log("Customer created", customer);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /customers');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Customers.deleteMany({})
    .then((resp) => {
        console.log ("Deleted all customers");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

customerRouter.route('/:customerId')
.get(cors.corsWithOptions, (req,res,next) => {
    Customers.findById(req.params.customerId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /customers/'+ req.params.customerId);
})
.put(cors.corsWithOptions, (req, res, next) => {
    Customers.findByIdAndUpdate(req.params.customerId, {
        $set: req.body
    }, { new: true })
    .then((customer) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Customers.findByIdAndRemove(req.params.customerId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = customerRouter;
