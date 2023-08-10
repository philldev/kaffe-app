export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_currency: string;
  user_id: string;
  category_id: string;
}
