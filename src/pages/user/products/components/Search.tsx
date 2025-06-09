import React from "react";
import { FaSearch } from "react-icons/fa";
import { useQueryState } from "nuqs";

const Search = () => {
  const [search, setSearch] = useQueryState("search");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full sm:px-6 mt-6 sm:mt-8 lg:mt-10">
      <div className="relative w-full">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Product by name"
          value={search || ""}
          onChange={handleSearch}
          className="w-full p-2 pl-10 bg-red-50 rounded-full focus:outline-none
                     text-sm sm:text-base md:p-3 md:pl-12"
        />
      </div>
    </div>
  );
};

export default React.memo(Search);
