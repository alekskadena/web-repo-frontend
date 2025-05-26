
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import './Payment.css'; 
function Payment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const amount = "1.00";
  const navigate = useNavigate();

  const handleApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();

      const res = await fetch("http://localhost/web-repo-backend/payment.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          amount,
          paypal_order_id: order.id,
        }),
      });

      const result = await res.json();

      if (result.success) {
        navigate("/paymentsuccess");
      } else {
        navigate("/paymentfail");
      }
    } catch (err) {
      console.error("Error while approving:", err);
      navigate("/paymentfail");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "ASyxi2qH22L96T49AwpNWZ45PvUlwp_U9W_Av2tzpOwjkneu8Bk6r9EAEv5HhmICNLnP88Dh7rPB77wB" }}>
      <div className="payment-wrapper">
        <div className="payment-card">
          <h2 className="payment-title">Payment Method</h2>

          <div className="payment-field">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="payment-field">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>

          <div className="payment-field">
            <label htmlFor="amount">Amount (USD):</label>
            <input
              id="amount"
              type="text"
              value={amount}
              readOnly
            />
          </div>

          <div className="paypal-buttons-container">
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: amount } }],
                });
              }}
              onApprove={handleApprove}
              onError={(err) => {
                console.error("Error:", err);
                setMessage("❌ Something went wrong. Try again later!");
              }}
            />
          </div>

          {message && <p className="payment-error">{message}</p>}
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default Payment;
