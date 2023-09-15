const router = require('express').Router();
const CustomersController = require('../controllers/customers');
const IndexController = require('../controllers/index');

//rotas
router.get('/', IndexController.index);

router.get('/register', CustomersController.index);

router.post('/register/add', CustomersController.add);

router.get('/list', CustomersController.listUser);

module.exports = router