const jsonServer = require('json-server');
const clone = require('clone');
const data = require('../db.json');

const server = jsonServer.create();
const router = jsonServer.router(clone(data), { _isFake: true });

server.use((req, res, next) => {
  if (req.path === '/') return next()
  router.db.setState(clone(data))
  next()
});

server.use(jsonServer.defaults({
  logger: process.env.NODE_ENV !== 'production'
}));

server.use(router);

module.exports = server;