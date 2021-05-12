const axios = require('axios');
const batchInterceptor = require('./interceptor');

const client = () => {
  const config = {
    baseURL: 'https://europe-west1-quickstart-1573558070219.cloudfunctions.net',
  };

  const instance = axios.create(config);
  batchInterceptor(instance);
  return instance;
};

module.exports = client();
