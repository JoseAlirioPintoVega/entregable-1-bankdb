const { Router } = require('express');
const { createTranfers } = require('../controllers/transfers.controllers');
const {
  verifyReceiverAccountNumber,
  verifySenderUserId,
} = require('../middlewares/transfers.middlewares');

const router = Router();

router.post(
  '/',
  verifyReceiverAccountNumber,
  verifySenderUserId,
  createTranfers
);
module.exports = {
  transfersRouter: router,
};
