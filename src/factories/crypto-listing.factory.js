import _get from 'lodash/get';

export default function cryptoListingFactory(data) {
  return _get(data, 'data', []);
}
