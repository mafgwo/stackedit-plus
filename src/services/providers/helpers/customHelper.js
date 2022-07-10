import md5 from 'js-md5';
import networkSvc from '../../networkSvc';
import store from '../../../store';
import userSvc from '../../userSvc';
import badgeSvc from '../../badgeSvc';
import utils from '../../utils';

/**
 * 自定义账号前缀
 */
const subPrefix = 'cs';
export default {
  subPrefix,
  async addAccount({
    name,
    uploadUrl,
    fileParamName,
    customHeaders,
    customParams,
    resultUrlParam,
  }) {
    userSvc.addUserInfo({
      id: `${subPrefix}:${utils.encodeBase64(name)}`,
      name,
      imageUrl: '',
    });
    // Build token object including sub
    const token = {
      uploadUrl,
      fileParamName,
      customHeaders,
      customParams,
      resultUrlParam,
      name,
      sub: utils.encodeBase64(name),
    };
    // Add token to smms tokens
    store.dispatch('data/addCustomToken', token);
    badgeSvc.addBadge('addCustomAccount');
    return token;
  },
  async uploadFile({
    token,
    file,
  }) {
    const newFileName = `${md5(await utils.encodeFiletoBase64(file))}.${file.type.split('/')[1]}`;
    const newfile = new File([file], newFileName, { type: file.type });
    const headers = token.customHeaders || {};
    const formData = token.formData || {};
    formData[token.fileParamName] = newfile;
    const { body } = await networkSvc.request({
      method: 'POST',
      url: token.uploadUrl,
      headers,
      formData,
    });
    const paramArray = token.resultUrlParam.split('.');
    let result = body;
    paramArray.forEach((paramName) => {
      result = result[paramName];
      if (!result) {
        store.dispatch('notification/error', `自定义图床上传图片失败，响应Body为：${JSON.stringify(body)}`);
        throw new Error(`自定义图床上传图片失败，响应Body为：${JSON.stringify(body)}`);
      }
    });
    return result;
  },

};
