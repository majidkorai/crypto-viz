import { useEffect, useState } from 'react';
import { autorun } from 'mobx';

export function useMapStoreStateToClientState(store, storePropsSelectionFunc) {
  const [state, setState] = useState(storePropsSelectionFunc(store));

  useEffect(
    () =>
      autorun(() => {
        setState(storePropsSelectionFunc(store));
      }),
    []
  );

  return state;
}
