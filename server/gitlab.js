const request = require('request');
const conf = require('./conf');

function gitlabToken(queryParam) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: `${conf.values.gitlabUrl}/oauth/token`,
      headers: {
        'content-type': 'application/json',
      },
      json: true,
      qs: {
        ...queryParam,
        client_id: conf.values.gitlabClientId,
        client_secret: conf.values.gitlabClientSecret,
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

exports.gitlabToken = (req, res) => {
  gitlabToken(req.query)
    .then(
      tokenBody => res.send(tokenBody),
      err => res
        .status(400)
        .send(err ? err.message || err.toString() : 'bad_code'),
    );
};
