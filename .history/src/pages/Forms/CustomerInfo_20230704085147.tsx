import { ProForm, ProFormItem, ProFormText } from "@ant-design/pro-form";
import { Button, Col, Form, Input, Radio, Row, Select, Space, Tag } from "antd";

import axios from "axios";
import { useEffect, useState } from "react";
import light from "../../../src/tokens/light.json";

import SquircleBorder from "../../customComponents/SquircleBorder/SquircleBorder";

const { Option } = Select;

const Step = [
  {
    title: "Customer Information",
  },
  {
    title: "Consumer Address",
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

  // Add this line

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
      const response = await axios.get(`https://api.postcode.my/postcode/`);
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
      return Promise.reject("Please enter digits only.");
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
        {Step.map((step, index) => (
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
                <ProFormItem label="Enter Name">
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
                    value={customerName}
                    onChange={handleNameChange}
                    placeholder="Full Name"
                  />
                </ProFormItem>
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
                <ProFormText
                  fieldProps={{
                    addonBefore: "+60",
                  }}
                  width="md"
                  name="mobileNumber"
                  label="Mobile Number"
                  tooltip="Valid and contactable mobile number"
                  rules={[
                    {
                      pattern: /^\d+$/, // Use a regular expression pattern to enforce numeric input
                      validator: validateDigitsOnly,
                      message: "Please enter digits only.",
                    },
                  ]}
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  fieldProps={{
                    addonBefore: "+60",
                  }}
                  width="md"
                  name="homeUseNumber"
                  label="Home Number"
                  tooltip="Valid home use contact number"
                  rules={[{ validator: validateDigitsOnly }]}
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  fieldProps={{
                    addonBefore: "+60",
                  }}
                  width="md"
                  name="otherContact"
                  label="Other Contact Number"
                  tooltip="Valid alternative contact number"
                  rules={[{ validator: validateDigitsOnly }]}
                />
              </Col>
            </Row>
          </ProForm.Group>
          <ProForm.Group>
            <Row gutter={16}>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="email"
                  label="Customer Email"
                  //disabled
                  placeholder="Contactable Email Address"
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="faxNumber"
                  label="Fax Number"
                  //disabled
                  placeholder="Fax Number if Available"
                />
              </Col>
              <Col span={8}>
                <Form.Item label="Preferred Contact Channel">
                  <Radio.Group>
                    <Radio style={{ marginLeft: 16 }} value="email">
                      E-Mail
                    </Radio>
                    <Radio style={{ marginLeft: 16 }} value="sms">
                      SMS{" "}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </ProForm.Group>
          <div>
            <Button type="primary" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </div>
      )}
      {currentStep === 1 && (
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={6}>
              <ProFormText
                width="md"
                name="lotNo"
                label="Lot No."
                placeholder="Lot Number"
              />
            </Col>
            <Col span={6}>
              <ProFormText
                width="md"
                name="blockNo"
                label="Block"
                placeholder="Block Number"
              />
            </Col>
            <Col span={12}>
              <ProForm.Item>
                <Space.Compact>
                  <Col style={{ width: "100px" }}>
                    <ProFormText
                      width="md"
                      name="premiseNo"
                      label="Premise No."
                      placeholder="Number"
                    />
                  </Col>
                  <Col style={{ width: "200px" }}>
                    <ProFormText
                      name="premiseName"
                      label="Premise Name"
                      placeholder="Premise Name"
                    />
                  </Col>
                </Space.Compact>
              </ProForm.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText width="md" name="garden" label="Garden" />
            </Col>
            <Col span={12}>
              <ProFormText width="md" name="section" label="Section" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText width="md" name="village" label="Village" />
            </Col>
            <Col span={12}>
              <ProFormText width="md" name="area" label="Area" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ProForm.Item>
                <Space.Compact>
                  <Col style={{ width: "100px" }}>
                    <ProFormText
                      width="md"
                      name="postcode"
                      label="Postcode"
                      fieldProps={{
                        onChange: (event) =>
                          handlePostcodeChange(event.target.value),
                      }}
                    />
                  </Col>
                  <Col style={{ width: "200px" }}>
                    <ProFormText
                      name="postcodeArea"
                      label="Postcode Area"
                      placeholder="Postcode Area"
                      initialValue={addressData[0]}
                    />
                  </Col>
                </Space.Compact>
              </ProForm.Item>
            </Col>
            <Col span={12}>
              <ProFormText
                width="md"
                name="state"
                label="State"
                initialValue={addressData[0]}
              />
            </Col>
          </Row>
          <div>
            <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
              Previous
            </Button>
            <Button type="primary" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </ProForm.Group>
      )}
      {currentStep === 2 && (
        // Render form fields for "Related Family, Name, and Contact Number" step
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                width="md"
                name="otherContactName"
                label="Other Contact Name"
                placeholder="Sub-holder name"
              />
            </Col>
            <Col span={12}>
              <Form.Item
                label="Other Contact Number"
                name="otherContactNumber"
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
                  value="otherContactNumber"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <ProFormText
                width="md"
                name="relationship"
                label="Relationship"
                placeholder=""
              />
            </Col>
          </Row>
          <div>
            <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
              Previous
            </Button>
            <Button type="primary" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </ProForm.Group>
      )}
      {/* {currentStep === 3 && (
        // Render form fields for "Proceed to Account Registration" step
        <div>
          <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
            Previous
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default CustomerInfo;
