const { Transfer } = require('../models/transfer.models');
const { User } = require('../models/user.models');

exports.createTranfers = async (req, res) => {
  try {
    // primero obtenemos los datos del res.body
    const { amount, senderUserId } = req.body;
    const { userReceiver, userSender } = req;

    if (userSender.amount < amount) {
      return res.status(404).json({
        status: 'error',
        message: 'The ammout in not enough',
      });
    }
    if (senderUserId == userReceiver.id) {
      return res.status(404).json({
        status: 'error',
        message: 'The user is the same',
      });
    }
    // ahora creamos el usuario

    const newAmmoutUserReceiver = await userReceiver.update({
      amount: userReceiver.amount + amount,
    });
    const newAmmoutUserSender = await userSender.update({
      amount: userSender.amount - amount,
    });
    const newtransfer = await Transfer.create({
      amount,
      senderUserId,
      receiverUserId: userReceiver.id,
    });

    // enviamos la respuesta al usuario
    res.status(201).json({
      status: 'success',
      message: 'User was created',
      newtransfer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
