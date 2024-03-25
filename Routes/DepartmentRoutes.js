const express  = require('express');
const router = express.Router();
const {addDep,getDeps,delDeps} = require('../Controllers/DepartmentController');

router.route('/:id').delete(delDeps)
router.route('/').post(addDep).get(getDeps);


module.exports = router;