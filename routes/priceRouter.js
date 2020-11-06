const express = require('express');
const bodyParser = require('body-parser');

const priceRouter = express.Router();

priceRouter.unsubscribe(bodyParser.json());

priceRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the prices to you!');
})
.post((req, res, next) => {
 res.end('Will add the price: ' + req.body.container + ' at retail ' + req.body.retail);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /prices');
})
.delete((req, res, next) => {
    res.end('Deleting all prices');
});

priceRouter.route('/:priceId')
.get((req,res,next) => {
    res.end('Will send details of the price: ' + req.params.priceId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /prices/'+ req.params.priceId);
})
.put((req, res, next) => {
  res.write('Updating the price: ' + req.params.priceId + '\n');
  res.end('Will update the price: ' + req.body.container + ' at retail ' + req.body.retail);
})
.delete((req, res, next) => {
    res.end('Deleting price: ' + req.params.priceId);
});

module.exports = priceRouter;

