import { ProForm, ProFormItem, ProFormText } from "@ant-design/pro-form";
import { Button, Col, Input, Row, Space, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import light from "../../../src/tokens/light.json";

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
  const [stateData, setStateData] = useState<string | null>(null);
  const [dobFromId, setDobFromId] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [postcode, setPostcode] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        const countriesData = response.data.map((country: any) => ({
          label: country.name,
          value: country.name,
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
  };

  const handleCountryChange = (selectedOption: Country | null) => {
    setSelectedCountry(selectedOption);
    setStateData(selectedOption?.value ?? null);
  };

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
    // Implement form submission logic here
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
        <ProForm>
          <div style={{ padding: "0" }}>{/* Step 1 fields */}</div>
        </ProForm>
      )}
      {currentStep === 1 && (
        <ProForm>
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
                <ProFormItem>
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
                </ProFormItem>
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
                <ProFormItem>
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
                        initialValue={stateData}
                      />
                    </Col>
                  </Space.Compact>
                </ProFormItem>
              </Col>
              <Col span={12}>
                <ProFormText
                  width="md"
                  name="state"
                  label="State"
                  initialValue={stateData}
                />
              </Col>
            </Row>
          </ProForm.Group>
          <div>
            <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
              Previous
            </Button>
            <Button type="primary" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </ProForm>
      )}
      {currentStep === 2 && (
        <ProForm>
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
                <ProFormItem
                  label="Other Contact Number"
                  name="othersContactNumber"
                  tooltip="Valid and contactable number"
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
                    value={alternativeNumber}
                    onChange={(e) => onAlternativeNumberChange(e.target.value)}
                  />
                </ProFormItem>
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
          </ProForm.Group>
          <div>
            <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
              Previous
            </Button>
            <Button type="primary" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </ProForm>
      )}
      {currentStep === 3 && (
        <ProForm>
          {/* Step 3 fields */}
          <div>
            <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
              Previous
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </ProForm>
      )}
    </div>
  );
};

export default CustomerInfo;
