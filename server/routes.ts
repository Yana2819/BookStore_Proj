import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchBooksSchema, contactFormSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/books", async (_req, res) => {
    const books = await storage.getAllBooks();
    res.json(books);
  });

  app.get("/api/books/featured", async (_req, res) => {
    const books = await storage.getFeaturedBooks();
    res.json(books);
  });

  app.get("/api/books/trending", async (_req, res) => {
    const books = await storage.getTrendingBooks();
    res.json(books);
  });

  app.get("/api/books/search", async (req, res) => {
    try {
      const query = req.query.q?.toString() || '';
      const result = searchBooksSchema.safeParse({ query });

      if (!result.success) {
        return res.status(400).json({ message: "Invalid search query" });
      }

      const books = await storage.searchBooks(result.data.query);
      res.json(books);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ message: "Search failed" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const result = contactFormSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid form data" });
    }
    // In a real app, we would send an email or store the contact form submission
    res.json({ message: "Message sent successfully" });
  });

  // Add mock checkout endpoint
  app.post("/api/checkout/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      // For testing, return a mock client secret
      res.json({
        clientSecret: 'mock_client_secret',
        amount: amount,
        status: 'succeeded'
      });
    } catch (error) {
      res.status(500).json({ message: "Payment processing failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}