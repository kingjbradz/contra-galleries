import { useQuery } from "@tanstack/react-query";

const getEnvironmentHeaders = () => {
  const hostname = window.location.hostname; // e.g., "onsite.gallery.com" or "localhost"
  const parts = hostname.split('.');
  
  let environment = import.meta.env.VITE_ENVIRONMENT; // Default
  let apiKey = import.meta.env.VITE_INTERNAL_SECRET_KEY;

  // 1. Determine Environment
  // Logic: if it's "onsite.domain.com", environment is "onsite"
  if (parts.length >= 3 && parts[0] !== 'www') {
    environment = parts[0];
  }

  // 2. Localhost Development Override (For Testing)
  // You can manually change this string to 'onsite' or 'private' to test
  // if (hostname === 'localhost' || hostname === '127.0.0.1') {
  //   // environment = 'onsite'; // Uncomment this to test Onsite logic
  // }

  // 2. Attach API Key if not public
  // Note: Ensure REACT_APP_INTERNAL_KEY is in your React .env
  // if (environment !== 'public') {
  //   apiKey = import.meta.env.VITE_INTERNAL_SECRET_KEY;
  // }

  console.log("environment", environment)
  console.log("apiKey", apiKey)

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