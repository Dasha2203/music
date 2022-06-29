const Router = require('express');
const {check} = require('express-validator');

const controller = require('./authController');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

const router = new Router();

router.get('/users', roleMiddleware([1]), controller.getUsers);
router.get('/favorites', controller.getFavorites);
router.get('/user', controller.getUser);
router.get('/history', controller.getHistory);

router.post('' +
    '/registration',
    [
        check('userName', 'Имя пользователя не может быть пустым').notEmpty(),
        check('password', 'Пароль должен быть длиной не более 8 символов').isLength({min: 3, max: 8})
    ],
    controller.registration)
router.post('/login', controller.login)
router.post('/editUser', controller.editUser)
router.post('/removeFavorite', controller.removeTrackFavorites)
router.post('/addFavorite', controller.addTrackFavorites)
router.post('/addHistory', controller.setHistory)

module.exports = router