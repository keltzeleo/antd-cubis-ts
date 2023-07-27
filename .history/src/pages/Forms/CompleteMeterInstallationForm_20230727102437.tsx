import React, { useState } from "react";

const CompleteMeterInstallationForm: React.FC = () => {
  // Define state variables to hold form data
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [meterSerialNumber, setMeterSerialNumber] = useState("");
  const [installationDate, setInstallationDate] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process form data here (e.g., send it to the server)
    // ...

    // Clear form fields after submission
    setCustomerName("");
    setAddress("");
    setMeterSerialNumber("");
    setInstallationDate("");
  };

  return (
    <div>
      <h2>Complete Meter Installation</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <Input
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
          <label htmlFor="meterSerialNumber">Meter Serial Number:</label>
          <Input
            type="text"
            id="meterSerialNumber"
            value={meterSerialNumber}
            onChange={(e) => setMeterSerialNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="installationDate">Installation Date:</label>
          <Input
            type="date"
            id="installationDate"
            value={installationDate}
            onChange={(e) => setInstallationDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Work Order</button>
      </Form>
    </div>
  );
};

export default CompleteMeterInstallationForm;
