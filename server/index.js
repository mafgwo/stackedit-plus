const compression = require('compression');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const path = require('path');
const user = require('./user');
const github = require('./github');
const gitee = require('./gitee');
const gitea = require('./gitea');
const gitlab = require('./gitlab');
const pdf = require('./pdf');
const pandoc = require('./pandoc');
const conf = require('./conf');

const resolvePath = pathToResolve => path.join(__dirname, '..', pathToResolve);

module.exports = (app) => {
  if (process.env.NODE_ENV === 'production') {
    // Enable CORS for fonts
    app.all('*', (req, res, next) => {
      if (/\.(eot|ttf|woff2?|svg)$/.test(req.url)) {
        res.header('Access-Control-Allow-Origin', '*');
      }
      next();
    });

    // Use gzip compression
    app.use(compression());
  }

  app.get('/oauth2/githubToken', github.githubToken);
  app.get('/oauth2/giteeToken', gitee.giteeToken);
  app.get('/oauth2/giteaToken', gitea.giteaToken);
  app.get('/oauth2/gitlabToken', gitlab.gitlabToken);
  app.get('/conf', (req, res) => res.send(conf.publicValues));
  app.get('/userInfo', user.userInfo);
  app.get('/githubUser', (req, res) => user.getGitHubUser(req.query.idToken).then(body => res.send(JSON.stringify(body))));
  app.post('/pdfExport', pdf.generate);
  app.post('/pandocExport', pandoc.generate);
  app.post('/paypalIpn', bodyParser.urlencoded({
    extended: false,
  }), user.paypalIpn);

  app.get('/giteeClientId', (req, res) => {
    const giteeClientIds = conf.values.giteeClientId.split(',');
    // 仅一个 则直接返回
    if (giteeClientIds.length === 1) {
      res.send(giteeClientIds[0]);
      return;
    }
    // 是否随机一个clientId 默认第一个 如果random 为1 则使用随机 避免单个应用接口次数用满无法自动切换其他应用
    const random = req.query.random;
    if (!random) {
      res.send(giteeClientIds[0]);
      return;
    }
    // 随机一个 排除第一个 因为第一个应用接口次数用完了
    const clientId = giteeClientIds[Math.floor(((giteeClientIds.length - 1) * Math.random())) + 1];
    res.send(clientId);
  });
  // Serve landing.html
  app.get('/', (req, res) => res.sendFile(resolvePath('static/landing/index.html')));
  // Serve privacy_policy.html
  app.get('/privacy_policy.html', (req, res) => res.sendFile(resolvePath('static/landing/privacy_policy.html')));
  // Serve sitemap.xml
  app.get('/sitemap.xml', (req, res) => res.sendFile(resolvePath('static/sitemap.xml')));
  // Serve callback.html
  app.get('/oauth2/callback', (req, res) => res.sendFile(resolvePath('static/oauth2/callback.html')));
  // Google Drive action receiver
  app.get('/googleDriveAction', (req, res) =>
    res.redirect(`./app#providerId=googleDrive&state=${encodeURIComponent(req.query.state)}`));
  // Serve the static folder with 30 day max-age
  app.use('/themes', serveStatic(resolvePath('static/themes'), {
    maxAge: '1d',
  }));

  // Serve style.css with 1 day max-age
  app.get('/style.css', (req, res) => res.sendFile(resolvePath('dist/style.css'), {
    maxAge: '1d',
  }));
  // Serve share.html
  app.get('/share.html', (req, res) => res.sendFile(resolvePath('static/landing/share.html')));

  // Serve static resources
  if (process.env.NODE_ENV === 'production') {
    // Serve index.html in /app
    app.get('/app', (req, res) => res.sendFile(resolvePath('dist/index.html')));

    // Serve the static folder with 1 year max-age
    app.use('/static', serveStatic(resolvePath('dist/static'), {
      maxAge: '1y',
    }));

    app.use(serveStatic(resolvePath('dist')));
  }
};
