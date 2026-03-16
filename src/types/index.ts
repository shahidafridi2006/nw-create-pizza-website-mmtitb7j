export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed';
  delivery_address: string;
  phone: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  pizza_id: string;
  quantity: number;
  price_at_time: number;
}

export type Database = {
  public: {
    Tables: {
      pizzas: {
        Row: Pizza;
        Insert: Omit<Pizza, 'id' | 'created_at'>;
        Update: Partial<Omit<Pizza, 'id' | 'created_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id'>;
        Update: Partial<Omit<OrderItem, 'id'>>;
      };
    };
  };
};