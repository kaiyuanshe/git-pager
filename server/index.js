const Koa = require('koa'),
  mount = require('koa-mount'),
  Logger = require('koa-logger'),
  Static = require('koa-static'),
  LC = require('leanengine');

const controller = require('./controller');

const server = new Koa();

var [root = './public', port = 8080] = process.argv.slice(2);

port = isNaN(port) ? process.env[port] : port;

LC.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

server.proxy = true;

server
  .use(Logger())
  .use(LC.koa2())
  .use(LC.Cloud.HttpsRedirect({ framework: 'koa2' }))
  .use(mount(controller))
  .use(Static(root));

server.listen(port, function() {
  console.log('Serve at http://localhost:' + this.address().port);
});
