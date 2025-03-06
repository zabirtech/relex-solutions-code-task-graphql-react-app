import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { TransparentContext } from "../context/TransparentContext";
import { useSearch } from "../hooks/useSearch";
import "./HomePage.css";

function HomePage() {
  // Retrieve the query parameter from the URL.
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // Use our search hook with the current query.
  const { results, loading, error } = useSearch(query);
  const { resetToggled } = useContext(TransparentContext)!;
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update the URL search parameter whenever the query changes.
  useEffect(() => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

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
