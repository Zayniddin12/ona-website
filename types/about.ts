export interface TMission {
  id: number;
  title: string;
  icon: string;
  body: string;
}

export interface TMember {
  id: number;
  image: string;
  full_name: string;
  level: string;
  email: string;
  phone_number: string;
  location?: string;
  address?: string;
}

export interface TLicense {
  id: number;
  image: string;
  title: string;
  file: string;
}

export interface TAbout {
  id: number;
  title: string;
  body: string;
  telegram: string;
  instagram: string;
  youtube: string;
  twitter: string;
}
