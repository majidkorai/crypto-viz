import { useEffect, useState } from "react";
import { autorun } from "mobx";

/**
 * @param {store} store
 * @return {Object}
 */
export default function useCryptoListing(store) {
  const [state, setState] = useState({ cryptoListing: [] });

  useEffect(() => {
    console.log(store);
    store.cryptoListing.fetch({});
    return autorun(() => {
      setState({
        cryptoListing: store.cryptoListing.list
      });
    });
  }, []);

  return state;
}
