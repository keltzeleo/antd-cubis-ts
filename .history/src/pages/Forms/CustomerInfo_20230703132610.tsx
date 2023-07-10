import { Button, Col, Form, Input, Radio, Row, Select, Tag } from "antd";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import light from "../../../src/tokens/light.json";

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

const CustomerInfo: React.FC<CustomerInfoProps> = React.memo(
  ({
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
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
      null
    );
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
          const response = await axios.get(
            "https://restcountries.com/v3.1/all"
          );
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
          <div style={{ padding: "0" }}>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    width="md"
                    name="branch"
                    label="Branch Site"
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
                  <Form.Item
                    label="ID Number"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <ProFormText
                      width="md"
                      name="id"
                      disabled
                      placeholder={inputIcNumber}
                    />
                  </Form.Item>
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
                        const children = option?.props.children
                          ?.toString()
                          ?.toLowerCase();
                        return children?.indexOf(input.toLowerCase()) >= 0;
                      }}
                    >
                      {countries.map((country) => (
                        <Option key={country.value} value={country.value}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={country.flag}
                              alt={country.label}
                              style={{ width: "20px", marginRight: "8px" }}
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
                <Col span={12}>
                  <Form.Item label="Mobile Number">
                    <Input
                      value={mobileNumber}
                      onChange={(e) => onMobileNumberChange(e.target.value)}
                      placeholder="Mobile Number"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Home Number">
                    <Input
                      value={homeNumber}
                      onChange={(e) => onHomeNumberChange(e.target.value)}
                      placeholder="Home Number"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Alternative Number">
                    <Input
                      value={alternativeNumber}
                      onChange={(e) =>
                        onAlternativeNumberChange(e.target.value)
                      }
                      placeholder="Alternative Number"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date of Birth">
                    <Input
                      value={formatDob(dobFromId)}
                      disabled
                      placeholder="Date of Birth"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>
          </div>
        )}
        {currentStep === 1 && (
          <div style={{ padding: "0" }}>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Address Line 1">
                    <Input
                      value={addressData[0]}
                      onChange={(e) =>
                        setAddressData([
                          e.target.value,
                          ...addressData.slice(1),
                        ])
                      }
                      placeholder="Address Line 1"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Address Line 2">
                    <Input
                      value={addressData[1]}
                      onChange={(e) =>
                        setAddressData([addressData[0], e.target.value])
                      }
                      placeholder="Address Line 2"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Postcode">
                    <Input
                      value={postcode}
                      onChange={(e) => handlePostcodeChange(e.target.value)}
                      placeholder="Postcode"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="City">
                    <Input value={stateData} disabled />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>
          </div>
        )}
        {currentStep === 2 && (
          <div style={{ padding: "0" }}>{/* Sub-contact form fields */}</div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {currentStep > 0 && (
            <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
              Previous
            </Button>
          )}
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
  }
);

export default CustomerInfo;
