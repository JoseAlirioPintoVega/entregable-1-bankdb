const { Router } = require('express');
const {
  createUser,
  loginUser,
  getUserTransfers,
} = require('../controllers/users.controllers');
const router = Router();

router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/:id/history', getUserTransfers);

module.exports = {
  usersRouter: router,
};
