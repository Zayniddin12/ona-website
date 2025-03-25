export interface TEventsSingle {
  id: number;
  title: string;
  short_description: string;
  thumbnail: string;
  category: string;
  slug: string;
  address: string;
  event_at: string;
  view_count: number;
  published_at: string;
}
export interface TEvent {
  address: string;
  category: string;
  id: number;
  short_description: string;
  slug: string;
  start_date: string;
  thumbnail: string;
  title: string;
}
