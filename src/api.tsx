import { useQuery } from "@tanstack/react-query";

const featuredArtistsUrl = import.meta.env.VITE_FEATURED_ARTISTS_URL

const fetchFeaturedArtistsData = async () => {
    const response = await fetch(featuredArtistsUrl);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const useFeaturedArtistsData = () => {
    return useQuery({
        queryKey: ["featuredArtists"],
        queryFn: fetchFeaturedArtistsData,
        refetchOnWindowFocus: false, // Prevent unnecessary refetches
    });
};

const generalGalleryUrl = import.meta.env.VITE_GENERAL_GALLERY_URL

const fetchGeneralGalleryData = async () => {
    const response = await fetch(generalGalleryUrl);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const useGeneralGalleryData = () => {
    return useQuery({
        queryKey: ["generalGallery"],
        queryFn: fetchGeneralGalleryData,
        refetchOnWindowFocus: false, // Prevent unnecessary refetches
    });
};

const fetchPrivateGalleryData = async (url: string | null) => {
    if (!url) {
      return null; // Or throw an error, depending on your needs
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok for URL: ${url}`);
    }
    return response.json();
  };
  
  export const usePrivateGalleryData = (url: string | null) => {
    return useQuery({
      queryKey: ["privateGallery", url], // Include URL in the query key for better caching
      queryFn: () => fetchPrivateGalleryData(url),
      enabled: !!url, // Only run the query if the URL is available
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    });
  };

const privateArtistListUrl = import.meta.env.VITE_PRIVATE_ARTIST_LIST_URL

const fetchPrivateArtistListData = async () => {
    const response = await fetch(privateArtistListUrl);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const usePrivateArtistListData = () => {
    return useQuery({
        queryKey: ["privateArtistList"],
        queryFn: fetchPrivateArtistListData,
        refetchOnWindowFocus: false, // Prevent unnecessary refetches
    });
};