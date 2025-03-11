# Bookstore Project Structure Guide

## Root Directory Structure
```
bookstore-project/
├── .github/                          # GitHub specific configurations
│   ├── PULL_REQUEST_TEMPLATE.md      # PR template
│   └── workflows/                    # GitHub Actions workflows
│       └── ci.yml                    # CI pipeline configuration
│
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   │   ├── button.tsx      # Button component
│   │   │   │   ├── card.tsx        # Card component
│   │   │   │   └── input.tsx       # Input component
│   │   │   ├── book-card.tsx       # Book display component
│   │   │   ├── navbar.tsx          # Navigation bar component
│   │   │   └── search-bar.tsx      # Search functionality
│   │   │
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── use-toast.ts        # Toast notification hook
│   │   │
│   │   ├── lib/                    # Utility functions
│   │   │   └── queryClient.ts      # API client configuration
│   │   │
│   │   ├── pages/                  # Route components
│   │   │   ├── home.tsx           # Main landing page
│   │   │   ├── about.tsx          # About page
│   │   │   ├── services.tsx       # Services page
│   │   │   ├── contact.tsx        # Contact form
│   │   │   ├── book-details.tsx   # Single book view
│   │   │   └── cart.tsx           # Shopping cart page
│   │   │
│   │   ├── App.tsx                # Root component
│   │   └── main.tsx               # Entry point
│   │
│   └── index.html                 # HTML template
│
├── server/                         # Backend Express server
│   ├── routes.ts                  # API route definitions
│   │   ├── book routes           # Book-related endpoints
│   │   ├── search routes         # Search functionality
│   │   └── cart routes           # Shopping cart operations
│   │
│   ├── storage.ts                 # Data storage implementation
│   │   ├── MemStorage class      # In-memory database
│   │   └── IStorage interface    # Storage interface
│   │
│   ├── vite.ts                    # Vite server configuration
│   └── index.ts                   # Server entry point
│
├── shared/                        # Shared code between front/backend
│   └── schema.ts                 # Data types and validation
│       ├── Book type            # Book data structure
│       ├── ContactForm type     # Contact form validation
│       └── SearchQuery type     # Search query validation
│
├── attached_assets/              # Static assets
│   ├── 1.png                    # Book cover - Whisper of the Shadowborn
│   ├── 2.png                    # Book cover - The Forgotten Prophecy
│   ├── 3.png                    # Book cover - Moonlit Wish
│   ├── 4.png                    # Book cover - Throne of Starlight
│   └── 5.png                    # Book cover - Digital Dream
│
├── Configuration Files
│   ├── package.json             # Project dependencies and scripts
│   ├── tsconfig.json           # TypeScript configuration
│   ├── vite.config.ts          # Vite build configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tailwind.config.ts      # Tailwind CSS configuration
│   └── theme.json             # UI theme configuration
│
└── Documentation
    ├── README.md              # Project overview
    └── GITHUB_GUIDE.md        # GitHub workflow guide
```

## Component Details

### Frontend Components (client/src/components/)

1. BookCard Component
   - Purpose: Displays individual book information
   - Features:
     - Book cover image
     - Title and author
     - Price display
     - Click handler for book details

2. Navbar Component
   - Purpose: Main navigation
   - Features:
     - Route links
     - Cart icon with counter
     - Responsive design

3. SearchBar Component
   - Purpose: Book search functionality
   - Features:
     - Input field
     - Search icon
     - Search trigger on submit

### Page Components (client/src/pages/)

1. Home Page
   - Features:
     - Featured books section
     - Trending books section
     - Search functionality
     - Grid layout display

2. Book Details Page
   - Features:
     - Full book information
     - Add to cart button
     - Price display
     - Back navigation

3. Cart Page
   - Features:
     - Cart items list
     - Quantity controls
     - Total calculation
     - Checkout process

## Server Structure (server/)

### API Routes
1. Book Routes
   - GET /api/books - All books
   - GET /api/books/featured - Featured books
   - GET /api/books/trending - Trending books
   - GET /api/books/search - Search endpoint

### Storage Implementation
1. MemStorage Class
   - Methods:
     - getAllBooks()
     - getFeaturedBooks()
     - getTrendingBooks()
     - searchBooks()

## Shared Types (shared/schema.ts)

1. Book Type
```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  coverUrl: string;
  featured: boolean;
  trending: boolean;
}
```

2. Search Schema
```typescript
const searchBooksSchema = z.object({
  query: z.string().min(1).max(100),
});
```

## Configuration Details

1. package.json
   - Scripts:
     - dev: Development server
     - build: Production build
     - start: Production server
     - check: TypeScript check

2. vite.config.ts
   - Plugins configuration
   - Build settings
   - Environment variables

3. theme.json
   - Color scheme
   - Typography
   - Component styling

## Development Guidelines

1. Component Organization
   - Keep components focused
   - Use shared UI components
   - Implement TypeScript types

2. State Management
   - React Query for server state
   - Local storage for cart
   - Loading/error states

3. API Integration
   - Use queryClient
   - Error handling
   - Data validation

4. Styling
   - Tailwind CSS
   - Theme variables
   - Responsive design

## Branch Structure

```
main (production)
└── develop (development)
    ├── feature/initial-setup
    ├── feature/book-listing
    ├── feature/book-details
    ├── feature/search
    ├── feature/cart
    └── feature/checkout
```

## Features by Branch

### feature/initial-setup
- Project configuration
- Base dependencies
- Core layout components

### feature/book-listing
- Book grid display
- Featured books section
- Trending books section

### feature/book-details
- Individual book view
- Book information display
- Cover image handling

### feature/search
- Search bar component
- Search results display
- Search functionality

### feature/cart
- Shopping cart view
- Add to cart functionality
- Cart item management

### feature/checkout
- Checkout process
- Payment integration
- Order confirmation

## Key Components

### Frontend (client/)
- React components for UI
- TanStack Query for data fetching
- Tailwind CSS for styling
- Wouter for routing

### Backend (server/)
- Express server setup
- API endpoints
- In-memory storage implementation

### Shared (shared/)
- TypeScript interfaces
- Zod schemas
- Shared utilities