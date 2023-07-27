import React, { useState } from "react";

const IssueDepositAndInstallationBillForm: React.FC = () => {
  // Define state variables to hold form data
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [billAmount, setBillAmount] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process form data here (e.g., send it to the server)
    // ...

    // Clear form fields after submission
    setCustomerName("");
    setAddress("");
    setBillAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="billAmount">Bill Amount:</label>
        <input
          type="number"
          id="billAmount"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Issue Bill</button>
    </form>
  );
};

export default IssueDepositAndInstallationBillForm;
