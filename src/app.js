import http from 'http'
import _ from 'lodash'
import {env, mongo, port, ip, apiRoot} from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import City from './services/city/CityService'

const app = express(apiRoot, api);

const server = http.createServer(app);
const io = require('socket.io')(server);

mongoose.connect(mongo.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
});

io.on('connection', (socket) => {
  socket.on('getComment', city => {
    City.find(city)
      .then(city => {
        io.emit('commentReceived', {
          messages: _.get(_.first(city), 'messages', []),
          city: _.get(_.first(city), 'name', '')
        });
      })
      .catch(() => {
        io.emit('commentReceived', []);
      });
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

export default app
