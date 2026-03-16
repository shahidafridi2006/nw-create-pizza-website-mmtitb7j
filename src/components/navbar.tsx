import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Pizza, Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const { items } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Pizza className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">Nova Pizza</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/menu" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/menu' ? 'text-primary' : 'text-muted-foreground'}`}>
              Menu
            </Link>
            <Link href="/orders" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/orders' ? 'text-primary' : 'text-muted-foreground'}`}>
              Orders
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">{user.email}</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                {user.email === "admin@novapizza.com" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="default" size="sm">Sign In</Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          <Link href="/menu" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link href="/orders" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Orders</Link>
        </div>
      )}
    </nav>
  );
}