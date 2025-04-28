import { useQuery } from "@tanstack/react-query";

const featuredArtistsUrl = import.meta.env.VITE_FEATURED_ARTISTS_URL
const generalGalleryUrl = import.meta.env.VITE_GENERAL_GALLERY_URL
const privateGeneralGalleryUrl = import.meta.env.VITE_PRIVATE_GENERAL_GALLERY_URL
const privateArtistListUrl = import.meta.env.VITE_PRIVATE_ARTIST_LIST_URL



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

const fetchPrivateGalleryData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok for URL: ${url}`);
    }
    return response.json();
  };
  
  export const usePrivateGalleryData = (url: string | null) => {
    const targetUrl = url ?? privateGeneralGalleryUrl; // Fallback to general URL if no artist URL
  
    return useQuery({
      queryKey: ["privateGallery", targetUrl], // Use the targetUrl, which can either be artist.url or general URL
      queryFn: () => fetchPrivateGalleryData(targetUrl), // Fetch data based on the resolved URL
      enabled: true, // Always run the query
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    });
  };

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