import { Button, Col, Form, Input, Radio, Row, Select, Space, Steps, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import light from "../../../src/tokens/light.json";
import SquircleBorder from "../../customComponents/SquircleBorder/SquircleBorder";
import { ProForm, ProFormText } from "@ant-design/pro-form";

const { Option } = Select;
const { Step } = Steps;

const steps = [
  {
    title: "Customer Information",
  },
  {
    title: "Customer Address",
  },
  {
    title: "Sub-Contact",
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
  const [postcode, setPostcode] = useState<string>("");
  const [stateData, setStateData] = useState<string>("");

  useEffect(() => {
    const fetchStateData = async () => {
      if (postcode.length === 5) {
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
      }
    };

    fetchStateData();
  }, [postcode]);

  const handlePostcodeChange = async (value: string) => {
    setPostcode(value);
    try {
      const response = await axios.get(`https://api.postcode.my/postcode/${value}`);
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
    const centuryPrefix =
      currentYear - (parseInt(year, 10) > currentYear % 100 ? 100 : 0)
    ).toString().substr(0, 2);

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

    if (addressData.length > 0) {
      const postcode = addressData[0];
      setStateData(postcode);
    }
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

  return (
    <div className="customer-info">
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="steps-container">
          <Steps current={currentStep}>
            {steps.map((step) => (
              <Step key={step.title} title={step.title} />
            ))}
          </Steps>
        </div>

        <div className="form-content">
          {currentStep === 0 && (
            <>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Name Prefix"
                    name="customerTitle"
                    initialValue={customerTitle}
                  >
                    <Select
                      placeholder="Select a prefix"
                      onChange={handleNamePrefixChange}
                    >
                      <Option value="Mr">Mr</Option>
                      <Option value="Ms">Ms</Option>
                      <Option value="Mrs">Mrs</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={18}>
                  <Form.Item
                    label="Full Name"
                    name="customerName"
                    initialValue={customerName}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name.",
                      },
                    ]}
                  >
                    <Input placeholder="Full Name" onChange={handleNameChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="IC Number"
                    name="icNumber"
                    initialValue={inputIcNumber}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your IC number.",
                      },
                      {
                        pattern: /^\d{12}$/,
                        message: "Please enter a valid IC number.",
                      },
                      {
                        validator: validateDigitsOnly,
                      },
                    ]}
                  >
                    <Input placeholder="IC Number" disabled={age > 0} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    initialValue={mobileNumber}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mobile number.",
                      },
                      {
                        validator: validateDigitsOnly,
                      },
                    ]}
                  >
                    <Input placeholder="Mobile Number" onChange={onMobileNumberChange} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Home Number"
                    name="homeNumber"
                    initialValue={homeNumber}
                    rules={[
                      {
                        validator: validateDigitsOnly,
                      },
                    ]}
                  >
                    <Input placeholder="Home Number" onChange={onHomeNumberChange} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Alternative Number"
                    name="alternativeNumber"
                    initialValue={alternativeNumber}
                    rules={[
                      {
                        validator: validateDigitsOnly,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Alternative Number"
                      onChange={onAlternativeNumberChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Citizenship"
                    name="citizenship"
                    initialValue={citizenship}
                    rules={[
                      {
                        required: true,
                        message: "Please select your citizenship.",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select your citizenship"
                      onChange={onCitizenshipChange}
                    >
                      {countries.map((country) => (
                        <Option key={country.value} value={country.value}>
                          {country.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    initialValue={nationality}
                  >
                    <Select
                      placeholder="Select your nationality"
                      value={selectedCountry?.value ?? undefined}
                      onChange={handleCountryChange}
                    >
                      {countries.map((country) => (
                        <Option key={country.value} value={country.value}>
                          {country.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {currentStep === 1 && (
            <>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Address"
                    name="address"
                    initialValue={addressData}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your address.",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Search for your address"
                      filterOption={(input, option) =>
                        option?.children?.toString().indexOf(input) >= 0
                      }
                      onChange={(value: string[]) => setAddressData(value)}
                      onSearch={handlePostcodeChange}
                      notFoundContent={null}
                    >
                      {addressData.map((address) => (
                        <Option key={address} value={address}>
                          {address}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Postcode"
                    name="postcode"
                    initialValue={postcode}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your postcode.",
                      },
                      {
                        pattern: /^\d{5}$/,
                        message: "Please enter a valid postcode.",
                      },
                      {
                        validator: validateDigitsOnly,
                      },
                    ]}
                  >
                    <Input placeholder="Postcode" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="State"
                    name="state"
                    initialValue={stateData}
                  >
                    <Input placeholder="State" disabled />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {currentStep === 2 && (
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Sub-Contact"
                  name="subContact"
                  initialValue=""
                  rules={[
                    {
                      required: true,
                      message: "Please enter your sub-contact.",
                    },
                  ]}
                >
                  <Input placeholder="Sub-Contact" />
                </Form.Item>
              </Col>
            </Row>
          )}
        </div>

        <div className="form-actions">
          <Space>
            {currentStep > 0 && (
              <Button onClick={handlePrevStep}>Previous</Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNextStep}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default CustomerInfo;
