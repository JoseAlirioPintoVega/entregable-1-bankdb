const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  loginUser,
  getUserTransfers,
} = require('../controllers/users.controllers');
const { accountNumbercreate } = require('../middlewares/users.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');
const router = Router();

router.post(
  '/signup',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    check('password', 'The password need only 4 caracters').isLength({
      min: 4,
      max: 4,
    }),
  ],
  validateFields,
  accountNumbercreate,
  createUser
);

router.post('/login', loginUser);

router.get('/:id/history', getUserTransfers);

module.exports = {
  usersRouter: router,
};
