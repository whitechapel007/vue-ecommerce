# Vue E-Commerce App

This project is a demo e-commerce site built with Vue 3, TypeScript, Pinia, and Tailwind CSS.

## 🛠 Tech Stack

- **Vue 3** (Composition API)
- **TypeScript**
- **Vite**
- **Pinia** (for state management)
- **Vue Router**
- **Tailwind CSS**
- **Lucide Icons**
- **Jest** (for testing)

## 📦 Features

### Product Listing Page

- Responsive grid of products (image, title, price, stock status)
- Pagination
- Search with debouncing
- Filter by category and price range
- Sorting by price, name, newest

### Product Detail Page

- Full product details
- Related products
- "Add to Cart" button
- Stock availability

### Shopping Cart

- Persistent cart using Pinia and localStorage
- Show items with quantity
- Allow quantity update
- Calculate total price
- Remove items from cart

## 🧱 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable Vue components
│   ├── cart/        # Cart-related components
│   ├── layout/      # Layout components (header, footer)
│   ├── product/     # Product-related components
│   └── ui/          # UI components (buttons, inputs, etc.)
├── mocks/           # Mock data
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── types/           # TypeScript interfaces and types
├── views/           # Page components
├── App.vue          # Root component
└── main.ts          # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository

```bash
git https://github.com/whitechapel007/vue-ecommerce.git
cd vue-ecommerce
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🧪 Testing

Run the tests with:

```bash
npm run test
# or
yarn test
```

## 📝 Assumptions Made

- Mock data is used instead of a real API
- Cart data is persisted in localStorage
- No user authentication is implemented (could be added as a bonus feature)
- No payment processing is implemented

## 🔍 Known Limitations

- No server-side rendering
- No real API integration
- No user authentication
- No payment processing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
