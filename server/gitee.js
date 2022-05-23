const qs = require('qs'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request');
const conf = require('./conf');

function giteeToken(clientId, code) {
  console.log('clientId: ' + clientId);
  console.log('code: ' + code);
  console.log('client_secret: ' + conf.values.giteeClientSecret);
  console.log('redirect_uri: ' + conf.values.giteeCallback);
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: 'https://gitee.com/oauth/token',
      form: {
        client_id: clientId,
        client_secret: conf.values.giteeClientSecret,
        code,
        grant_type: 'authorization_code',
        scope: 'authorization_code',
        redirect_uri: conf.values.giteeCallback,
      },
      json: true
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      const token = body.access_token;
      if (token) {
        resolve(token);
      } else {
        reject(res.statusCode + ',body:' + JSON.stringify(body));
      }
    });
  });
}

exports.giteeToken = (req, res) => {
  giteeToken(req.query.clientId, req.query.code)
    .then(
      token => res.send(token),
      err => res
        .status(400)
        .send(err ? err.message || err.toString() : 'bad_code'),
    );
};
