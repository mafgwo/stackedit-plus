const request = require('request');
const qs = require('qs'); // eslint-disable-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const conf = require('./conf');

const s3Client = new AWS.S3();

const cb = (resolve, reject) => (err, res) => {
  if (err) {
    reject(err);
  } else {
    resolve(res);
  }
};

const getGitHubUser = (idToken) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(qs.parse(body));
    });
  });
}

exports.getUser = id => new Promise((resolve, reject) => {
  s3Client.getObject({
    Bucket: conf.values.userBucketName,
    Key: id,
  }, cb(resolve, reject));
})
  .then(
    res => JSON.parse(`${res.Body}`),
    (err) => {
      if (err.code !== 'NoSuchKey') {
        throw err;
      }
    },
  );

exports.putUser = (id, user) => new Promise((resolve, reject) => {
  s3Client.putObject({
    Bucket: conf.values.userBucketName,
    Key: id,
    Body: JSON.stringify(user),
  }, cb(resolve, reject));
});

exports.removeUser = id => new Promise((resolve, reject) => {
  s3Client.deleteObject({
    Bucket: conf.values.userBucketName,
    Key: id,
  }, cb(resolve, reject));
});

exports.getUserFromToken = idToken => getGitHubUser(idToken)
  .then(userInfo => exports.getUser(userInfo.login));

exports.userInfo = (req, res) => exports.getUserFromToken(req.query.idToken)
  .then(
    user => res.send(Object.assign({
      sponsorUntil: 0,
    }, user)),
    err => res
      .status(400)
      .send(err ? err.message || err.toString() : 'invalid_token'),
  );

exports.paypalIpn = (req, res, next) => Promise.resolve()
  .then(() => {
    const userId = req.body.custom;
    const paypalEmail = req.body.payer_email;
    const gross = parseFloat(req.body.mc_gross);
    let sponsorUntil;
    if (gross === 1.99) {
      sponsorUntil = Date.now() + (3 * 31 * 24 * 60 * 60 * 1000); // 3 months
    } else if (gross === 5.99) {
      sponsorUntil = Date.now() + (366 * 24 * 60 * 60 * 1000); // 1 year
    } else if (gross === 9.99) {
      sponsorUntil = Date.now() + (2 * 366 * 24 * 60 * 60 * 1000); // 2 years
    }
    if (
      req.body.receiver_email !== conf.values.paypalReceiverEmail ||
      req.body.payment_status !== 'Completed' ||
      req.body.mc_currency !== 'USD' ||
      (req.body.txn_type !== 'web_accept' && req.body.txn_type !== 'subscr_payment') ||
      !userId || !sponsorUntil
    ) {
      // Ignoring PayPal IPN
      return res.end();
    }
    // Processing PayPal IPN
    req.body.cmd = '_notify-validate';
    return new Promise((resolve, reject) => request.post({
      uri: conf.values.paypalUri,
      form: req.body,
    }, (err, response, body) => {
      if (err) {
        reject(err);
      } else if (body !== 'VERIFIED') {
        reject(new Error('PayPal IPN unverified'));
      } else {
        resolve();
      }
    }))
      .then(() => exports.putUser(userId, {
        paypalEmail,
        sponsorUntil,
      }))
      .then(() => res.end());
  })
  .catch(next);

exports.checkSponsor = (idToken) => {
  if (!conf.publicValues.allowSponsorship) {
    return Promise.resolve(true);
  }
  if (!idToken) {
    return Promise.resolve(false);
  }
  return exports.getUserFromToken(idToken)
    .then(userInfo => userInfo && userInfo.sponsorUntil > Date.now(), () => false);
};
