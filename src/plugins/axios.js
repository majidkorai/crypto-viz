import axios from 'axios';
import _cloneDeep from 'lodash/cloneDeep';

export const { CancelToken, all } = axios;

/**
 * setup axios common setting
 */
const axiosInstance = axios.create({
  useXDomain: true,
});

const { common } = axiosInstance.defaults.headers;

export const axiosCommonHeaders = _cloneDeep(common);

const customHeaders = {
  Accept: 'application/json, text/javascript',
  'Content-Type': 'application/json; charset=UTF-8',
};

delete common['X-Requested-With'];

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common = {
  ...common,
  ...customHeaders,
};

export default axiosInstance;
