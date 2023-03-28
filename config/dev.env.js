var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PAYPAL_RECEIVER_EMAIL: '"mafgwo@163.com"',
  // temp
  GITHUB_CLIENT_ID: '"845b8f75df48f2ee0563"',
  GITHUB_CLIENT_SECRET: '"80df676597abded1450926861965cc3f9bead6a0"',
  GITEE_CLIENT_ID: '"925ba7c78b85dec984f7877e4aca5cab10ae333c6d68e761bdb0b9dfb8f55672"',
  GITEE_CLIENT_SECRET: '"f05731066e42d307339dc8ebbb037a103881dafc7207a359a393b87749f1c562"',
  CLIENT_ID: '"thF3qCGLN39OtafjGnqHyj6n02WwE6xD"',
  // GITEA_CLIENT_ID: '"fe30f8f9-b1e8-4531-8f72-c1a5d3912805"',
  // GITEA_CLIENT_SECRET: '"lus7oMnb3H6M1hsChndphArE20Txr7erwJLf7SDBQWTw"',
  // GITEA_URL: '"https://gitea.test.com"',
  // GITLAB_CLIENT_ID: '"33e01128c27fe75df3e5b35218d710c7df280e6ee9c90b6ca27ac9d9fdfb92f7"',
  // GITLAB_URL: '"http://gitlab.qicoder.com"',
})