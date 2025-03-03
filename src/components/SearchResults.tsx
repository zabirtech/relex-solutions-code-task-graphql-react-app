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

const SearchResults: React.FC<SearchResultsProps> = ({ items, loading }) => {
  return (
    <div className="results-grid">
      {items.map((item) => (
        <SearchResultItem key={item.id} item={item} />
      ))}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default SearchResults;
