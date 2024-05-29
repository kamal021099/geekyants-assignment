/* eslint-disable react/prop-types */
const ProductCard = ({ product, addToCart, removeFromCart, cartItems }) => {
  const isInCart = cartItems.find((item) => item.id === product.id);

  return (
    <div className="border p-4 rounded-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-lg font-bold mt-2 truncate">{product.title}</h2>
      <p className="mt-1 text-lg">${product.price}</p>
      <p className="mt-1 text-gray-500">
        Rating: {product.rating.rate}/5 ({product.rating.count} reviews)
      </p>
      {isInCart ? (
        <div className="flex items-center mt-2">
          <button
            className="bg-green-500 text-white py-1 px-2 rounded"
            onClick={() => removeFromCart(product)}
          >
            -
          </button>
          <span className="mx-2">{isInCart.quantity}</span>
          <button
            className="bg-green-500 text-white py-1 px-2 rounded"
            onClick={() => addToCart(product)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
