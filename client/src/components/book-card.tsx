import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { type Book } from "@shared/schema";
import { Link } from "wouter";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`}>
      <Card className="overflow-hidden transition-transform hover:scale-105 cursor-pointer h-full">
        <CardContent className="p-0">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-40 object-cover"
            loading="lazy"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start p-2">
          <h3 className="font-semibold text-sm line-clamp-1">{book.title}</h3>
          <p className="text-gray-600 text-xs">{book.author}</p>
          <p className="text-primary font-bold text-sm mt-1">
            ${(book.price / 100).toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}