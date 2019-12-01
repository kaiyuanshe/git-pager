const Koa = require('koa'),
  { get } = require('koa-route');

const GitHub = require('./OAuth/GitHub');

const { GITHUB_APP_ID, GITHUB_APP_KEY, SAFE_DOMAINS = '' } = process.env;

module.exports = new Koa()
  .use(
    get(
      '/OAuth/GitHub',
      GitHub.signIn(GITHUB_APP_ID, GITHUB_APP_KEY, SAFE_DOMAINS.split(','))
    )
  )
  .use(GitHub.checkAuth(GITHUB_APP_ID));
