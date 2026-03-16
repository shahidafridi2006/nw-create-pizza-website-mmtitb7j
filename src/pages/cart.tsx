import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any pizzas yet.</p>
        <Link href="/menu">
          <Button size="lg">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.pizza.id} className="flex gap-4 p-4 bg-card border rounded-xl">
              <img
                src={item.pizza.image_url}
                alt={item.pizza.name}
                className="h-24 w-24 object-cover rounded-lg"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{item.pizza.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.pizza.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeItem(item.pizza.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.pizza.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.pizza.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="font-bold">${(item.pizza.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border rounded-xl p-6 h-fit space-y-6">
          <h3 className="text-xl font-bold">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span>$5.00</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${(total + 5).toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout">
            <Button className="w-full py-6 text-lg">
              Checkout <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}