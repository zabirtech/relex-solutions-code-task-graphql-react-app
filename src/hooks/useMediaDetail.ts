import { useState, useEffect } from "react";

interface MediaDetail {
  id: number;
  title: {
    romaji: string;
    english?: string;
    native?: string;
  };
  description: string;
  episodes?: number;
  genres?: string[];
  coverImage: {
    extraLarge?: string;
    large?: string;
    medium: string;
  };
}

export const useMediaDetail = (id: number) => {
  const [media, setMedia] = useState<MediaDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
          query ($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              title {
                romaji
                english
                native
              }
              description(asHtml: false)
              episodes
              genres
              coverImage {
                extraLarge
                large
                medium
              }
            }
          }
        `,
        variables: { id },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMedia(data.data.Media);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching media details");
        setLoading(false);
      });
  }, [id]);

  return { media, loading, error };
};
