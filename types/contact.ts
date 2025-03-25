export interface TContact {
  id: number;
  email: string;
  phone_number: string;
  address: string;
  location: string;
  telegram_username?: string;
  twitter_username?: string;
  youtube_username?: string;
  instagram_username?: string;
}

export interface TSocial {
  icon: string;
  link: string;
  social_name: string;
}
