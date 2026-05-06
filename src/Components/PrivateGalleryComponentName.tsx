import { useState } from "react"

export const useGalleryName = () => {
  const [name, setName] = useState("Private");
  return { name, setName };
};