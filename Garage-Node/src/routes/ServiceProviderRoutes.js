const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controllers/ServiceProviderController');

router.post('/register', serviceProviderController.register);
router.get('/', serviceProviderController.getAllProviders);
// router.get('/:id', serviceProviderController.getProviderById);

module.exports = router;