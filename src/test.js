const apiClient = require('./apiClient');
// All requests should run at the same time and produce only one request
// to the backend. All requests should return or reject.
const runTest = async () => {
  const batchUrl = '/file-batch-api/api/files/batch';

  try {
    // eslint-disable-next-line no-console
    console.log('Should return [{id:”fileid1”},{id:”fileid2”}]');
    await apiClient.get(batchUrl, { params: { ids: ['fileid1', 'fileid2'] } });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  try {
    // eslint-disable-next-line no-console
    console.log('Should return [{id:”fileid2”}]');
    await apiClient.get(batchUrl, { params: { ids: ['fileid2'] } });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }

  try {
    // eslint-disable-next-line no-console
    console.log('Should reject as the fileid3 is missing from the response');
    await apiClient.get(batchUrl, { params: { ids: ['fileid3'] } });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};

module.exports = runTest;
