import { useRef } from "react";
import search_icon from "@/assets/search.png";

const SearchBar = ({ search }) => {
  const inputRef = useRef(null);

  return (
    <div className="search-bar flex items-center gap-3">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        aria-label="Search city or location"
        className="h-12 border-none outline-none rounded-[40px] pl-6 text-lg bg-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search(inputRef.current.value);
          }
        }}
      />
      <img
        src={search_icon}
        alt="Search icon"
        onClick={() => search(inputRef.current.value)}
        className="w-12 p-4 rounded-full bg-input cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
