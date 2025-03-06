import React, { useEffect } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

// SearchBar: Input component for entering search queries.
// Uses debouncing to manage input changes, reducing the number of API calls.
// Debouncing improves performance by limiting the frequency of function execution.

function SearchBar({ query, setQuery, inputRef }: SearchBarProps) {
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // removed debounceSetQuery since it was not needed the debounce was already in the setQuery function
  // and it was causing the search to not work as expected now you can type fast !

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search for anime..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-bar-input"
    />
  );
}

export default SearchBar;
