/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = ({ addToCart, removeFromCart, cartItems }) => {
  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [sortCriteria, setSortCriteria] = useState("");

  const sortProducts = (products, criteria) => {
    switch (criteria) {
      case "price":
        return [...products].sort((a, b) => a.price - b.price);
      case "rating":
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
      case "category":
        return [...products].sort((a, b) =>
          a.category.localeCompare(b.category)
        );
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products, sortCriteria);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          className="p-2 border border-gray-300"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="">Select</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartItems={cartItems}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
