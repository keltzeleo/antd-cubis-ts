import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Form, Input, Row, Select } from "antd";
import SquircleBorder from "../../customComponents/SquircleBorder/SquircleBorder";
import light from "../../../src/tokens/light.json";

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
    const dob = icNumber.substr(0, 6); // Extract the DDMMYY portion from the icNumber
    const day = dob.substr(0, 2);
    const month = dob.substr(2, 2);
    const year = dob.substr(4, 2); // Extract the year part from the dob

    const currentYear = new Date().getFullYear(); // Get the current year

    let centuryPrefix = ""; // Determine the century prefix dynamically

    if (parseInt(year, 10) > currentYear % 100) {
      // If the year is greater than the last two digits of the current year, assume it belongs to the previous century
      centuryPrefix = (currentYear - 100).toString().substr(0, 2);
    } else {
      // Otherwise, assume it belongs to the current century
      centuryPrefix = currentYear.toString().substr(0, 2);
    }

    const formattedDob = `${dob.substr(0, 2)}-${dob.substr(
      2,
      2
    )}-${centuryPrefix}${year}`;
    return formattedDob;
  };

  const calculateAge = (dob: string): number => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
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
                    <Option value="">Title</Option>
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Mdm.">Mdm.</Option>
                    <Option value="Dr.">Dr.</Option>
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
              <Form.Item
                label="Race"
                name="race"
                rules={[{ required: true, message: "Please select Race" }]}
              >
                <Select style={{ width: "md" }} placeholder="Select Race">
                  <Select.Option value="C">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SquircleBorder
                        size={25}
                        curvature={0.43}
                        backgroundColor= "light["cyan.3"]"
                        rotate={0}
                        borderType="dashed"
                        borderWidth={1}
                        borderColor=""
                        fontWeight={700}
                        character="C"
                      />
                      <span style={{ marginLeft: "8px" }}>Chinese</span>
                    </div>
                  </Select.Option>
                  <Select.Option value="I">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SquircleBorder character="I" />
                      <span style={{ marginLeft: "8px" }}>Indian</span>
                    </div>
                  </Select.Option>
                  <Select.Option value="M">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SquircleBorder character="M" />
                      <span style={{ marginLeft: "8px" }}>Malay</span>
                    </div>
                  </Select.Option>
                  <Select.Option value="O">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SquircleBorder character="O" />
                      <span style={{ marginLeft: "8px" }}>Others</span>
                    </div>
                  </Select.Option>
                </Select>
              </Form.Item>
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
                label="Alternative Number"
                name="alternativeNumber"
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
