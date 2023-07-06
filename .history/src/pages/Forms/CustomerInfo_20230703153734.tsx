import { Button, Form, Input, Radio, Select, Space, Tag } from "antd";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
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
            color={currentStep === index ? light["cyan.6"] : "gray"}
            onClick={() => setCurrentStep(index)}
          >
            {step.title}
          </Tag>
        ))}
      </div>
      {currentStep === 0 && (
        <div style={{ padding: "0" }}>
          <Form.Item>
            <Space>
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
              <Input
                addonBefore="ID Number"
                disabled
                placeholder={inputIcNumber}
              />
            </Space>
          </Form.Item>
          <Form.Item>
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
          <Form.Item>
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
          <Form.Item>
            <Radio.Group>
              <Radio style={{ marginLeft: 16 }} value="email">
                E-Mail
              </Radio>
              <Radio style={{ marginLeft: 16 }} value="sms">
                SMS{" "}
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Space>
              <Input
                addonBefore="+60"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => {
                  const { value } = e.target;
                  onMobileNumberChange(value);
                  setMobileNumberError(null); // Reset the error before validation
                }}
              />
              <Input
                addonBefore="+60"
                placeholder="Home Number"
                value={homeNumber}
                onChange={(e) => {
                  const { value } = e.target;
                  onHomeNumberChange(value);
                  setHomeNumberError(null); // Reset the error before validation
                }}
              />
              <Input
                addonBefore="+60"
                placeholder="Other Contact Number"
                value={alternativeNumber}
                onChange={(e) => {
                  const { value } = e.target;
                  onAlternativeNumberChange(value);
                  setAlternativeNumberError(null); // Reset the error before validation
                }}
              />
            </Space>
          </Form.Item>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </div>
      )}
      {currentStep === 1 && (
        <div>
          <Form.Item>
            <Space>
              <Input placeholder="Lot Number" />
              <Input placeholder="Block" />
              <Input placeholder="Premise No." />
              <Input placeholder="Premise Name" />
            </Space>
          </Form.Item>
          <Form.Item>
            <Space>
              <Input placeholder="Garden" />
              <Input placeholder="Section" />
            </Space>
          </Form.Item>
          <Form.Item>
            <Space>
              <Input placeholder="Village" />
              <Input placeholder="Area" />
              <Input
                placeholder="Postcode"
                onChange={(event) => handlePostcodeChange(event.target.value)}
              />
              <Input placeholder="State" />
            </Space>
          </Form.Item>
          <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
            Previous
          </Button>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <Form.Item>
            <Space>
              <Input placeholder="Other Contact Name" />
              <Input
                placeholder="Other Contact Number"
                value={mobileNumber}
                onChange={(e) => onMobileNumberChange(e.target.value)}
              />
              <Input placeholder="Relationship" />
            </Space>
          </Form.Item>
          <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
            Previous
          </Button>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </div>
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
