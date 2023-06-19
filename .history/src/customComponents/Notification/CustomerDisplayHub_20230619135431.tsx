import React from "react";
import CustomerIcNameBoard from "../../customComponents/Notification/CustomerIcNameBoard";
import IdTypeBoard from "../../customComponents/Notification/IdTypeBoard";
import CustomerInfo from "../../pages/Forms/CustomerInfo";

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
  const normalizedSelectedOption = selectedOption || ""; // Use an empty string as the default value if selectedOption is undefined

  return (
    <div>
      <CustomerIcNameBoard
        customerTitle={customerTitle}
        customerName={customerName}
      />
      <IdTypeBoard selectedOption={normalizedSelectedOption} />
      <CustomerInfo
        namePrefix="customerTitle" // Add the appropriate value for namePrefix
        name="" // Add the appropriate value for name
        onNamePrefixChange={() => {}} // Add the appropriate function for onNamePrefixChange
        onNameChange={() => {}} // Add the appropriate function for onNameChange
      />
    </div>
  );
};

export default CustomerDisplayHub;
