import React, { useState } from "react";
import CustomerInfo, {
  CustomerInfoProps,
} from "../../pages/Forms/CustomerInfo";
import CustomerIcNameBoard from "./CustomerIcNameBoard";

const CustomerDisplayHub = () => {
  const [namePrefix, setNamePrefix] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");

  const handleNamePrefixChange = (value: string | undefined) => {
    setNamePrefix(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const customerInfoProps: CustomerInfoProps = {
    namePrefix,
    name,
    onNamePrefixChange: handleNamePrefixChange,
    onNameChange: handleNameChange,
  };

  return (
    <div>
      <CustomerIcNameBoard namePrefix={namePrefix} name={name} />
      <CustomerInfo {...customerInfoProps} />
    </div>
  );
};

export default CustomerDisplayHub;
