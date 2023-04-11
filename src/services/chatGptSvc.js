import store from '../store';

export default {
  chat(proxyHost, apiKey, content, callback) {
    const xhr = new XMLHttpRequest();
    const url = `${proxyHost || 'https://api.openai.com'}/v1/chat/completions`;
    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
      temperature: 1,
      stream: true,
    }));
    let lastRespLen = 0;
    xhr.onprogress = () => {
      const responseText = xhr.response.substr(lastRespLen);
      lastRespLen = xhr.response.length;
      responseText.split('\n\n')
        .filter(l => l.length > 0)
        .forEach((text) => {
          const item = text.substr(6);
          if (item === '[DONE]') {
            callback({ done: true });
          } else {
            const data = JSON.parse(item);
            callback({ content: data.choices[0].delta.content });
          }
        });
    };
    xhr.onerror = () => {
      store.dispatch('notification/error', 'ChatGPT request to API failed!');
      callback({ error: 'ChatGPT request to API failed!' });
    };
    return xhr;
  },
};
