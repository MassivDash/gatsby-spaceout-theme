/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react';

interface GridLayoutProviderProps {
  children: React.ReactChild;
}

export const GridLayoutContext = createContext({
  gridLayout: 'tiles',
  hasSetGridLayout: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setGridLayout: (tile: string) => {},
  getGridLayout: () => {},
});

function GridLayoutProvider({ children }: GridLayoutProviderProps) {
  const initialLayout = 'rows';

  const [gridLayout, setGridLayout] = useState<string>(initialLayout);
  const [hasSetGridLayout, setHasSetGridLayout] = useState<boolean>(false);

  function setGridLayoutAndSave(tile: string) {
    localStorage.setItem('gridLayout', tile || initialLayout);
    setGridLayout(tile);
  }

  function getGridLayoutAndSave() {
    setGridLayout(localStorage.getItem('gridLayout') || initialLayout);
    setHasSetGridLayout(true);
  }

  return (
    <GridLayoutContext.Provider
      value={{
        gridLayout,
        hasSetGridLayout,
        setGridLayout: setGridLayoutAndSave,
        getGridLayout: getGridLayoutAndSave,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
}

export default GridLayoutProvider;
