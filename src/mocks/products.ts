import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    description:
      "Apple iPhone 14 Pro 256GB, Deep Purple, 6.1 inch Super Retina XDR display with ProMotion",
    price: 999.99,
    discountPercentage: 5.5,
    rating: 4.8,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-04-15T12:00:00Z",
  },
  {
    id: 2,
    title: "Samsung Galaxy S23 Ultra",
    description:
      "Samsung Galaxy S23 Ultra, 512GB, Phantom Black, 6.8 inch Dynamic AMOLED 2X display",
    price: 1199.99,
    discountPercentage: 10,
    rating: 4.7,
    stock: 42,
    brand: "Samsung",
    category: "smartphones",
    thumbnail:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598327105854-c8674faddf79?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-05-20T09:30:00Z",
  },
  {
    id: 3,
    title: "MacBook Pro 16",
    description:
      "Apple MacBook Pro 16-inch, M2 Pro chip, 32GB RAM, 1TB SSD, Space Gray",
    price: 2499.99,
    discountPercentage: 7,
    rating: 4.9,
    stock: 15,
    brand: "Apple",
    category: "laptops",
    thumbnail:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-03-10T14:15:00Z",
  },
  {
    id: 4,
    title: "Dell XPS 15",
    description:
      "Dell XPS 15, Intel Core i9, 32GB RAM, 1TB SSD, 15.6 inch 4K UHD+ display",
    price: 1899.99,
    discountPercentage: 12,
    rating: 4.6,
    stock: 23,
    brand: "Dell",
    category: "laptops",
    thumbnail:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-06-05T11:45:00Z",
  },
  {
    id: 5,
    title: "Sony WH-1000XM5",
    description: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones, Black",
    price: 349.99,
    discountPercentage: 15,
    rating: 4.8,
    stock: 56,
    brand: "Sony",
    category: "audio",
    thumbnail:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-02-18T10:20:00Z",
  },
  {
    id: 6,
    title: "iPad Air",
    description: "Apple iPad Air, 10.9-inch, M1 chip, 256GB, Wi-Fi, Space Gray",
    price: 599.99,
    discountPercentage: 8,
    rating: 4.7,
    stock: 38,
    brand: "Apple",
    category: "tablets",
    thumbnail:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585790050230-5ab129de5f9c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-01-25T16:30:00Z",
  },
  {
    id: 7,
    title: "Bose QuietComfort Earbuds II",
    description:
      "Bose QuietComfort Earbuds II, Wireless Noise Cancelling Earbuds, Triple Black",
    price: 279.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 45,
    brand: "Bose",
    category: "audio",
    thumbnail:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1649516702465-b316303c3b60?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-07-12T08:45:00Z",
  },
  {
    id: 8,
    title: 'Samsung 55" OLED TV',
    description: "Samsung 55-inch OLED 4K Smart TV with Quantum HDR",
    price: 1499.99,
    discountPercentage: 20,
    rating: 4.6,
    stock: 12,
    brand: "Samsung",
    category: "televisions",
    thumbnail:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601944179066-29b8f7e29c3a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-04-30T13:15:00Z",
  },
  {
    id: 9,
    title: "Logitech MX Master 3S",
    description: "Logitech MX Master 3S Wireless Mouse, Graphite",
    price: 99.99,
    discountPercentage: 5,
    rating: 4.8,
    stock: 67,
    brand: "Logitech",
    category: "accessories",
    thumbnail:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-05-05T09:10:00Z",
  },
  {
    id: 10,
    title: "Canon EOS R6",
    description: "Canon EOS R6 Full-Frame Mirrorless Camera with 24-105mm Lens",
    price: 2499.99,
    discountPercentage: 15,
    rating: 4.7,
    stock: 8,
    brand: "Canon",
    category: "cameras",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500646953400-e6be0fd6cf88?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-03-22T15:40:00Z",
  },
  {
    id: 11,
    title: "PlayStation 5",
    description:
      "Sony PlayStation 5 Console with Ultra-High Speed SSD and DualSense Controller",
    price: 499.99,
    discountPercentage: 0,
    rating: 4.9,
    stock: 5,
    brand: "Sony",
    category: "gaming",
    thumbnail:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?q=80&w=1000&auto=format&fit=crop",
    ],
    createdAt: "2023-08-15T10:00:00Z",
  },
];

export const getCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  products.forEach((product) => categoriesSet.add(product.category));
  return Array.from(categoriesSet);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getRelatedProducts = (
  product: Product,
  limit: number = 4
): Product[] => {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};
