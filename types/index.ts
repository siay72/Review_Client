export interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string;
  average_rating: number;
  review_count: number;
}

export interface Review {
  id: number;
  user: string;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ProductDetails {
  id: number;
  title: string;
  description: string;
  image_url: string;
  average_rating: number;
  reviews: Review[];
}

export interface ReviewRequest {
  product_id: number;
  rating: number;
  comment: string;
}