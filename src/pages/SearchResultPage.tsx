import { Link, useParams } from "react-router-dom";
import { useMediaDetail } from "../hooks/useMediaDetail";
import "./SearchResultPage.css";

const SearchResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const { media, loading, error } = useMediaDetail(Number(id));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="search-result-page">
      <h2>{media?.title.romaji}</h2>
      <p>{media?.description}</p>
      <p>Episodes: {media?.episodes}</p>
      <p>Genres: {media?.genres?.join(", ")}</p>
      <img src={media?.coverImage.large} alt={media?.title.romaji} />
      <Link to="/">Back to Search</Link>
    </div>
  );
};

export default SearchResultPage;
