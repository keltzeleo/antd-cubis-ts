import React, { useState } from "react";
import CustomerInfo from "../../pages/Forms/CustomerInfo";
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

  return (
    <div>
      <CustomerIcNameBoard namePrefix={namePrefix} name={name} />
      <CustomerInfo
        namePrefix={namePrefix}
        name={name}
        onNamePrefixChange={handleNamePrefixChange}
        onNameChange={handleNameChange}
      />
    </div>
  );
};

export default CustomerDisplayHub;
