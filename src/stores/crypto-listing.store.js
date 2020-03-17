import { observable, computed, action, flow, decorate } from "mobx";
import { API_STATE } from "../constants";
import { CryptoListingClient } from "../clients/crypto-listing.client";
import cryptoListingFactory from "../factories/crypto-listing.factory";

class CryptoListing {
  data = {};
  API_STATE = API_STATE.INITIAL;

  get isLoading() {
    return this.API_STATE === API_STATE.LOADING;
  }

  get isFetched() {
    return this.API_STATE === API_STATE.SUCCESS;
  }

  get hasError() {
    return this.API_STATE === API_STATE.FAILED;
  }

  get list() {
    return cryptoListingFactory(this.data);
  }

  fetch = flow(function*({ filters, errorHandler = () => {} }) {
    this.API_STATE = API_STATE.LOADING;
    try {
      const response = yield CryptoListingClient.getCryptoListing(filters);
      this.onSuccess(response);
    } catch (error) {
      this.onError(error, errorHandler);
    }
  });

  onSuccess(data) {
    this.data = data;
    this.API_STATE = API_STATE.SUCCESS;
  }

  onError(error, errorHandler) {
    errorHandler(error);
    this.API_STATE = API_STATE.FAILED;
  }
}

decorate(CryptoListing, {
  data: observable,
  API_STATE: observable,
  list: computed,
  isLoading: computed,
  isFetched: computed,
  hasError: computed,
  fetch: action,
  onSuccess: action,
  onError: action
});

export default CryptoListing;
