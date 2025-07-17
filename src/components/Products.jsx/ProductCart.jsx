import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link to={`/products/${product._id}`} className="text-blue-500">View</Link>
    </div>
  );
}
