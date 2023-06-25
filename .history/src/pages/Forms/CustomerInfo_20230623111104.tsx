import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Form, Input, Radio, Row, Select } from "antd";
import countries from "countries-list";

const { Option } = Select;

const nationalities = Object.values(countries.countries).map(
  (country) => country.nationality
);

interface CustomerInfoProps {
  customerTitle: string | undefined;
  customerName: string;
  inputIcNumber: string;
  mobileNumber: string;
  homeNumber: string;
  alternativeNumber: string;
  nationality: string;
  onCustomerTitleChange: (value: string | undefined) => void;
  onCustomerNameChange: (value: string) => void;
  onMobileNumberChange: (value: string) => void;
  onHomeNumberChange: (value: string) => void;
  onAlternativeNumberChange: (value: string) => void;
  onNationalityChange: (value: string) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerTitle,
  customerName,
  inputIcNumber,
  mobileNumber,
  homeNumber,
  alternativeNumber,
  nationality,
  onCustomerTitleChange,
  onCustomerNameChange,
  onMobileNumberChange,
  onHomeNumberChange,
  onAlternativeNumberChange,
  onNationalityChange,
}) => {
  const extractDobFromIcNumber = (icNumber: string): string => {
    const dob = icNumber.substr(0, 6);
    // Rest of the code...
  };

  const calculateAge = (dob: string): number => {
    const today = new Date();
    // Rest of the code...
  };

  const handleNamePrefixChange = (value: string | undefined) => {
    onCustomerTitleChange(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerNameChange(e.target.value);
  };

  const handleNationalityChange = (value: string) => {
    onNationalityChange(value);
  };

  const formattedDob = inputIcNumber
    ? extractDobFromIcNumber(inputIcNumber)
    : "";
  const age = formattedDob ? calculateAge(formattedDob) : 0;

  const validateDigitsOnly = (_: any, value: string) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject(new Error("Please enter digits only."));
    }
    return Promise.resolve();
  };

  return (
    <div
      style={{ border: "0", borderRadius: 8, padding: 16, backgroundColor: "" }}
    >
      <ProForm>
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText width="md" name="branch" label="Branch" disabled />
            </Col>
            <Col span={12}>
              <ProFormText
                width="md"
                name="customerNo"
                label="Customer No"
                disabled
              />
            </Col>
          </Row>
        </ProForm.Group>
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                width="md"
                name="id"
                label="ID"
                disabled
                placeholder={inputIcNumber}
              />
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: "red" }}>*</span> Enter Name
              </div>
              <Input
                addonBefore={
                  <Select
                    style={{ width: 85 }}
                    defaultValue=""
                    onChange={handleNamePrefixChange}
                  >
                    <Option value="">Select</Option>
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Mdm.">Mdm.</Option>
                  </Select>
                }
                value={customerName}
                onChange={handleNameChange}
                placeholder="Full Name"
              />
            </Col>
          </Row>
        </ProForm.Group>
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={8}>
              <ProFormText
                width="md"
                name="dob"
                label="D.O.B"
                disabled
                placeholder={formattedDob}
              />
            </Col>
            <Col span={8}>
              <ProFormText
                width="md"
                name="age"
                label="Age"
                disabled
                placeholder={age.toString()}
              />
            </Col>
            <Col span={8}>
              <ProFormText
                width="md"
                name="race"
                label="Race"
                rules={[{ required: true, message: "Please enter Race" }]}
              />
            </Col>
          </Row>
        </ProForm.Group>
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                tooltip="Valid and contactable mobile number"
                rules={[{ validator: validateDigitsOnly }]}
              >
                <Input
                  style={{
                    width: "",
                    minWidth: "",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  addonBefore="+60"
                  placeholder="Contactable number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Home Number"
                name="homeUseNumber"
                tooltip="Valid home use contact number"
                rules={[{ validator: validateDigitsOnly }]}
              >
                <Input
                  style={{
                    width: "",
                    minWidth: "",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  addonBefore="+60"
                  placeholder="Home use number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Other Contact Number"
                name="otherContactNumber"
                tooltip="Valid alternative contact number"
                rules={[{ validator: validateDigitsOnly }]}
              >
                <Input
                  style={{
                    width: "",
                    minWidth: "",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  addonBefore="+60"
                  placeholder="Alternative contact number"
                />
              </Form.Item>
            </Col>
          </Row>
        </ProForm.Group>
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: "red" }}>*</span> Nationality
              </div>
              <Select
                showSearch
                value={nationality}
                onChange={handleNationalityChange}
                placeholder="Select Nationality"
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="">-- select one --</Option>
                {nationalities.map((nationality) => (
                  <Option key={nationality} value={nationality}>
                    {nationality}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: "red" }}>*</span> Citizenship
              </div>
              <Radio.Group
                onChange={handleCitizenshipChange}
                value={citizenship}
              >
                <Radio value="Malaysian">Malaysian</Radio>
                <Radio value="Non-Malaysia">Non-Malaysia</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </ProForm.Group>
      </ProForm>
    </div>
  );
};

export default CustomerInfo;
