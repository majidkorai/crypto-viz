import axios, { CancelToken, all, axiosCommonHeaders } from "../plugins/axios";

/**
 * Http Service
 */
export class HttpService {
  /**
   * constructor
   */
  constructor() {
    this.pendingRequests = {};
    this.formatEndpoint = endpoint => endpoint;
  }

  /**
   * cancel pending requests
   *
   * @param {string} requestId
   */
  cancelPendingRequest(requestId) {
    if (requestId in this.pendingRequests) {
      this.pendingRequests[requestId]();
      delete this.pendingRequests[requestId];
    }
  }

  /**
   * cancel all pending requests
   */
  cancelAllPendingRequests() {
    Object.keys(this.pendingRequests).forEach(requestId => {
      this.cancelPendingRequest(requestId);
    });
  }

  /**
   * get request payload
   *
   * @param {string} method
   * @param params axios params
   * @return {Object} request payload
   */
  getRequestPayload(method, ...params) {
    const [endpoint, config] = params;
    const url = this.formatEndpoint(endpoint);

    return {
      url,
      method,
      ...config
    };
  }

  /**
   * format base url
   *
   * @param {String} baseURL
   */
  static formatBaseUrl(baseURL) {
    axios.defaults.baseURL = baseURL;
  }

  /**
   * add headers
   *
   * @param {object} customHeaders
   */
  static addHeaders(customHeaders) {
    const { common } = axios.defaults.headers;

    axios.defaults.headers.common = {
      ...common,
      ...customHeaders
    };
  }

  /**
   * Override headers
   * @param customHeaders
   */
  static overrideHeaders(customHeaders) {
    axios.defaults.headers.common = { ...axiosCommonHeaders, ...customHeaders };
  }

  /**
   * remove headers
   *
   * @param {Array<string>} headersKeys
   */
  static removeHeaders(headersKeys) {
    headersKeys.forEach(key => {
      delete axios.defaults.headers.common[key];
    });
  }

  /**
   * add endpoint formatter
   *
   * @param {function} handler [takes `url` and returns `url`]
   */
  addEndpointFormatter({ handler }) {
    if (handler) {
      this.formatEndpoint = handler;
    }
  }

  /**
   * add interceptor
   *
   * @param {function} request [takes `requestConfig` and returns `requestConfig`]
   * @param {function} requestError [takes an `error` and returns an `error`]
   * @param {function} response [takes `response` and returns `response`]
   * @param {function} responseError [takes an `error` and returns an `error`]
   */
  static addInterceptor({ request, requestError, response, responseError }) {
    if (request) {
      axios.interceptors.request.use(request);
    }

    if (requestError) {
      axios.interceptors.request.use(
        req => req,
        error => {
          const err = requestError(error);
          return Promise.reject(err);
        }
      );
    }

    if (response) {
      axios.interceptors.response.use(response);
    }

    if (responseError) {
      axios.interceptors.response.use(
        res => res,
        error => {
          const err = responseError(error);
          return Promise.reject(err);
        }
      );
    }
  }

  /**
   * performing a request
   *
   * @param {string} method
   * @param {string} requestId
   * @param params axios params
   * @return {Promise}
   */
  request(method, requestId, ...params) {
    this.cancelPendingRequest(requestId);

    const payload = this.getRequestPayload(method, ...params);

    const requestConfig = {
      cancelToken: new CancelToken(canceller => {
        this.pendingRequests[requestId] = canceller;
      }),
      ...payload
    };

    const configObj = requestConfig;

    return axios.request(configObj);
  }

  /**
   * Performing a GET request
   *
   * @param {string} requestId
   * @param params axios params
   * @return {Promise}
   */
  get(requestId, ...params) {
    return this.request("get", requestId, ...params);
  }

  /**
   * Performing a POST request
   *
   * @param {string} requestId
   * @param params axios params
   * @return {Promise}
   */
  post(requestId, ...params) {
    return this.request("post", requestId, ...params);
  }

  /**
   * Performing a PUT request
   *
   * @param {string} requestId
   * @param params axios params
   * @return {Promise}
   */
  put(requestId, ...params) {
    return this.request("put", requestId, ...params);
  }

  /**
   * Performing a DELETE request
   *
   * @param {string} requestId
   * @param params axios params
   * @return {Promise}
   */
  delete(requestId, ...params) {
    return this.request("delete", requestId, ...params);
  }

  /**
   * Performing concurrent requests
   *
   * @param {Array} requests concurrent requests
   * @return {Promise}
   */
  static all(requests) {
    return all(requests);
  }
}

export const $http = new HttpService();
