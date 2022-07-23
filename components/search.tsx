import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ search, setSearch }: Props) => {
  return (
    <div className="flex w-fit pl-2 outline outline-1 rounded-lg overflow-hidden">
      <AiOutlineSearch className="w-6 h-6 my-auto mr-1" />
      <input
        className="w-80 p-2 outline-none"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
};

export default Search;
