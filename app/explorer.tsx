"use client";

import { Character } from "rickmortyapi";
import { FilterPanel } from "./components/filter-panel/filter-panel";
import { InfiniteScroll } from "./components/infinite-scroll";
import { Search } from "./components/search/search";

export const Explorer: React.FC<{
  name: string;
  initialData: Character[];
}> = ({ initialData, name }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <FilterPanel />
      </div>
      <div className="col-span-2">
        <Search />
        <InfiniteScroll initialData={initialData} initialSearchName={name} />
      </div>
    </>
  );
};
