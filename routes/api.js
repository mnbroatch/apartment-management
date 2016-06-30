"use strict;"

const express = require('express');

let router = express.Router();

router.use('/items', require('./items'));

module.exports = router;

