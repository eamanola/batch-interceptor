const batchInterceptor = (instance) => {
  instance.interceptors.request.use(
    (request) => {
      console.log('// Add your code here');
      return request;
    },
    (error) => Promise.reject(error),
  );
};

module.exports = batchInterceptor;
