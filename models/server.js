const express = require('express');
const { db } = require('../database/db');
const { transfersRouter } = require('../Routes/transfers.routes');
const { usersRouter } = require('../Routes/users.routes');
const cors = require('cors');
const morgan = require('morgan');

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
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  Route() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.transfers, transfersRouter);
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
