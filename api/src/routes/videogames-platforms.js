const express = require('express');
const router = express.Router();

const platformsController = require('../controllers').platformsController;

router.get('/', platformsController.getPlatforms);

module.exports = router;