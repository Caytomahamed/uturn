import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
function SharedState({ children }) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);

  const openFilterModel = () => setIsOpenFilter(true);
  const closeFilterModel = () => setIsOpenFilter(false);
  const openSortModel = () => setIsOpenSort(true);
  const closeSortModel = () => setIsOpenSort(false);
  return (
    <>
      {children({
        isOpenFilter,
        isOpenSort,
        openFilterModel,
        closeFilterModel,
        openSortModel,
        closeSortModel,
        // Other shared state and functions
      })}
    </>
  );
}

export default SharedState;
