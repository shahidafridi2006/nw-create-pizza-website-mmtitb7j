import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import type { Pizza } from "@/types";

interface PizzaCardProps {
  pizza: Pizza;
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(pizza);
    toast({
      title: "Added to cart",
      description: `${pizza.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden group flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={pizza.image_url}
          alt={pizza.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
          {pizza.category}
        </Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-bold line-clamp-1">{pizza.name}</CardTitle>
          <span className="font-bold text-primary">${pizza.price.toFixed(2)}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pizza.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" onClick={handleAddToCart}>
          <Plus className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}