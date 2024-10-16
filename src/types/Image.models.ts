export interface Translations {
    en?: string | null;
    es?: string | null;
    ja?: string | null;
    fr?: string | null;
    it?: string | null;
    ko?: string | null;
    de?: string | null;
    pt?: string | null;
}

export interface Exif {
    make: string | null;
    model: string | null;
    name: string | null;
    exposure_time: string | null;
    aperture: string | null;
    focal_length: string | null;
    iso: number | null;
}

export interface Position {
    latitude: number | null;
    longitude: number | null;
}

export interface Location {
    city: string | null;
    country: string | null;
    position: Position | null;
}

export interface Tag {
    title: string | null;
}

export interface Collection {
    id: number | null;
    title: string | null;
    published_at: string | null;
    last_collected_at: string | null;
    updated_at: string | null;
    cover_photo: string | null;
    user: string | null;
}

export interface Urls {
    raw: string | null;
    full: string | null;
    regular: string | null;
    small: string | null;
    thumb: string | null;
}

export interface Links {
    self: string | null;
    html: string | null;
    download: string | null;
    download_location: string | null;
}
export interface ProfileImage {
    small: string | null;
    medium: string | null;
    large: string | null;
  }
export interface UserLinks {
    self: string | null;
    html: string | null;
    photos: string | null;
    likes: string | null;
    portfolio: string | null;
}

export interface User {
    id: string | null;
    updated_at: string | null;
    username: string | null;
    name: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    total_likes: number | null;
    total_photos: number | null;
    total_collections: number | null;
    instagram_username: string | null;
    twitter_username: string | null;
    profile_image: ProfileImage | null;
    links: UserLinks | null;
}

export interface ImageData {
    id: string | null;
    created_at: string | null;
    updated_at: string | null;
    width: number | null;
    height: number | null;
    color: string | null;
    blur_hash: string | null;
    downloads: number | null;
    likes: number | null;
    liked_by_user: boolean | null;
    public_domain: boolean | null;
    description: string | null;
    exif: Exif | null;
    location: Location | null;
    tags: Tag[] | null;
    current_user_collections: Collection[] | null;
    urls: Urls | null;
    links: Links | null;
    user: User | null;
    alt_description?: string | null;
    alternative_slugs?: Translations | null;
}
