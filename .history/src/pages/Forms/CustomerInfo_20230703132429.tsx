import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Button, Col, Form, Input, Radio, Row, Select, Tag } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
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
    const [stateData, setStateData] = useState("");

    const fetchStateData = useMemo(
      () =>
        debounce(async (postcode: string) => {
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
        }, 300),
      []
    );

    const fetchCountries = useMemo(
      () =>
        debounce(async () => {
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
        }, 300),
      []
    );

    useEffect(() => {
      fetchCountries();
    }, [fetchCountries]);

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

    const handlePostcodeChange = (value: string) => {
      setPostcode(value);
      fetchStateData(value);
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
                  <Form.Item
                    label="Race"
                    name="race"
                    rules={[{ required: true, message: "Please select Race" }]}
                  >
                    <Select
                      style={{ width: "md" }}
                      placeholder="Please select a Race"
                    >
                      <Select.Option value="C">
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
                      </Select.Option>
                      <Select.Option value="I">
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
                      </Select.Option>
                      <Select.Option value="M">
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
                      </Select.Option>
                      <Select.Option value="O">
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
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <ProFormText
                    width="md"
                    name="dob"
                    label="D.O.B"
                    disabled
                    placeholder={
                      inputIcNumber
                        ? formatDob(extractDobFromIcNumber(inputIcNumber))
                        : ""
                    }
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
              </Row>
            </ProForm.Group>

            <ProForm.Group>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    tooltip="Valid and contactable mobile number"
                    rules={[
                      {
                        required: true,
                        message: "Please input a valid mobile number",
                      },
                      {
                        validator: validateDigitsOnly,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter mobile number"
                      value={mobileNumber}
                      onChange={(e) => onMobileNumberChange(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Home Number"
                    name="homeNumber"
                    rules={[
                      {
                        validator: validateDigitsOnly,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter home number"
                      value={homeNumber}
                      onChange={(e) => onHomeNumberChange(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Alternative Number"
                    name="alternativeNumber"
                    rules={[
                      {
                        validator: validateDigitsOnly,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter alternative number"
                      value={alternativeNumber}
                      onChange={(e) =>
                        onAlternativeNumberChange(e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div style={{ padding: "0" }}>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter address",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: 300 }}
                      placeholder="Select an address"
                      value={addressData}
                      onChange={(value: string[]) => setAddressData(value)}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option?.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value="1, Jalan ABC, 12345, City">
                        1, Jalan ABC, 12345, City
                      </Select.Option>
                      <Select.Option value="2, Jalan DEF, 67890, Town">
                        2, Jalan DEF, 67890, Town
                      </Select.Option>
                      <Select.Option value="3, Jalan GHI, 13579, Village">
                        3, Jalan GHI, 13579, Village
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Postcode"
                    name="postcode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter postcode",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter postcode"
                      value={postcode}
                      onChange={(e) => handlePostcodeChange(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </ProForm.Group>

            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    width="md"
                    name="city"
                    label="City"
                    disabled
                    placeholder="City"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    width="md"
                    name="state"
                    label="State"
                    disabled
                    placeholder={stateData}
                  />
                </Col>
              </Row>
            </ProForm.Group>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handlePrevStep}>Previous</Button>
              <Button type="primary" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div style={{ padding: "0" }}>
            <Form layout="vertical" onFinish={handleSubmit}>
              <ProForm.Group>
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      width="md"
                      name="relationship"
                      label="Relationship"
                      disabled
                      placeholder="Relationship"
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      width="md"
                      name="contactPerson"
                      label="Contact Person"
                      disabled
                      placeholder="Contact Person"
                    />
                  </Col>
                </Row>
              </ProForm.Group>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handlePrevStep}>Previous</Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
);

export default CustomerInfo;
