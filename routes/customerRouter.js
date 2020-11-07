const express = require('express');
const bodyParser = require('body-parser');

const customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the customers to you!');
})
.post((req, res, next) => {
 res.end('Will add the customer: ' + req.body.lastname + ', ' + req.body.firstname);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /customers');
})
.delete((req, res, next) => {
    res.end('Deleting all customers');
});

customerRouter.route('/:customerId')
.get((req,res,next) => {
    res.end('Will send details of the customer: ' + req.params.customerId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /customers/'+ req.params.customerId);
})
.put((req, res, next) => {
  res.end('Updating customer ' + req.params.customerId + ': ' + req.body.lastname + ', ' +req.body.firstname);
})
.delete((req, res, next) => {
    res.end('Deleting customer: ' + req.params.customerId);
});

module.exports = customerRouter;