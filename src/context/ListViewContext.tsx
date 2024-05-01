'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export type ListViewContextType = {
  isListView: boolean;
  setIsListView: Dispatch<SetStateAction<boolean>>;
};

export const ListViewContext = createContext(
  null as unknown as ListViewContextType
);

export function ListViewProvider({ children }: { children: ReactNode }) {
  const [isListView, setIsListView] = useState(false);

  const value = useMemo(
    () => ({ isListView, setIsListView }),
    [isListView, setIsListView]
  );

  return (
    <ListViewContext.Provider value={value}>
      {children}
    </ListViewContext.Provider>
  );
}

export function useListView() {
  return useContext(ListViewContext);
}
