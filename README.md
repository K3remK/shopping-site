# Next.js E-Commerce Shopping Site

A modern, responsive e-commerce web application built with **Next.js 15**, **React 19**, and **Bootstrap**. This project features a dynamic product catalog, real-time search and filtering, and a persistent shopping cart powered by a local JSON server.

## 🚀 Features

- **Dynamic Product Catalog**: Browse products with ease.
- **Advanced Filtering & Sorting**: 
  - Filter products by category.
  - Search products by name.
  - Sort products by price (Low-to-High / High-to-Low).
- **Shopping Cart System**: 
  - Add, remove, and update item quantities.
  - Real-time cart calculations.
  - Data persistence using `json-server` (cart items remain after refresh).
- **Campaign Management**: Dynamic campaign slider showcasing discounted products.
- **Product Details**: Detailed view for each product including images, ratings, and reviews.
- **Responsive Design**: Fully responsive UI built with `react-bootstrap` and `reactstrap`.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: 
  - [Bootstrap 5](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.github.io/)
  - [Tailwind CSS](https://tailwindcss.com/) (configured)
- **Data Mocking**: [JSON Server](https://github.com/typicode/json-server)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 📂 Project Structure

```
src/
├── app/
│   ├── components/      # Reusable UI components (Navbar, Cart, Catalog, etc.)
│   ├── pages/           # Dynamic routes for product details and campaigns
│   ├── globals.css      # Global styles
│   ├── layout.js        # Root layout with CartProvider
│   └── page.js          # Main homepage logic
├── db.json              # Mock database for Products, Cart, and Campaigns
```

## ⚡ Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js**: Make sure you have Node.js installed (v18+ recommended).
- **npm**: Uses `npm` for package management.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Application

This project uses `npm-run-all` to run both the Next.js development server and the JSON server concurrently with a single command.

1.  **Start the development server**:
    ```bash
    npm run dev
    ```

    > **Note**: This command executes `npm-run-all --parallel next server`.
    > - **Frontend**: Runs at `http://localhost:3000`
    > - **Backend (API)**: Runs at `http://localhost:5000`

2.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📡 API Reference

The application uses `json-server` to mock a REST API.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/products` | `GET` | Fetch all products (supports filtering `?q=` & `?category=`) |
| `/shoppingCart` | `GET` | Get current cart items |
| `/shoppingCart` | `POST` | Add item to cart |
| `/shoppingCart/:id` | `PUT` | Update item quantity |
| `/shoppingCart/:id` | `DELETE` | Remove item from cart |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
