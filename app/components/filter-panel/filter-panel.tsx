"use client";

import { ChangeEvent, useMemo } from "react";
import { useDataStore } from "../../store/index";

export const FilterPanel: React.FC = () => {
  const { filter: filterMap, setFilter, data, resetFilters } = useDataStore();

  const handleChangeGender = (gender: string) => {
    setFilter("gender", gender);
  };

  const handleChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter("type", e.target.value);
  };

  const handleChangeSpices = (e: ChangeEvent<HTMLSelectElement>) => {
    const spices = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFilter("species", spices);
  };

  const handleChangeFavorites = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter("favorites", e.target.checked);
  };

  const speciesOptions = useMemo(
    () =>
      data
        .map((char) => char.species)
        .reduce((species, curr) => {
          if (!species.includes(curr)) species.push(curr);
          return species;
        }, [] as Array<string>),
    [data],
  );

  return (
    <div className="mt-[100px] px-20">
      <p className="text-md mb-4 font-bold underline">Filter</p>
      <fieldset className="w-full border border-white p-4">
        <legend className="text-sm">Gender</legend>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="female"
              name="gender"
              className="accent-black"
              checked={filterMap["gender"] === "Female"}
              onChange={() => handleChangeGender("Female")}
            />
            <label className="capitalize" htmlFor="female">
              Female
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="male"
              name="gender"
              className="accent-black"
              checked={filterMap["gender"] === "Male"}
              onChange={() => handleChangeGender("Male")}
            />
            <label className="capitalize" htmlFor="male">
              Male
            </label>
          </div>
        </div>
      </fieldset>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Type"
          id="male"
          value={filterMap["type"]}
          name="gender"
          className="border border-white bg-inherit p-4 focus:outline-black"
          onChange={(e) => handleChangeType(e)}
        />
      </div>

      <div className="mt-6 flex flex-col items-start gap-4">
        <p className="font-bold">Species</p>
        <select
          multiple
          className="w-full border-spacing-4 border border-white bg-inherit text-white focus:outline-black"
          name="cars"
          value={filterMap["species"]}
          id="cars"
          onChange={handleChangeSpices}
        >
          {speciesOptions.map((specie, index) => (
            <option key={index} value={specie}>
              {specie}
            </option>
          ))}
        </select>
      </div>

      <div className="my-6 flex flex-row items-center gap-4 accent-black">
        <p>Favorites Only :</p>
        <input
          onChange={handleChangeFavorites}
          checked={filterMap["favorites"]}
          className="h-4 w-4"
          type="checkbox"
        />
      </div>

      <div className="flex flex-row">
        <button
          className="h-[40px] w-full border border-white bg-inherit"
          type="button"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
