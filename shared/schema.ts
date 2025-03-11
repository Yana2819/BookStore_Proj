import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  coverUrl: text("cover_url").notNull(),
  featured: boolean("featured").default(false),
  trending: boolean("trending").default(false),
});

export const insertBookSchema = createInsertSchema(books).omit({ id: true });

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;

export const searchBooksSchema = z.object({
  query: z.string().min(1).max(100),
});

export const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
