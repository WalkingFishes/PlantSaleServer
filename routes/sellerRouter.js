const express = require('express');
const bodyParser = require('body-parser');

const sellerRouter = express.Router();

sellerRouter.use(bodyParser.json());

sellerRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the sellers to you!');
})
.post((req, res, next) => {
 res.end('Will add the seller: ' + req.body.lastname + ', ' + req.body.firstname);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /sellers');
})
.delete((req, res, next) => {
    res.end('Deleting all sellers');
});

sellerRouter.route('/:sellerId')
.get((req,res,next) => {
    res.end('Will send details of the seller: ' + req.params.sellerId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /sellers/'+ req.params.sellerId);
})
.put((req, res, next) => {
  res.end('Updating seller ' + req.params.sellerId + ': ' + req.body.lastname + ', ' +req.body.firstname);
})
.delete((req, res, next) => {
    res.end('Deleting seller: ' + req.params.sellerId);
});

module.exports = sellerRouter;
