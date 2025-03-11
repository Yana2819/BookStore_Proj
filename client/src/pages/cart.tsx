import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { type Book } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

interface CartItem extends Book {
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (id: number, quantity: number) => {
    const newCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/checkout/create-payment-intent", { amount: total });
    },
    onSuccess: () => {
      // Clear cart after successful checkout
      localStorage.setItem('cart', '[]');
      setCartItems([]);
      toast({
        title: "Order Completed",
        description: "Thank you for your purchase!",
      });
      setLocation('/');
    },
    onError: () => {
      toast({
        title: "Checkout Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
          <Button onClick={() => setLocation('/')} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid gap-6">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center p-4">
              <img
                src={`/${item.coverUrl}`}
                alt={item.title}
                className="w-20 h-28 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.author}</p>
                <p className="text-primary font-bold mt-1">
                  ${(item.price / 100).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-2xl font-bold text-primary">
            ${(total / 100).toFixed(2)}
          </p>
        </div>
        <Button 
          size="lg"
          onClick={() => checkoutMutation.mutate()}
          disabled={checkoutMutation.isPending}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          {checkoutMutation.isPending ? "Processing..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
}