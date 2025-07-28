import { useRef } from "react";
import search_icon from "@/assets/search.png";

const SearchBar = ({ search }) => {
  const inputRef = useRef(null);

  return (
    <div className="search-bar flex items-center gap-3 w-full max-w-md mx-auto px-4 sm:max-w-lg md:max-w-xl">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        aria-label="Search city or location"
        className="flex-grow h-10 sm:h-12 border-none outline-none rounded-[40px] pl-4 sm:pl-6 text-base sm:text-lg bg-input"
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
        className="w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-4 rounded-full bg-input cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
