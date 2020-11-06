const express = require('express');
const bodyParser = require('body-parser');

const flowerRouter = express.Router();

flowerRouter.unsubscribe(bodyParser.json());

flowerRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the flowers to you!');
})
.post((req, res, next) => {
 res.end('Will add the flower: ' + req.body.fname + ' with variety: ' + req.body.fvariety);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /flowers');
})
.delete((req, res, next) => {
    res.end('Deleting all flowers');
});

flowerRouter.route('/:flowerId')
.get((req,res,next) => {
    res.end('Will send details of the flower: ' + req.params.flowerId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /flowers/'+ req.params.flowerId);
})
.put((req, res, next) => {
  res.write('Updating the flower: ' + req.params.flowerId + '\n');
  res.end('Will update the flower: ' + req.body.fname + 
        ' with details: ' + req.body.fvariety);
})
.delete((req, res, next) => {
    res.end('Deleting flower: ' + req.params.flowerId);
});

module.exports = flowerRouter;
