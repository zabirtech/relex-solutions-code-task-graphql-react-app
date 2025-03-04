import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TransparentContext } from "../context/TransparentContext";
import { Link } from "react-router-dom";

interface SearchResultItemProps {
  item: {
    id: number;
    title: {
      romaji: string;
    };
    coverImage: {
      medium: string;
    };
  };
}

// SearchResultItem: Represents an individual search result item.
// Handles user interaction for toggling transparency and navigation.
// Uses context to manage the toggled state, allowing for shared state management across components.

// handleClick: Toggles the transparency state and navigates to the detailed view of the item.
// This function updates the context state and triggers navigation on click.

function SearchResultItem({ item }: SearchResultItemProps) {
  const { toggledItems, toggleItem } = useContext(TransparentContext)!;
  const navigate = useNavigate();

  const isToggled = toggledItems[item.id.toString()] || false;

  const handleClick = () => {
    toggleItem(item.id.toString());
    navigate(`/result/${item.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`search-result-item ${isToggled ? "toggled" : ""}`}
    >
      <img
        src={item.coverImage.medium}
        alt={item.title.romaji}
        className="search-result-item-img"
      />
      <h3 className="search-result-item-title">{item.title.romaji}</h3>
      <Link data-testid="result-link" to={`/anime/${item.id}`}></Link>
    </div>
  );
}

export default SearchResultItem;
