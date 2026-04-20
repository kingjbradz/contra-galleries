export interface ArtworkImage {
  url: string;
  id: string;
  is_cover?: boolean;
}

export interface ExhibitionArtwork {
  exhibition_id: string;
  artwork_id: string;
  info?: string;
  slug?: string;
  artwork_images: ArtworkImage[];
  title?: string;
  artist_name?: string;
  year?: string;
  signed?: boolean;
  material?: string;
  dimensions?: string;
}

export interface Exhibition {
  id: string;
  name: string;
  cover_image?: string;
  description?: string;
  onsite?: boolean;
  public?: boolean;
  private?: boolean;
  slug?: string;
  artworks?: ExhibitionArtwork[]
  error?: string;
}