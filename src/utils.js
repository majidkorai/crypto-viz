import _map from 'lodash/map';
import _flatMap from 'lodash/flatMap';

export function constructParams({ url, routeParams = {}, queryParams = {} }) {
  let newUrl = url;
  Object.keys(routeParams).forEach((key) => {
    newUrl = newUrl.replace(`#${key}#`, routeParams[key]);
  });
  const paramsArray = _flatMap(queryParams, (val, key) => (
    Array.isArray(val)
      ? _map(val, (index, value) => `${key}=${value}`)
      : `${key}=${val}`
  ));
  return paramsArray.length
    ? `${newUrl}?${paramsArray.join('&')}`
    : newUrl;
}
