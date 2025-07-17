import { Outlet } from 'react-router-dom';
import ProductGrid from '../components/Products/ProductGrid';

// Mock data - replace with real data fetching
const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: '/product1.jpg' },
  { id: 2, name: 'Product 2', price: 29.99, image: '/product2.jpg' },
  // ... more products
];

export default function Shop() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductGrid products={products} />
      <Outlet /> {/* For nested routes if needed */}
    </div>
  );
}