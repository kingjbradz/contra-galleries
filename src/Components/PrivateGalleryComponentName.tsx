import { useState } from "react"

export const useGalleryName = () => {
  const [name, setName] = useState("Private Gallery");
  return { name, setName };
};