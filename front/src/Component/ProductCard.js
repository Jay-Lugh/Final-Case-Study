import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function ProductCard({ product }) {
  // State to track the quantity input
  const [quantity, setQuantity] = useState(1);  
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
 
  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(e.target.value, product.stock));  
    setQuantity(value);
  };

  
  const handleAddToCart = async () => {
    try {
     
      const checkResponse = await axios.get('http://127.0.0.1:8000/api/cart');
      const cartItems = checkResponse.data.data; 
      const existingItem = cartItems.find(item => item.product_id === product.id);

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + quantity;
       
        const updateResponse = await axios.put(
          `http://127.0.0.1:8000/api/cart/${existingItem.id}`,
          { quantity: updatedQuantity }  
        );
        setToastMessage(`${product.name} updated in the cart!`);
      } else {
     
        const response = await axios.post('http://127.0.0.1:8000/api/cart', {
          product_id: product.id,      
          barcode: product.barcode,    
          name: product.name,        
          price: product.price,   
          quantity: quantity,
          category: product.category,  
          description: product.description, 
        });
        setToastMessage(`${product.name} added to the cart!`);
      }

     
      setShowToast(true);

    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
          <Card.Text>
            <strong>Description:</strong> {product.description}
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${product.price}
          </Card.Text>
          <Card.Text>
            <strong>Stock:</strong> {product.stock}
          </Card.Text>

          <hr style={{ borderColor: '#666' }} />
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.stock}
              className="form-control"
            />
          </div>

        
          <Button
          className= "mt-2"
            variant="primary"
            onClick={handleAddToCart}
            disabled={product.stock <= 0} 
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>

    
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000} 
          autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
