import { productSchema } from "@/app/dashboard/components/product/Product-Form";
import z from "zod";
export interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  image_url: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}
export type addtocart = {
  id: number;
  name: string;
  images: string[];
  price: number;
  model?: string;
  condition: string;
  category: string;
};
export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  total_items: number;
  item_count: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  name: string;
  slug: string;
  thumbnail_url?: string;
  id: number;
  product_count?: number;
  subcategories?: subcategories[];
  parent_id?: number;
}
export interface subcategories extends Category {
  parent_id: number;
}
export interface CategoryFormData {
  name: string;
  slug: string;
  parent_id?: number;
  thumbnail?: string;
  subcategories?: subcategories[];
}
export type Product = z.infer<typeof productSchema> & { id: number };
