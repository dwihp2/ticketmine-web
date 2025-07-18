export interface Event {
  id: number;
  name: string;
  description: string;
  short_description: string;
  start_date: Date;
  end_date: Date;
  doors_open: Date;
  age_restriction: string;
  dress_code: string;
  image_url: string;
  banner_url: string;
  status: string;
  is_featured: boolean;
  max_tickets_per_user: number;
  sale_start_date: Date;
  sale_end_date: Date;
  total_capacity: number;
  sold_tickets: number;
  created_at: Date;
  updated_at: Date;
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    capacity: number;
    image_url: string;
  };
  primary_artist: {
    id: number;
    name: string;
    genre: string;
    image_url: string;
  };
}
