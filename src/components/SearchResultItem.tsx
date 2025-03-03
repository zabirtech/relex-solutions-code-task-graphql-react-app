import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TransparentContext } from "../context/TransparentContext";

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

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  const { toggledItems, toggleItem } = useContext(TransparentContext)!;
  const navigate = useNavigate();

  const isToggled = toggledItems[item.id.toString()] || false;

  const handleClick = () => {
    toggleItem(item.id.toString());
    console.log(`Item ${item.id} toggled: ${!isToggled}`);
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
    </div>
  );
};

export default SearchResultItem;
