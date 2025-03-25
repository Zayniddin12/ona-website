export interface ICommonDataResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface TParams {
  limit?: number;
  offset?: number;
  search?: string;
}

export interface TStatistics {
  id: number;
  people_donated: number;
  boxes_count: number;
  donation_received_children: number;
  donation_received_women: number;
  created_at: string;
}

export interface TGallery {
  id: number;
  image: string;
  username: string;
  full_name: string;
}

export interface TAdvertisements {
  id: number;
  image: string;
  link: string;
  created_at: string;
}

export interface THelp {
  id: number;
  title: string;
  lists: string[];
}

export interface TDonateTypes {
  active: boolean;
  created_at: string;
  id: number;
  ordering: number;
  title: string;
}

export interface TCommonHelpTypes {
  id: number;
  title: string;
}

export interface TEntrance {
  id: number;
  tag: string;
  description: string;
  images: string[];
}

export interface TNeedHelpTypes {
  id: number;
  hashtag: string;
  image: string;
  title: string;
  description: string;
  mainInfo: TNeedHelpMainInfo;
}

interface TNeedHelpMainInfo {
  region: string;
  city: string;
  additionalInfo: string;
}

export interface TReportAudit {
  id: number;
  title: string;
  description: string;
  docName: string;
  date: string;
  downloadLink: string;
  file: string
}