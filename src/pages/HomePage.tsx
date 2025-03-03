import React, { useState, useContext, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useSearch } from "../hooks/useSearch";
import { TransparentContext } from "../context/TransparentContext";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearch(query);
  const { resetToggled } = useContext(TransparentContext)!;
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleReset = () => {
    setQuery("");
    resetToggled();
    navigate("/");
  };

  return (
    <div className="home-page">
      <SearchBar query={query} setQuery={setQuery} inputRef={inputRef} />
      <button onClick={handleReset} className="reset-button">
        Reset
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {results && results.length > 0 && (
        <SearchResults items={results} loading={loading} />
      )}
    </div>
  );
}

export default HomePage;
