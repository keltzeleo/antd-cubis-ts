import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Button, Col, Form, Input, Radio, Row, Select, Steps, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import light from "../../../src/tokens/light.json";

const { Option } = Select;
const { Step } = Steps;

const steps = [
  {
    title: "Customer Information",
  },
  {
    title: "Consumer Address",
  },
  {
    title: "Related Family, Name, and Contact Number",
  },
  {
    title: "Proceed to Account Registration",
  },
];

interface Country {
  label: string;
  value: string;
  flag: string;
}

interface CustomerInfoProps {
  customerTitle: string | undefined;
  customerName: string;
  inputIcNumber: string;
  mobileNumber: string;
  homeNumber: string;
  alternativeNumber: string;
  citizenship: string;
  nationality: string | null;
  onCustomerTitleChange: (value: string | undefined) => void;
  onCustomerNameChange: (value: string) => void;
  onMobileNumberChange: (value: string) => void;
  onHomeNumberChange: (value: string) => void;
  onAlternativeNumberChange: (value: string) => void;
  onCitizenshipChange: (value: string) => void;
  onNationalityChange: (value: string | null) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerTitle,
  customerName,
  inputIcNumber,
  mobileNumber,
  homeNumber,
  alternativeNumber,
  citizenship,
  nationality,
  onCustomerTitleChange,
  onCustomerNameChange,
  onMobileNumberChange,
  onHomeNumberChange,
  onAlternativeNumberChange,
  onCitizenshipChange,
  onNationalityChange,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dobFromId, setDobFromId] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [addressData, setAddressData] = useState<string[]>([]);
  const [stateData, setStateData] = useState<string>("");

  useEffect(() => {
    if (addressData.length > 0) {
      const postcode = addressData[0];
      fetchStateData(postcode);
    }
  }, [addressData]);

  const fetchStateData = async (postcode: string) => {
    try {
      const response = await axios.get(
        `https://api.postcode.my/postcode/${postcode}`
      );
      if (response.status === 200) {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const state = data[0].state;
          setStateData(state);
        }
      }
    } catch (error) {
      console.log("Error fetching state data:", error);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countriesData = response.data.map((country: any) => ({
          label: country.name.common,
          value: country.name.common,
          flag: country.flags.png,
        }));

        countriesData.sort((a: Country, b: Country) =>
          a.label.localeCompare(b.label)
        );

        setCountries(countriesData);
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const extractDobFromIcNumber = (icNumber: string): string => {
    const year = icNumber.substr(0, 2);
    const month = icNumber.substr(2, 2);
    const date = icNumber.substr(4, 2);
    const currentYear = new Date().getFullYear();
    const centuryPrefix = (
      currentYear - (parseInt(year, 10) > currentYear % 100 ? 100 : 0)
    )
      .toString()
      .substr(0, 2);

    const formattedDob = `${date}-${month}-${centuryPrefix}${year}`;
    return formattedDob;
  };

  const calculateAge = (dob: string): number => {
    const today = new Date();
    const birthDate = new Date(
      parseInt(dob.substring(6, 10), 10),
      parseInt(dob.substring(3, 5), 10) - 1,
      parseInt(dob.substring(0, 2), 10)
    );

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const formattedDob = inputIcNumber
      ? extractDobFromIcNumber(inputIcNumber)
      : "";
    const age = formattedDob ? calculateAge(formattedDob) : 0;

    setDobFromId(formattedDob);
    setAge(age);
  }, [inputIcNumber]);

  const handleCountryChange = (selectedOption: Country | null) => {
    setSelectedCountry(selectedOption);
    onNationalityChange(selectedOption?.value ?? null);
  };

  const handleNamePrefixChange = (value: string | undefined) => {
    onCustomerTitleChange(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerNameChange(e.target.value);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  const validateDigitsOnly = (_: any, value: string) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject(new Error("Please enter digits only."));
    }
    return Promise.resolve();
  };

  const formatDob = (dob: string): string => {
    const dateParts = dob.split("-");
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      return `${day}-${month}-${year}`;
    }
    return dob;
  };

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ marginBottom: "16px" }}>
        {steps.map((step, index) => (
          <Tag
            key={index}
            color={currentStep === index ? light["cyan.6"] : "gray"}
            onClick={() => setCurrentStep(index)}
          >
            {step.title}
          </Tag>
        ))}
      </div>

      {currentStep === 0 && (
        <div style={{ padding: "16px" }}>
          <ProForm>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    width="md"
                    name="branch"
                    label="Branch"
                    disabled
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    width="md"
                    name="customerNo"
                    label="Customer Number"
                    disabled
                  />
                </Col>
              </Row>
            </ProForm.Group>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Enter Name">
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
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <ProFormText
                    width="md"
                    name="id"
                    label="ID"
                    disabled
                    placeholder={inputIcNumber}
                  />
                </Col>
              </Row>
            </ProForm.Group>

            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Citizenship">
                    <Radio.Group
                      value={citizenship}
                      onChange={(e) => onCitizenshipChange(e.target.value)}
                    >
                      <Radio style={{ marginLeft: 16 }} value="Malaysian">
                        Malaysian
                      </Radio>
                      <Radio style={{ marginLeft: 16 }} value="Non-Malaysian">
                        Non-Malaysian
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Nationality">
                    <Select
                      showSearch
                      style={{ width: 300, marginBottom: 0 }}
                      placeholder="Select a Nationality"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      optionFilterProp="children"
                      filterOption={(input, option) => {
                        const countryLabel =
                          option?.label?.toString()?.toLowerCase() ?? "";
                        const countryValue =
                          option?.value?.toString()?.toLowerCase() ?? "";
                        const inputValue =
                          input?.toString()?.toLowerCase() ?? "";

                        return (
                          countryLabel.includes(inputValue) ||
                          countryValue.includes(inputValue)
                        );
                      }}
                    >
                      {countries.map((country) => (
                        <Option key={country.value} value={country.value}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={country.flag}
                              alt={`${country.label} Flag`}
                              style={{ width: "20px", marginRight: "12px" }}
                            />
                            {country.label}
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>

            <ProForm.Group>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Mobile Number">
                    <Input
                      addonBefore="+60"
                      value={mobileNumber}
                      onChange={(e) => onMobileNumberChange(e.target.value)}
                      placeholder="Mobile Number"
                      maxLength={9}
                      allowClear
                      rules={[
                        {
                          required: true,
                          message: "Please enter mobile number",
                        },
                        { validator: validateDigitsOnly },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Home Number">
                    <Input
                      addonBefore="+60"
                      value={homeNumber}
                      onChange={(e) => onHomeNumberChange(e.target.value)}
                      placeholder="Home Number"
                      maxLength={9}
                      allowClear
                      rules={[{ validator: validateDigitsOnly }]}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Alternative Number">
                    <Input
                      addonBefore="+60"
                      value={alternativeNumber}
                      onChange={(e) =>
                        onAlternativeNumberChange(e.target.value)
                      }
                      placeholder="Alternative Number"
                      maxLength={9}
                      allowClear
                      rules={[{ validator: validateDigitsOnly }]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>
          </ProForm>
        </div>
      )}

      {currentStep === 1 && (
        <div style={{ padding: "16px" }}>
          <ProForm>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Address Line 1">
                    <Input
                      placeholder="Address Line 1"
                      onChange={(e) =>
                        setAddressData((prevData) => {
                          const newData = [...prevData];
                          newData[0] = e.target.value;
                          return newData;
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Address Line 2">
                    <Input
                      placeholder="Address Line 2"
                      onChange={(e) =>
                        setAddressData((prevData) => {
                          const newData = [...prevData];
                          newData[1] = e.target.value;
                          return newData;
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Address Line 3">
                    <Input
                      placeholder="Address Line 3"
                      onChange={(e) =>
                        setAddressData((prevData) => {
                          const newData = [...prevData];
                          newData[2] = e.target.value;
                          return newData;
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>

            <ProForm.Group>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Postcode">
                    <Input
                      placeholder="Postcode"
                      onChange={(e) =>
                        setAddressData((prevData) => {
                          const newData = [...prevData];
                          newData[3] = e.target.value;
                          return newData;
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="City">
                    <Input
                      placeholder="City"
                      onChange={(e) =>
                        setAddressData((prevData) => {
                          const newData = [...prevData];
                          newData[4] = e.target.value;
                          return newData;
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="State">
                    <Input placeholder="State" disabled value={stateData} />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>
          </ProForm>
        </div>
      )}

      {currentStep === 2 && (
        <div style={{ padding: "16px" }}>
          <ProForm>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="DoB from ID">
                    <Input
                      placeholder="DoB from ID"
                      value={formatDob(dobFromId)}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Age">
                    <Input placeholder="Age" value={age} disabled />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>
          </ProForm>
        </div>
      )}

      {currentStep === 3 && (
        <div style={{ padding: "16px" }}>
          <ProForm>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Username">
                    <Input placeholder="Username" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Password">
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>
          </ProForm>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentStep > 0 && <Button onClick={handlePrevStep}>Previous</Button>}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomerInfo;
