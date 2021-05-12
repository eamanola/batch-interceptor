const axios = require('axios');

const WAIT_FOR_REQUESTS_MS = 100;
const requests = []; // { config, resolve, reject }
let batchConfig;
let timeout = 0;

const sendResponses = ({
  data,
  status,
  statusText,
  headers,
}) => {
  requests.forEach(({ config, resolve, reject }) => {
    const responseData = data.items.filter((item) => (
      config.params.ids.includes(item.id)
    ));

    if (responseData.length > 0) {
      resolve({
        ...config,
        adapter: () => Promise.resolve({
          data: responseData,
          config,
          status,
          statusText,
          headers,
          request: null,
        }),
      });
    } else {
      reject(config);
    }
  });
};

const batchFetch = () => {
  const url = `${batchConfig.baseURL}${batchConfig.url}`;
  return axios.get(url, { params: batchConfig.params });
};

const updateBatchConfig = (config) => {
  if (!batchConfig) batchConfig = { ...config };

  batchConfig.params.ids = [
    ...new Set([...config.params.ids, ...batchConfig.params.ids]),
  ];
};

axios.interceptors.response.use((resp) => {
  // eslint-disable-next-line no-console
  console.log('Debug: Received server resonse');
  return resp;
});

const batchInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      if (config.url !== '/file-batch-api/api/files/batch') {
        return config;
      }

      if (timeout) clearTimeout(timeout);

      updateBatchConfig(config);

      return new Promise((resolve, reject) => {
        requests.push({ config, resolve, reject });

        timeout = setTimeout(() => {
          batchFetch()
            .then(sendResponses)
            // error handling here
            .catch((e) => { throw e; });
        }, WAIT_FOR_REQUESTS_MS);
      });
    },
    (error) => Promise.reject(error),
  );
};

module.exports = batchInterceptor;
