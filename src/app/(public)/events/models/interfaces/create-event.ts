export interface CreateEventInput {
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
  is_featured: boolean;
  max_tickets_per_user: number;
  sale_start_date: Date;
  sale_end_date: Date;
  total_capacity: number;
  venue_id: number;
  primary_artist_id: number;
  category_id: number;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number;
}

export interface EventFormData {
  name: string;
  description: string;
  short_description: string;
  start_date: string; // ISO string for form inputs
  end_date: string;
  doors_open: string;
  age_restriction: string;
  dress_code: string;
  image_url: string;
  banner_url: string;
  is_featured: boolean;
  max_tickets_per_user: number;
  sale_start_date: string;
  sale_end_date: string;
  total_capacity: number;
  venue_id: string;
  primary_artist_id: string;
  category_id: string;
}
