import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pizza, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (pizza: Pizza) => void;
  removeItem: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (pizza) => {
        const items = get().items;
        const existingItem = items.find((i) => i.pizza.id === pizza.id);
        
        let newItems;
        if (existingItem) {
          newItems = items.map((i) =>
            i.pizza.id === pizza.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          newItems = [...items, { pizza, quantity: 1 }];
        }
        
        const total = newItems.reduce((acc, item) => acc + item.pizza.price * item.quantity, 0);
        set({ items: newItems, total });
      },
      removeItem: (pizzaId) => {
        const newItems = get().items.filter((i) => i.pizza.id !== pizzaId);
        const total = newItems.reduce((acc, item) => acc + item.pizza.price * item.quantity, 0);
        set({ items: newItems, total });
      },
      updateQuantity: (pizzaId, quantity) => {
        if (quantity <= 0) return;
        const newItems = get().items.map((i) =>
          i.pizza.id === pizzaId ? { ...i, quantity } : i
        );
        const total = newItems.reduce((acc, item) => acc + item.pizza.price * item.quantity, 0);
        set({ items: newItems, total });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    { name: "pizza-cart" }
  )
);