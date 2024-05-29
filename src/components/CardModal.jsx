/* eslint-disable react/prop-types */
import { Modal, Box } from "@mui/material";

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
      <Box className="bg-white p-4 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="mb-2">
                  || {item.title} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p>Total Items: {totalItems}</p>
              <p>Total Cost: ${totalCost}</p>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
        >
          Close
        </button>
      </Box>
    </Modal>
  );
};

export default CartModal;
