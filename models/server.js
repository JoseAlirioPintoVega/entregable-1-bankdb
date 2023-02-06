const express = require('express');
const { db } = require('../database/db');
const { transfersRouter } = require('../Routes/transfers.routes');
const { usersRouter } = require('../Routes/users.routes');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('../controllers/error.controler');
const AppError = require('../utils/appError');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };
    this.database();
    this.middlewares();
    this.Route();
  }
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('HOLA ESTOY EN DESARROLLO');
    }
    if (process.env.NODE_ENV === 'production') {
      console.log('HOLA ESTOY EN PRODUCCIÓN');
    }

    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  Route() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.transfers, transfersRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));
    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server us running on port`, this.port);
    });
  }
}
module.exports = Server;
