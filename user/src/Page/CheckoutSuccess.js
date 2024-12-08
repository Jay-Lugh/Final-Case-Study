import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve checkout details passed via state
  const { shippingDetails, paymentMethod, cartItems, totalPrice } = location.state || {};

  return (
    <div className="container mt-5">
      <h1>Thank You for Buying in Our App!</h1>
      <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Order Details</h3>
        <p>
          <strong>Name:</strong> {shippingDetails?.name}
        </p>
        <p>
          <strong>Address:</strong> {shippingDetails?.address}, {shippingDetails?.city}, {shippingDetails?.country}
        </p>
        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
        <h4>Transaction Receipt</h4>
        {cartItems?.map((item, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>${(item.quantity * item.price).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
          <span>Total:</span>
          <span>${totalPrice?.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4">
        <Button variant="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
