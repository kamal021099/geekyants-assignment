import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductList from "./components/ProductsList";
import { useState } from "react";
import CartModal from "./components/CardModal";

const queryClient = new QueryClient();

function App() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct.quantity === 1) {
        return prevCart.filter((item) => item.id !== product.id);
      } else {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const handleCheckout = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto p-4 relative">
          {/* header */}
          <div className="w-full flex justify-between">
            <h1 className="text-3xl font-bold mb-4">Product List</h1>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Checkout
            </button>
          </div>
          {/* product list */}
          <ProductList
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartItems={cart}
          />
          {/* checkout button */}
          <div className="fixed bottom-5 bg-slate-400 w-full "></div>

          {/* cart modal */}
          <>
            <CartModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              cartItems={cart}
            />
          </>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
