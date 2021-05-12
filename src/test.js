/* eslint no-console: "off" */

const apiClient = require('./apiClient');
// All requests should run at the same time and produce only one request
// to the backend. All requests should return or reject.

const runTest = () => {
  const batchUrl = '/file-batch-api/api/files/batch';

  apiClient.get(batchUrl, { params: { ids: ['fileid1', 'fileid2'] } })
    .then((response) => {
      console.log('Should return [{id:”fileid1”},{id:”fileid2”}]');
      console.log('response', response.data);
    })
    .catch(() => { console.log('rejected'); });

  apiClient.get(batchUrl, { params: { ids: ['fileid2'] } })
    .then((response) => {
      console.log('Should return [{id:”fileid2”}]');
      console.log('response', response.data);
    })
    .catch(() => { console.log('rejected'); });

  apiClient.get(batchUrl, { params: { ids: ['fileid3'] } })
    .then((response) => {
      console.log('response', response.data);
    })
    .catch(() => {
      console.log('Should reject as the fileid3 is missing from the response');
      console.log('rejected');
    });
};

module.exports = runTest;
