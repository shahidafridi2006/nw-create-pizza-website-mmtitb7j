import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Package, Clock, CheckCircle2, Truck } from "lucide-react";
import { useLocation } from "wouter";

export default function Orders() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setLocation("/auth");
    return null;
  }

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            pizzas (*)
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "preparing": return <Package className="h-4 w-4" />;
      case "delivering": return <Truck className="h-4 w-4" />;
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "preparing": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "delivering": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "completed": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "";
    }
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-muted rounded-xl" />)}
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Your Orders</h1>
      {orders?.length === 0 ? (
        <div className="text-center py-20 bg-card border rounded-xl">
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Order #{order.id.slice(0, 8)}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(order.created_at), "PPP 'at' p")}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)} variant="outline">
                  <span className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {order.order_items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.pizzas.name}</span>
                        <span>${(item.price_at_time * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>${order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Delivering to: {order.delivery_address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}