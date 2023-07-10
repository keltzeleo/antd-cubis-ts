import { Button, Col, Form, Input, Radio, Row, Select, Space, Tag } from "antd";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import light from "../../../src/tokens/light.json";
import SquircleBorder from "../../customComponents/SquircleBorder/SquircleBorder";

const { Option } = Select;
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
  const [stateData, setStateData] = useState("");

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
      const response = await axios.get(
        `https://api.postcode.my/postcode/${value}`
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

    if (addressData.length > 0) {
      const postcode = addressData[0];
      setStateData(postcode);
    }
  };

  const handleNamePrefixChange = (value: string | undefined) => {
    onCustomerTitleChange(value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const validateForm = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
    } catch (error) {
      console.log("Form validation error:", error);
    }
  };

  const [form] = Form.useForm();

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
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          customerName,
          inputIcNumber,
          mobileNumber,
          homeNumber,
          alternativeNumber,
          citizenship,
          selectedCountry,
          customerTitle,
        }}
        scrollToFirstError
      >
        {currentStep === 0 && (
          <div style={{ padding: "0" }}>
            <Form.Item
              label="Branch Site"
              name="branch"
              initialValue=""
              disabled
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Customer Number"
              name="customerNo"
              initialValue=""
              disabled
            >
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Enter Name"
                  name="customerName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                  ]}
                >
                  <Input
                    addonBefore={
                      <Select defaultValue="" onChange={handleNamePrefixChange}>
                        <Option value="">Title</Option>
                        <Option value="Mr.">Mr.</Option>
                        <Option value="Ms.">Ms.</Option>
                        <Option value="Mdm.">Mdm.</Option>
                        <Option value="Dr.">Dr.</Option>
                      </Select>
                    }
                    onChange={handleNameChange}
                    placeholder="Full Name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="ID Number"
                  name="inputIcNumber"
                  initialValue=""
                  rules={[
                    {
                      required: true,
                      message: "Please enter your ID number",
                    },
                  ]}
                >
                  <Input placeholder="ID Number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Citizenship"
                  name="citizenship"
                  initialValue="Malaysian"
                >
                  <Radio.Group>
                    <Radio value="Malaysian">Malaysian</Radio>
                    <Radio value="Non-Malaysian">Non-Malaysian</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Nationality"
                  name="selectedCountry"
                  initialValue={null}
                >
                  <Select
                    showSearch
                    style={{ width: 300, marginBottom: 0 }}
                    placeholder="Select a Nationality"
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      const countryLabel =
                        option?.label?.toString()?.toLowerCase() ?? "";
                      const countryValue =
                        option?.value?.toString()?.toLowerCase() ?? "";
                      const inputValue = input?.toString()?.toLowerCase() ?? "";

                      return (
                        countryLabel.includes(inputValue) ||
                        countryValue.includes(inputValue)
                      );
                    }}
                  >
                    {countries.map((country) => (
                      <Option key={country.value} value={country.value}>
                        <div style={{ display: "flex", alignItems: "center" }}>
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
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Race"
                  name="race"
                  rules={[
                    {
                      required: true,
                      message: "Please select a race",
                    },
                  ]}
                >
                  <Select style={{ width: "md" }} placeholder="Select a Race">
                    <Option value="C">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SquircleBorder
                          size={20}
                          curvature={0.43}
                          backgroundColor={light["volcano.2"]}
                          rotate={0}
                          borderType="dashed"
                          borderWidth={1}
                          borderColor="transparent"
                          fontWeight={700}
                          character="C"
                        />
                        <span style={{ marginLeft: "8px" }}>Chinese</span>
                      </div>
                    </Option>
                    <Option value="I">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SquircleBorder
                          size={20}
                          curvature={0.43}
                          backgroundColor={light["magenta.2"]}
                          rotate={0}
                          borderType="dashed"
                          borderWidth={1}
                          borderColor="transparent"
                          fontWeight={700}
                          character="I"
                        />
                        <span style={{ marginLeft: "8px" }}>Indian</span>
                      </div>
                    </Option>
                    <Option value="M">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SquircleBorder
                          size={20}
                          curvature={0.43}
                          backgroundColor={light["grass.2"]}
                          rotate={0}
                          borderType="dashed"
                          borderWidth={1}
                          borderColor="transparent"
                          fontWeight={700}
                          character="M"
                        />
                        <span style={{ marginLeft: "8px" }}>Malay</span>
                      </div>
                    </Option>
                    <Option value="O">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SquircleBorder
                          size={20}
                          curvature={0.43}
                          backgroundColor={light["yellow.2"]}
                          rotate={0}
                          borderType="dashed"
                          borderWidth={1}
                          borderColor="transparent"
                          fontWeight={700}
                          character="O"
                        />
                        <span style={{ marginLeft: "8px" }}>Others</span>
                      </div>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="D.O.B" name="dob" initialValue={dobFromId}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Age" name="age" initialValue={age.toString()}>
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Mobile Number"
                  name="mobileNumber"
                  initialValue=""
                  rules={[
                    {
                      required: true,
                      message: "Please enter your mobile number",
                    },
                    {
                      validator: validateDigitsOnly,
                    },
                  ]}
                >
                  <Input placeholder="Mobile Number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Home Number"
                  name="homeNumber"
                  initialValue=""
                  rules={[
                    {
                      validator: validateDigitsOnly,
                    },
                  ]}
                >
                  <Input placeholder="Home Number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Alternative Number"
                  name="alternativeNumber"
                  initialValue=""
                  rules={[
                    {
                      validator: validateDigitsOnly,
                    },
                  ]}
                >
                  <Input placeholder="Alternative Number" />
                </Form.Item>
              </Col>
            </Row>
            <Space>
              <Button
                type="primary"
                onClick={handleNextStep}
                style={{ marginRight: "8px" }}
              >
                Next
              </Button>
              <Button onClick={validateForm}>Submit</Button>
            </Space>
          </div>
        )}

        {/* Other steps */}
      </Form>
    </div>
  );
};

export default CustomerInfo;
