const { Transfer } = require('../models/transfer.models');
const { User } = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res) => {
  // primero obtenemos los datos del res.body body;
  const { numbercreate } = req;
  const { name, password } = req.body;
  // ahora vamos  a crear  la cuenta de  6 digitos

  // ahora creamos el usuario
  const newUser = await User.create({
    name: name.toLowerCase(),
    accountNumber: numbercreate,
    password: password.toLowerCase(),
  });

  // enviamos la respuesta al usuario
  res.status(201).json({
    status: 'success',
    message: 'User was created',
    newUser,
  });
});
exports.loginUser = catchAsync(async (req, res) => {
  // primero obtenemos los datos del res.body
  const { accountNumber, password } = req.body;

  const login = await User.findOne({
    where: {
      accountNumber,
      password,
      status: true,
    },
  });

  if (!login.accountNumber || !login.password) {
    return res.status(200).json({
      status: 'error',
      message: 'invalid user or  password ',
    });
  }

  // enviamos la respuesta al usuario
  res.status(201).json({
    status: 'success',
    message: 'User was found',
    login,
  });
});

exports.getUserTransfers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const allTransfers = await Transfer.findAll({
    where: {
      senderUserId: id,
      // || receiverUserId: id
    },
  });

  // enviamos la respuesta al usuario
  res.status(201).json({
    status: 'success',
    message: 'User was created',
    allTransfers,
  });
});
