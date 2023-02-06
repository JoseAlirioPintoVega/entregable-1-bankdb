const { User } = require('../models/user.models');

exports.accountNumbercreate = async (req, res, next) => {
  const numbercreate = Math.trunc(Math.random() * 1111111);
  console.log(numbercreate);
  req.numbercreate = numbercreate;
  next();
};
