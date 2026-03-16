import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg">Go Home</Button>
      </Link>
    </div>
  );
}