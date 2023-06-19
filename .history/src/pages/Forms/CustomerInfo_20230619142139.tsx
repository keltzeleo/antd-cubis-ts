import { Input, Select } from "antd";

const { Option } = Select;

interface CustomerInfoProps {
  onCustomerTitleChange: (value: string | undefined) => void;
  onCustomerNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  onCustomerTitleChange,
  onCustomerNameChange,
}) => {
  // ... other code ...

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerNameChange(e);
  };

  return (
    <div
      style={{
        border: "0",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "",
      }}
    >
      {/* ... other code ... */}
      <div style={{ marginBottom: 8 }}>Enter Name</div>
      <Input
        addonBefore={
          <Select defaultValue="Mr." onChange={onCustomerTitleChange}>
            <Option value="Mr.">Mr.</Option>
            <Option value="Ms.">Ms.</Option>
            <Option value="Mdm.">Mdm.</Option>
          </Select>
        }
        value={customerName}
        onChange={handleNameChange}
        placeholder="Full Name"
        style={{ minWidth: 300 }}
      />
      {/* ... other code ... */}
    </div>
  );
};

export default CustomerInfo;
