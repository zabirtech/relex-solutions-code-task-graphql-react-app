import React, { useRef, useEffect } from "react";
import "./SearchBar.css";
import { debounce } from "../utils/debounce";

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

  const debouncedSetQuery = useRef(debounce(setQuery, 150)).current;

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search for anime..."
      value={query}
      onChange={(e) => debouncedSetQuery(e.target.value)}
      className="search-bar-input"
    />
  );
}

export default SearchBar;
