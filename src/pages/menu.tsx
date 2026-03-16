import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PizzaCard } from "@/components/pizza-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Pizza } from "@/types";

export default function Menu() {
  const { data: pizzas, isLoading } = useQuery({
    queryKey: ["pizzas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pizzas")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Pizza[];
    },
  });

  const categories = ["All", "Classic", "Specialty", "Vegetarian", "Vegan"];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-12 w-64 bg-muted animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Our Menu</h1>
          <p className="text-muted-foreground">Choose from our wide variety of delicious pizzas</p>
        </div>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-8">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pizzas
                ?.filter((p) => cat === "All" || p.category === cat)
                .map((pizza) => (
                  <PizzaCard key={pizza.id} pizza={pizza} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}