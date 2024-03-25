const express  = require('express');
const router = express.Router();
const {addJobRole,getJobRoles,delJobRoles} = require('../Controllers/JobRoleController');

router.route('/:id').delete(delJobRoles)
router.route('/').post(addJobRole).get(getJobRoles);


module.exports = router;