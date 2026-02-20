export interface ProductItem {
  _id: string;
  image: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  badge?: string | null;
  description: string;
  category: string;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  images: string[];
  sku?: string | null;
  createdAt: string;
  updatedAt: string;
}
