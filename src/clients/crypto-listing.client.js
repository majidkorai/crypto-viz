import { $http } from "../services/http.service";
import { ENDPOINTS, REQUEST_ID } from "../constants";
import { constructParams } from "../utils";

export const CryptoListingClient = {
  getCryptoListing(filters) {
    return $http
      .get(
        REQUEST_ID.CRYPTO_LISTING.GET,
        constructParams({
          url: ENDPOINTS.CRYPTO_LISTING.GET,
          queryParams: filters
        })
      )
      .then(({ data }) => data);
  }
};
