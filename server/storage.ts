import { books, type Book, type InsertBook } from "@shared/schema";

export interface IStorage {
  getAllBooks(): Promise<Book[]>;
  getFeaturedBooks(): Promise<Book[]>;
  getTrendingBooks(): Promise<Book[]>;
  searchBooks(query: string): Promise<Book[]>;
}

export class MemStorage implements IStorage {
  private books: Map<number, Book>;
  private currentId: number;

  constructor() {
    this.books = new Map();
    this.currentId = 1;
    this.initializeBooks();
  }

  private initializeBooks() {
    const sampleBooks: InsertBook[] = [
      {
        title: "Whisper of the Shadowborn",
        author: "Eleanor Night",
        price: 1999,
        description: "A thrilling fantasy novel about magic and destiny.",
        coverUrl: "attached_assets/1.png",
        featured: true,
        trending: false,
      },
      {
        title: "The Forgotten Prophecy",
        author: "Marcus Sage",
        price: 2499,
        description: "An epic tale of ancient scrolls and hidden truths.",
        coverUrl: "attached_assets/2.png",
        featured: true,
        trending: true,
      },
      {
        title: "Moonlit Wish",
        author: "Sarah Starling",
        price: 1799,
        description: "A magical journey under the moonlight.",
        coverUrl: "attached_assets/3.png",
        featured: false,
        trending: true,
      },
      {
        title: "Throne of Starlight",
        author: "Isabella Crown",
        price: 2999,
        description: "A royal romance with a twist of fate.",
        coverUrl: "attached_assets/4.png",
        featured: true,
        trending: true,
      },
      {
        title: "Digital Dream",
        author: "Cyber Smith",
        price: 2199,
        description: "A cyberpunk adventure in a neon world.",
        coverUrl: "attached_assets/5.png",
        featured: false,
        trending: true,
      },
    ];

    sampleBooks.forEach(book => {
      const id = this.currentId++;
      this.books.set(id, { ...book, id });
    });
  }

  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getFeaturedBooks(): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.featured);
  }

  async getTrendingBooks(): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.trending);
  }

  async searchBooks(query: string): Promise<Book[]> {
    const lowercaseQuery = query.toLowerCase().trim();
    return Array.from(this.books.values()).filter(book =>
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();