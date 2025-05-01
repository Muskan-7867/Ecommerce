import React from "react";
import { FaSearch } from "react-icons/fa";
import { useQueryState } from "nuqs";

const Search = () => {
  const [search, setSearch] = useQueryState("search");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearch(e.target.value)
  };

  return (
    <div className=" lg:mt-12 mt-8 lg:ml-8 ml-2">
      <div className="relative w-[90vw]">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search item by name"
          value={search || ''}
          onChange={handleSearch}
          className="w-full p-2 pl-10 bg-red-50 rounded-full focus:outline-none"
        />
      </div>
    </div>
  );
};

export default React.memo(Search);
