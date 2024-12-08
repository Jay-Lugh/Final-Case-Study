import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Fetch cart items from the database
  useEffect(() => {
    // Fetch cart items from the backend when the component mounts
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };


  const handleCancel = () => {
    navigate("/cart");
  };

  return (
    <div className="container mt-4">
      <h1>Checkout</h1>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
        {/* Left Column: Checkout Form */}
        <div style={{ flex: 1 }}>
          <Form>
            <h3>Shipping Details</h3>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={shippingDetails.country}
                onChange={handleChange}
                placeholder="Enter your country"
              />
            </Form.Group>

            <h3>Payment Method</h3>
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={handlePaymentChange}
            />

            <div className="d-flex justify-content-between mt-3">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={async () => {
                setLoading(true);

                if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.country) {
                  alert("Please fill out all shipping details.");
                  setLoading(false);
                  return;
                }

                try {
                  // Submit the order
                  await axios.post("http://127.0.0.1:8000/api/checkout", {
                    shippingDetails,
                    paymentMethod,
                    cartItems,
                  });

                  // Clear the cart after successful checkout
                  await axios.delete("http://127.0.0.1:8000/api/cart/clear");

                  // Redirect to order success page
                  navigate("/checkout/success");
                } catch (error) {
                  console.error("Error during checkout:", error);
                  navigate("/checkout/error");
                } finally {
                  setLoading(false);
                }
              }} disabled={loading}>
                {loading ? "Processing..." : "Confirm Order"}
              </Button>
            </div>
          </Form>
        </div>

        {/* Right Column: Transaction Receipt */}
        <div
          style={{
            flex: 1,
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>Transaction Receipt</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}