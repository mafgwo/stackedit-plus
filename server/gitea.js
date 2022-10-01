const qs = require('qs');
const request = require('request');
const conf = require('./conf');

function giteaToken(queryParam) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: `${conf.values.giteaUrl}/login/oauth/access_token`,
      headers: {
        'content-type': 'application/json',
      },
      json: true,
      body: {
        ...queryParam,
        client_id: conf.values.giteaClientId,
        client_secret: conf.values.giteaClientSecret,
      },
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      const token = body.access_token;
      if (token) {
        resolve(body);
      } else {
        reject(res.statusCode + ',body:' + JSON.stringify(body));
      }
    });
  });
}

exports.giteaToken = (req, res) => {
  giteaToken(req.query)
    .then(
      tokenBody => res.send(tokenBody),
      err => res
        .status(400)
        .send(err ? err.message || err.toString() : 'bad_code'),
    );
};
