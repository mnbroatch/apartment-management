"use strict;"

const express = require('express');

let router = express.Router();

router.use('/tenants', require('./tenants'));
router.use('/properties', require('./properties'));

module.exports = router;

