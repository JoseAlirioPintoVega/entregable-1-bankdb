const { Transfers } = require('../models/transfer.models');
const { User } = require('../models/user.models');

exports.verifyReceiverAccountNumber = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.verifySenderUserId = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
