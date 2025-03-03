import { useState, useEffect, useRef } from "react";
import { debounce } from "../utils/debounce";

interface MediaItem {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    medium: string;
  };
}

const cache = new Map<string, any>();

export function useSearch(query: string) {
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (searchQuery: string) => {
    if (cache.has(searchQuery)) {
      setResults(cache.get(searchQuery));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://graphql.anilist.co/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query ($search: String) {
            Page(perPage: 20) {
              media(search: $search, type: ANIME) {
                id
                title {
                  romaji
                }
                coverImage {
                  medium
                }
              }
            }
          }`,
          variables: { search: searchQuery },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const mediaResults = data.data.Page.media;
      cache.set(searchQuery, mediaResults);
      setResults(mediaResults);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchResults = useRef(debounce(fetchResults, 150)).current;

  useEffect(() => {
    if (query) {
      debouncedFetchResults(query);
    }
  }, [query, debouncedFetchResults]);

  return { results, loading, error };
}
