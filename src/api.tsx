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

const privateGalleryUrl = import.meta.env.VITE_PRIVATE_GALLERY_URL