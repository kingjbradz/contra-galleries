import { useQuery } from "@tanstack/react-query";

const getEnvironmentHeaders = () => {
  const hostname = window.location.hostname; // e.g., "onsite.gallery.com" or "localhost"
  const parts = hostname.split('.');
  
  let environment = import.meta.env.VITE_ENVIRONMENT; // Default
  let apiKey = import.meta.env.VITE_INTERNAL_SECRET_KEY;

  // Determine Environment
  // Logic: if it's "onsite.domain.com", environment is "onsite"
  if (parts.length >= 3 && parts[0] !== 'www') {
    environment = parts[0];
  }

  return {
    'Content-Type': 'application/json',
    'x-environment': environment,
    'x-api-key': apiKey
  };
};

export const fetchExhibitions = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/exhibitions`, {
      method: 'GET',
      headers: getEnvironmentHeaders(),
    });

    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.exhibitions; // This is your "Fat Payload"
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const useExhibitions = () => {
  return useQuery({
      queryKey: ["exhibitions"],
      queryFn: fetchExhibitions,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false
  });
};