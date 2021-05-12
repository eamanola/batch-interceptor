const axios = require('axios');
const batchInterceptor = require('./interceptor');

const client = () => {
  const config = {
    host: 'https://europe-west1-quickstart-1573558070219.cloudfunctions.net',
    baseAPI: 'https://europe-west1-quickstart-1573558070219.cloudfunctions.net',
    baseURL: 'https://europe-west1-quickstart-1573558070219.cloudfunctions.net',
    headers: {},
  };

  const instance = axios.create(config);
  batchInterceptor(instance);
  return instance;
};

module.exports = client();
