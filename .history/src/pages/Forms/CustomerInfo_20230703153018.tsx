import { Button, Col, Form, Input, Radio, Row, Select, Tag } from "antd";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

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
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(
    null
  );
  const [homeNumberError, setHomeNumberError] = useState<string | null>(null);
  const [alternativeNumberError, setAlternativeNumberError] = useState<
    string | null
  >(null);

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

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ marginBottom: "16px" }}>
        {steps.map((step, index) => (
          <Tag
            key={index}
            color={currentStep === index ? "cyan" : "gray"}
            onClick={() => setCurrentStep(index)}
          >
            {step.title}
          </Tag>
        ))}
      </div>
      {currentStep === 0 && (
        <div style={{ padding: "0" }}>
          <Form>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Branch Site">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Customer Number">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Enter Name">
                  <Input.Group compact>
                    <Select
                      defaultValue=""
                      onChange={handleNamePrefixChange}
                      style={{ width: "25%" }}
                    >
                      <Option value="">Title</Option>
                      <Option value="Mr.">Mr.</Option>
                      <Option value="Ms.">Ms.</Option>
                      <Option value="Mdm.">Mdm.</Option>
                      <Option value="Dr.">Dr.</Option>
                    </Select>
                    <Input
                      value={customerName}
                      onChange={handleNameChange}
                      placeholder="Full Name"
                      style={{ width: "75%" }}
                    />
                  </Input.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="ID Number"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input disabled placeholder={inputIcNumber} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Citizenship">
                  <Radio.Group
                    value={citizenship}
                    onChange={(e) => onCitizenshipChange(e.target.value)}
                  >
                    <Radio value="Malaysian">Malaysian</Radio>
                    <Radio value="Non-Malaysian">Non-Malaysian</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Nationality">
                  <Select
                    showSearch
                    style={{ width: 300 }}
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
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Race" name="race">
                  <Select placeholder="Please select a Race">
                    <Option value="C">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "8px" }}>Chinese</span>
                      </div>
                    </Option>
                    <Option value="I">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "8px" }}>Indian</span>
                      </div>
                    </Option>
                    <Option value="M">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "8px" }}>Malay</span>
                      </div>
                    </Option>
                    <Option value="O">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "8px" }}>Others</span>
                      </div>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="D.O.B" name="dob">
                  <Input disabled placeholder={formatDob(dobFromId)} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Age" name="age">
                  <Input disabled placeholder={age.toString()} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Mobile Number"
                  name="mobileNumber"
                  tooltip="Valid and contactable mobile number"
                  validateStatus={mobileNumberError ? "error" : ""}
                  help={mobileNumberError}
                  rules={[{ validator: validateDigitsOnly }]}
                >
                  <Input
                    addonBefore="+60"
                    placeholder="Contactable number"
                    value={mobileNumber}
                    onChange={(e) => {
                      const { value } = e.target;
                      onMobileNumberChange(value);
                      setMobileNumberError(null);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Home Number"
                  name="homeNumber"
                  tooltip="Valid home use contact number"
                  validateStatus={homeNumberError ? "error" : ""}
                  help={homeNumberError}
                  rules={[{ validator: validateDigitsOnly }]}
                >
                  <Input
                    addonBefore="+60"
                    placeholder="Home use number"
                    value={homeNumber}
                    onChange={(e) => {
                      const { value } = e.target;
                      onHomeNumberChange(value);
                      setHomeNumberError(null);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Other Contact Number"
                  name="otherContact"
                  tooltip="Valid alternative contact number"
                  validateStatus={alternativeNumberError ? "error" : ""}
                  help={alternativeNumberError}
                  rules={[{ validator: validateDigitsOnly }]}
                >
                  <Input
                    addonBefore="+60"
                    placeholder="Alternative contact number"
                    value={alternativeNumber}
                    onChange={(e) => {
                      const { value } = e.target;
                      onAlternativeNumberChange(value);
                      setAlternativeNumberError(null);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Customer Email" name="email">
                  <Input placeholder="Contactable Email Address" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Fax Number" name="faxNumber">
                  <Input placeholder="Fax Number if Available" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Preferred Contact Channel"
                  name="contactChannel"
                >
                  <Radio.Group>
                    <Radio value="email">E-Mail</Radio>
                    <Radio value="sms">SMS</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <div>
              <Button type="primary" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </Form>
        </div>
      )}
      {currentStep === 1 && (
        <Form>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Lot No." name="lotNo">
                <Input placeholder="Lot Number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Block" name="blockNo">
                <Input placeholder="Block Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input.Group compact>
                  <Form.Item
                    name="premiseNo"
                    noStyle
                    rules={[{ required: true, message: "Number is required" }]}
                  >
                    <Input style={{ width: "50%" }} placeholder="Number" />
                  </Form.Item>
                  <Form.Item
                    name="premiseName"
                    noStyle
                    rules={[
                      { required: true, message: "Premise name is required" },
                    ]}
                  >
                    <Input
                      style={{ width: "50%" }}
                      placeholder="Premise Name"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Garden" name="garden">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Section" name="section">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Village" name="village">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Area" name="area">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Input.Group compact>
                  <Form.Item
                    name="postcode"
                    noStyle
                    rules={[
                      { required: true, message: "Postcode is required" },
                    ]}
                  >
                    <Input style={{ width: "50%" }} placeholder="Postcode" />
                  </Form.Item>
                  <Form.Item
                    name="postcodeArea"
                    noStyle
                    rules={[
                      { required: true, message: "Postcode area is required" },
                    ]}
                  >
                    <Input
                      style={{ width: "50%" }}
                      placeholder="Postcode Area"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="State" name="state">
                <Input placeholder="State" />
              </Form.Item>
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
        </Form>
      )}
      {currentStep === 2 && (
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Other Contact Name" name="otherContactName">
                <Input placeholder="Sub-holder name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Other Contact Number"
                name="otherContactNumber"
                tooltip="Valid and contactable mobile number"
                rules={[{ validator: validateDigitsOnly }]}
              >
                <Input addonBefore="+60" placeholder="Contactable number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Relationship" name="relationship">
                <Input placeholder="" />
              </Form.Item>
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
        </Form>
      )}
    </div>
  );
};

export default CustomerInfo;
