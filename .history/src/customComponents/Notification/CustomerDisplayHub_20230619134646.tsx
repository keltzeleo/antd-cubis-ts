import React from "react";
import CustomerIcNameBoard from "../../customComponents/Notification/CustomerIcNameBoard";
import IdTypeBoard from "../../customComponents/Notification/IdTypeBoard";
import CustomerInfo from "../Forms/CustomerInfo";

interface CustomerDisplayHubProps {
  customerTitle: string;
  customerName: string;
  selectedOption: string | undefined;
}

const CustomerDisplayHub: React.FC<CustomerDisplayHubProps> = ({
  customerTitle,
  customerName,
  selectedOption,
}) => {
  return (
    <div>
      <CustomerIcNameBoard
        customerTitle={customerTitle}
        customerName={customerName}
      />
      <IdTypeBoard selectedOption={selectedOption} />
      <CustomerInfo />
    </div>
  );
};

export default CustomerDisplayHub;
