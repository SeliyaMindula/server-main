const express  = require('express');
const router = express.Router();
const {getLogs,getLogsByDate} = require('../Controllers/LogController');

router.route('/log-filter').get(getLogsByDate);
router.route('/').get(getLogs);


module.exports = router;