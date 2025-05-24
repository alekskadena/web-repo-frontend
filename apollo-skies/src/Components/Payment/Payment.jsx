import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const amount = "14.00"; // Çmimi fiks

  const handleApprove = async (data, actions) => {
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
      setMessage("Pagesa u krye me sukses dhe u ruajt ne databaze.");
    } else {
      setMessage("Pagesa u krye, por ndodhi nje gabim gjate ruajtjes ne databaze.");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "ASyxi2qH22L96T49AwpNWZ45PvUlwp_U9W_Av2tzpOwjkneu8Bk6r9EAEv5HhmICNLnP88Dh7rPB77wB" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2>Payment Form</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your e-mail"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Sum (Euro):</label>
          <input
            type="text"
            value={amount}
            readOnly
            style={{ width: "100%", marginBottom: "20px" }}
          />
        </div>

        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={handleApprove}
          onError={(err) => {
            console.error(err);
            setMessage(" There is something wrong with your payment. PLease try again later.");
          }}
        />

        {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      </div>
    </PayPalScriptProvider>
  );
}

export default Payment;