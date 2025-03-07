import { useQuery } from "@tanstack/react-query";

const featuredArtistsUrl = "https://api.npoint.io/c86f82cf3737f0456f8c";

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

const generalGalleryUrl = "https://api.npoint.io/398ada7cdc7f267d4846";

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
