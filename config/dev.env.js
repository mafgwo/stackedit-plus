var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 以下配置是开发临时用的配置 随时可能失效 请替换为自己的
  GITHUB_CLIENT_ID: '"845b8f75df48f2ee0563"',
  GITHUB_CLIENT_SECRET: '"80df676597abded1450926861965cc3f9bead6a0"',
  GITEE_CLIENT_ID: '"925ba7c78b85dec984f7877e4aca5cab10ae333c6d68e761bdb0b9dfb8f55672"',
  GITEE_CLIENT_SECRET: '"f05731066e42d307339dc8ebbb037a103881dafc7207a359a393b87749f1c562"',
  GITEE_CALLBACK: '"http://test.local.com/oauth2/callback"'
})