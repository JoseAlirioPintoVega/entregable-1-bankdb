const { Transfers } = require('../models/transfer.models');
const { User } = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');

exports.verifyReceiverAccountNumber = catchAsync(async (req, res, next) => {
  const { accountNumber } = req.body;

  const userReceiver = await User.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });

  if (!userReceiver) {
    return res.status(404).json({
      status: 'error',
      message: 'The  account receiver was not found',
    });
  }

  req.userReceiver = userReceiver;
  next();
});

exports.verifySenderUserId = catchAsync(async (req, res, next) => {
  const { senderUserId } = req.body;

  const userSender = await User.findOne({
    where: {
      id: senderUserId,
      status: true,
    },
  });

  if (!userSender) {
    return res.status(404).json({
      status: 'error',
      message: 'The  sender user was not found',
    });
  }

  req.userSender = userSender;
  next();
});
