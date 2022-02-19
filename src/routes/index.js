var express = require('express');
var router = express.Router();

const controller = require('../controllers/mainController');

router.get('/', controller.index);
router.post('/', controller.store);

module.exports = router;
