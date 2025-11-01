import { Search } from "lucide-react";
import React from "react"

const SearchBar = () => {
  return (
    <div className="hidden sm:flex items-center gap-2 bg-white/6 rounded-lg px-3 py-1 backdrop-blur">
      <Search size={16} className="text-white/70" />
      <input
        type="search"
        placeholder="Search posts..."
        className="bg-transparent placeholder-white/60 text-white text-sm outline-none"
      />
    </div>
  );
};

export default SearchBar