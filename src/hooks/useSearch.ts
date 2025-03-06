import { useState, useEffect, useRef } from "react";
import { debounce } from "../utils/debounce";

interface MediaItem {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  coverImage: {
    medium: string;
  };
}

// Debouncing: Delays the execution of fetchResults to minimize API calls as the user types.
// This reduces unnecessary network requests and improves performance.
const cache = new Map<string, any>();

// In-flight Request Management: Tracks ongoing fetch requests to prevent multiple simultaneous requests.
// Reduces server load and potential race conditions.
let inFlightRequest: Promise<any> | null = null;

// Error Handling: Catches errors during fetch operations and stores them in the error state.
// Ensures users are informed of any network issues, enhancing user experience.

// State Management: Manages results, loading, and error states to provide feedback on the search operation's status.
// Allows the UI to reflect the current status, such as showing loading indicators or error messages.

export function useSearch(query: string) {
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (searchQuery: string) => {
    if (cache.has(searchQuery)) {
      setResults(cache.get(searchQuery));
      return;
    }

    if (inFlightRequest) {
      await inFlightRequest;
    }

    setLoading(true);
    try {
      inFlightRequest = fetch("https://graphql.anilist.co/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `query ($search: String) {
            Page(perPage: 20) {
              media(search: $search, type: ANIME) {
                id
                title {
                  romaji
                  english
                  native
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

      const response = await inFlightRequest;

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
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
      inFlightRequest = null;
    }
  };

  // Debouncing: Delays the execution of fetchResults to minimize API calls as the user types.
  // This reduces unnecessary network requests and improves performance.
  const debouncedFetchResults = useRef(debounce(fetchResults, 300)).current;

  useEffect(() => {
    if (query) {
      debouncedFetchResults(query);
    }
  }, [query, debouncedFetchResults]);

  return { results, loading, error };
}
