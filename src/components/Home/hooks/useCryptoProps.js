import { useMapStoreStateToClientState } from "./useMapStoreStateToClientState";

export default function useCryptoProps(store) {
  return useMapStoreStateToClientState(store, store => ({
    isFetchingData: store.cryptoListing.isLoading
  }));
}
