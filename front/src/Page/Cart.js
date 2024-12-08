import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cart');
        setCartItems(response.data.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

const handleQuantityChange = async (id, newQuantity) => {
  if (newQuantity <= 0 || isNaN(newQuantity)) {
    return; 
  }

  console.log(`Updating item with id: ${id} to new quantity: ${newQuantity}`);

  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/cart/${id}`, {
      quantity: newQuantity,
    });

    if (response.status === 200) {
      console.log('Quantity updated successfully.');

      setCartItems((prevCartItems) =>
        prevCartItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      console.error('Error in updating quantity');
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};


  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    navigate('/checkout');
  };

  if (loading) {
    return <div className='loadingScreen'>Loading...</div>;
  }

  return (
    <div className="container mt-4">

      <div className="mb-4">
        <Button variant="secondary" onClick={() => navigate('/user')}>
          Return Home
        </Button>
      </div>

      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="form-control"
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

         
          <div className="mt-4">
            <h3>Total: ${calculateTotal()}</h3>
            <Button variant="success" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
