const Router = require('express');
const router = new Router();
const controller = require('./profileController');

router.post('/editUserName', controller.editUserName);

module.exports = router;