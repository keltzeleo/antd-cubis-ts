import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Form, Input, Radio, Row, Select } from "antd";
import { countries } from "countries-list";

const { Option } = Select;

interface CustomerInfoProps {
  customerTitle: string | undefined;
  customerName: string;
  inputIcNumber: string;
  mobileNumber: string;
  homeNumber: string;
  alternativeNumber: string;
  onCustomerTitleChange: (value: string | undefined) => void;
  onCustomerNameChange: (value: string) => void;
  onMobileNumberChange: (value: string) => void;
  onHomeNumberChange: (value: string) => void;
  onAlternativeNumberChange: (value: string) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerTitle,
  customerName,
  inputIcNumber,
  mobileNumber,
  homeNumber,
  alternativeNumber,
  onCustomerTitleChange,
  onCustomerNameChange,
  onMobileNumberChange,
  onHomeNumberChange,
  onAlternativeNumberChange,
}) => {
  const extractDobFromIcNumber = (icNumber: string): string => {
    // Remaining code...
  };

  const calculateAge = (dob: string): number => {
    // Remaining code...
  };

  const handleNamePrefixChange = (value: string | undefined) => {
    onCustomerTitleChange(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerNameChange(e.target.value);
  };

  const formattedDob = inputIcNumber
    ? extractDobFromIcNumber(inputIcNumber)
    : "";
  const age = formattedDob ? calculateAge(formattedDob) : 0;

  const validateDigitsOnly = (_: any, value: string) => {
    // Remaining code...
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
            <Col span={8}>
              <Form.Item
                label="Citizenship"
                name="citizenship"
                rules={[
                  { required: true, message: "Please select Citizenship" },
                ]}
              >
                <Radio.Group>
                  <Radio value="Malaysian">Malaysian</Radio>
                  <Radio value="Non-Malaysian">Non-Malaysian</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Nationality"
                name="nationality"
                rules={[
                  { required: true, message: "Please select Nationality" },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      ? (option.children as string)
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      : false
                  }
                >
                  {Object.keys(countries).map((code) => (
                    <Option key={code} value={code}>
                      {countries[code as keyof typeof countries]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
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
      </ProForm>
    </div>
  );
};

export default CustomerInfo;
