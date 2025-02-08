"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export const Search: React.FC = ({}) => {
  const [search, setSearch] = useState("");
  const { replace } = useRouter();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchBounce = setTimeout(() => {
      replace(`?name=${encodeURIComponent(search)}`);
    }, 300);

    return () => clearTimeout(searchBounce);
  }, [search, replace]);

  return (
    <div className="m-4 flex w-full flex-row items-center justify-center">
      <input
        onChange={handleChangeSearch}
        value={search}
        type="text"
        placeholder="Enter Character name"
        className="mt-2 w-[70%] rounded border border-r-2 border-black bg-slate-50 p-2 text-black"
      />
    </div>
  );
};
