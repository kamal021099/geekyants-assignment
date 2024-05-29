/* eslint-disable react/prop-types */
import { Modal } from "@mui/material";

const CartModal = ({ isOpen, onClose, cartItems }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Category: {item.category}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Rating: {item.rating.rate} ({item.rating.count} reviews)
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-lg font-semibold">Total Items: {totalItems}</p>
              <p className="text-lg font-semibold">Total Cost: ${totalCost}</p>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CartModal;
