const { Transfer } = require('../models/transfer.models');
const { User } = require('../models/user.models');

exports.createUser = async (req, res) => {
  try {
    // primero obtenemos los datos del res.body body;

    const { name, password } = req.body;
    // ahora vamos  a crear  la cuenta de  6 digitos
    const accountNumbercreate = Math.trunc(Math.random() * 1111111);
    console.log(accountNumbercreate);
    // ahora creamos el usuario
    const newUser = await User.create({
      name: name.toLowerCase(),
      accountNumber: accountNumbercreate,
      password: password.toLowerCase(),
    });

    // enviamos la respuesta al usuario
    res.status(201).json({
      status: 'success',
      message: 'User was created',
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.getUserTransfers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
