const express  = require('express');
const router = express.Router();
const { getLog } = require('../MiddleWare/Logging');


router.route('/logs').get((req, res) => {
    // Use the getLog middleware here
    getLog((logs) => {
      res.json(logs);
    });
  });

module.exports=router