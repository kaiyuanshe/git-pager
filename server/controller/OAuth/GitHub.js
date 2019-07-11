const { promisify } = require('util'),
  { extname } = require('path'),
  { URLSearchParams, URL } = require('url');

const isPrivateHost = promisify(require('hostname-is-private').isPrivate),
  fetch = require('node-fetch');

const HTML_Type = ['', '.htm', '.html'];

exports.checkAuth = client_id => async (context, next) => {
  const { hostname, URL } = context,
    token = context.query.token || context.cookies.get('token');

  if (token || !HTML_Type.includes(extname(URL.pathname))) return next();

  context.redirect(
    'https://github.com/login/oauth/authorize?' +
      new URLSearchParams({
        client_id,
        scope: 'user repo',
        state: (await isPrivateHost(hostname)) ? URL : ''
      })
  );
};

exports.signIn = (client_id, client_secret) => async context => {
  const { code, state } = context.query;

  const { error, access_token } = await (await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code
      })
    }
  )).json();

  if (error) throw URIError(error);

  context.cookies.set('token', access_token, { httpOnly: false });

  if (state)
    try {
      return context.redirect(new URL(state));
    } catch (error) {}

  context.redirect('/');
};
