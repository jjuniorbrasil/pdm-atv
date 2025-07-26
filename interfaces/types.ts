export interface SteamApp {
  appid: number;
  name: string;
}

export interface SteamAppListResponse {
  applist: {
    apps: SteamApp[];
  };
}

export interface SteamAppDetailsResponse {
  [appid: number]: {
    success: boolean;
    data?: {
      type: string;
      name: string;
      steam_appid: number;
      required_age: string;
      is_free: boolean;
      detailed_description: string;
      about_the_game: string;
      short_description: string;
      header_image: string;
      developers: string[];
      publishers: string[];
      price_overview?: {
        currency: string;
        initial: number;
        final: number;
        discount_percent: number;
        initial_formatted: string;
        final_formatted: string;
      };
      platforms: {
        windows: boolean;
        mac: boolean;
        linux: boolean;
      };
      categories: { id: number; description: string }[];
      genres: { id: string; description: string }[];
      screenshots?: { id: number; path_thumbnail: string; path_full: string }[];
      movies?: {
        id: number;
        name: string;
        thumbnail: string;
        webm: { "480": string; max: string };
      }[];
      // ... tem mais, mas esses são os principais
    };
  };
}
