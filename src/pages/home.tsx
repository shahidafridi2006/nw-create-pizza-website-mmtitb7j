import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Pizza, ArrowRight, Star, Clock, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
          alt="Delicious Pizza"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            The Best Pizza in <span className="text-primary">Town</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Hand-crafted, wood-fired, and delivered fresh to your doorstep. Experience the authentic taste of Italy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="text-lg px-8 py-6">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
          <p className="text-muted-foreground">We use only the finest imported Italian ingredients and fresh local produce.</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-muted-foreground">Hot and fresh pizza delivered to your door in under 30 minutes, guaranteed.</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Truck className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
          <p className="text-muted-foreground">Enjoy free delivery on all orders over $30. No hidden fees, just great pizza.</p>
        </div>
      </section>

      {/* Popular Pizzas Preview */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Popular Choices</h2>
            <p className="text-muted-foreground">Our customers' all-time favorites</p>
          </div>
          <Link href="/menu">
            <Button variant="ghost">View All Menu</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Margherita", price: 12.99, img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800" },
            { name: "Pepperoni", price: 14.99, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800" },
            { name: "Quattro Formaggi", price: 15.99, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" },
            { name: "Veggie Supreme", price: 13.99, img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800" }
          ].map((pizza, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
                <img
                  src={pizza.img}
                  alt={pizza.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h4 className="font-bold text-lg">{pizza.name}</h4>
              <p className="text-primary font-semibold">${pizza.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}