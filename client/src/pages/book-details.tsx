import { useQuery } from "@tanstack/react-query";
import { type Book } from "@shared/schema";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function BookDetails() {
  const [, params] = useRoute<{ id: string }>("/book/:id");
  const bookId = params?.id;
  const { toast } = useToast();

  const { data: books } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  const book = books?.find((b) => b.id === Number(bookId));

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === book.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    toast({
      title: "Added to Cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={`/${book.coverUrl}`}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
          <p className="text-2xl font-bold text-primary mb-6">
            ${(book.price / 100).toFixed(2)}
          </p>
          <Button 
            onClick={handleAddToCart}
            className="mb-6 w-full md:w-auto"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <div className="prose lg:prose-xl">
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}