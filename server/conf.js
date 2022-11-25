const pandocPath = process.env.PANDOC_PATH || 'pandoc';
const wkhtmltopdfPath = process.env.WKHTMLTOPDF_PATH || 'wkhtmltopdf';
const paypalReceiverEmail = process.env.PAYPAL_RECEIVER_EMAIL;

const dropboxAppKey = process.env.DROPBOX_APP_KEY;
const dropboxAppKeyFull = process.env.DROPBOX_APP_KEY_FULL;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const giteeClientId = process.env.GITEE_CLIENT_ID;
const giteeClientSecret = process.env.GITEE_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleApiKey = process.env.GOOGLE_API_KEY;
const wordpressClientId = process.env.WORDPRESS_CLIENT_ID;
const giteaClientId = process.env.GITEA_CLIENT_ID;
const giteaClientSecret = process.env.GITEA_CLIENT_SECRET;
const giteaUrl = process.env.GITEA_URL;

exports.values = {
  pandocPath,
  wkhtmltopdfPath,
  paypalReceiverEmail,
  dropboxAppKey,
  dropboxAppKeyFull,
  githubClientId,
  githubClientSecret,
  giteeClientId,
  giteeClientSecret,
  googleClientId,
  googleApiKey,
  wordpressClientId,
  giteaClientId,
  giteaClientSecret,
  giteaUrl,
};

exports.publicValues = {
  dropboxAppKey,
  dropboxAppKeyFull,
  githubClientId,
  googleClientId,
  googleApiKey,
  wordpressClientId,
  allowSponsorship: !!paypalReceiverEmail,
  giteaClientId,
  giteaUrl,
};
