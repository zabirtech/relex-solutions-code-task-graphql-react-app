import React from "react";
import SearchResultItem from "./SearchResultItem";
import "./SearchResults.css";

interface SearchResultItemType {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    medium: string;
  };
}

interface SearchResultsProps {
  items: SearchResultItemType[];
  loading: boolean;
}

const LoadingSpinner = () => (
  <div className="spinner">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
  </div>
);

const SearchResults = React.memo(({ items, loading }: SearchResultsProps) => {
  if (loading) return <LoadingSpinner />;

  return (
    <div className="results-grid">
      {items.map((item) => (
        <SearchResultItem key={item.id} item={item} />
      ))}
    </div>
  );
});

export default SearchResults;
