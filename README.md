
# Bookstore Project

A React-based bookstore website with search and cart functionality. This project features a full-stack implementation with a React frontend and Express backend.

## Features

- Book listing and details pages
- Shopping cart functionality
- Search capabilities
- Responsive design

## Project Structure

```
bookstore-project/
├── client/                  # Frontend React application
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/         # Page components
│       └── lib/           # Utilities and hooks
├── server/                 # Backend Express server
├── shared/                # Shared types and schemas
└── attached_assets/       # Book cover images
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the application at http://localhost:5000

## Branch Structure

This project follows a structured branching strategy:
- `main` - Production-ready code
- `develop` - Development branch
- Feature branches:
  - `feature/initial-setup`
  - `feature/book-listing`
  - `feature/book-details`
  - `feature/cart-functionality`
  - `feature/search`
  - `feature/payment`

## Technologies Used

- React with TypeScript
- Express.js backend
- Tailwind CSS for styling
- Vite for frontend build
