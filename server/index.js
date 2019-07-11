const Koa = require('koa'),
  mount = require('koa-mount'),
  Logger = require('koa-logger'),
  Static = require('koa-static');

const controller = require('./controller');

const server = new Koa();

var [root = './public', port = 8080] = process.argv.slice(2);

port = isNaN(port) ? process.env[port] : port;

server
  .use(Logger())
  .use(mount(controller))
  .use(Static(root));

server.listen(port, function() {
  console.log('Serve at http://localhost:' + this.address().port);
});
