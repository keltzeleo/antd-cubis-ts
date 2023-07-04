import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Col, Row, Space, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import light from "../../../src/tokens/light.json";
import SquircleBorder from "../../customComponents/SquircleBorder/SquircleBorder";

const { Option } = ProFormSelect;

const StepTitles = ["Customer Information", "Consumer Address", "Sub-Contact"];

interface Country {
  label: string;
  value: string;
  flag: string | JSX.Element;
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
          label: (
            <div>
              <img src={country.flags.png} alt={country.name.common} />
              <span style={{ marginLeft: "8px" }}>{country.name.common}</span>
            </div>
          ),
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

  const handleNameChange = (value: string) => {
    onCustomerNameChange(value);
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
        {StepTitles.map((step, index) => (
          <Tag
            key={index}
            color={currentStep === index ? light["cyan.6"] : "gray"}
            onClick={() => setCurrentStep(index)}
          >
            {step}
          </Tag>
        ))}
      </div>
      {currentStep === 0 && (
        <ProForm
          initialValues={{
            branch: undefined,
            customerNo: undefined,
            namePrefix: undefined,
            id: inputIcNumber,
            citizenship: citizenship,
            nationality: selectedCountry?.value ?? null,
            race: undefined,
            dob: dobFromId,
            age: age.toString(),
            mobileNumber: mobileNumber,
            homeUseNumber: homeNumber,
            otherContact: alternativeNumber,
            email: undefined,
            faxNumber: undefined,
            preferredContactChannel: undefined,
          }}
          submitter={{
            render: (_, dom) => [
              <Button type="default" key="prev" onClick={handlePrevStep}>
                Previous
              </Button>,
              dom.pop(),
            ],
          }}
          onFinish={handleSubmit}
        >
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
                <ProFormText
                  width="md"
                  name="namePrefix"
                  label="Enter Name"
                  placeholder="Full Name"
                  fieldProps={{
                    prefix: (
                      <ProFormSelect
                        options={[
                          { value: "", label: "Title" },
                          { value: "Mr.", label: "Mr." },
                          { value: "Ms.", label: "Ms." },
                          { value: "Mdm.", label: "Mdm." },
                          { value: "Dr.", label: "Dr." },
                        ]}
                        placeholder="Title"
                        onChange={handleNamePrefixChange}
                      />
                    ),
                  }}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  width="md"
                  name="id"
                  label="ID Number"
                  disabled
                  placeholder={inputIcNumber}
                />
              </Col>
            </Row>
          </ProForm.Group>
          <ProForm.Group>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormRadio.Group
                  name="citizenship"
                  label="Citizenship"
                  options={[
                    { label: "Malaysian", value: "Malaysian" },
                    { label: "Non-Malaysian", value: "Non-Malaysian" },
                  ]}
                  initialValue={citizenship}
                  onChange={(e) => onCitizenshipChange(e.target.value)}
                />
              </Col>
              <Col span={12}>
                <ProFormSelect
                  name="nationality"
                  label="Nationality"
                  placeholder="Select a Nationality"
                  showSearch
                  options={countries}
                  value={selectedCountry?.value}
                  onChange={handleCountryChange}
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  optionLabelProp="label"
                />
              </Col>
            </Row>
          </ProForm.Group>
          <ProForm.Group>
            <Row gutter={16}>
              <Col span={8}>
                <ProFormSelect
                  name="race"
                  label="Race"
                  placeholder="Please select a Race"
                  options={[
                    { value: "C", label: "Chinese" },
                    { value: "I", label: "Indian" },
                    { value: "M", label: "Malay" },
                    { value: "O", label: "Others" },
                  ]}
                  fieldProps={{
                    optionLabelProp: "label",
                    optionRender: (item) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SquircleBorder
                          size={20}
                          curvature={0.43}
                          backgroundColor={
                            {
                              C: light["volcano.2"],
                              I: light["magenta.2"],
                              M: light["grass.2"],
                              O: light["yellow.2"],
                            }[item.value]
                          }
                          rotate={0}
                          borderType="dashed"
                          borderWidth={1}
                          borderColor="transparent"
                          fontWeight={700}
                          character={item.value}
                        />
                        <span style={{ marginLeft: "8px" }}>{item.label}</span>
                      </div>
                    ),
                  }}
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="dob"
                  label="D.O.B"
                  disabled
                  placeholder={dobFromId}
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
                      message: "Please enter digits only.",
                    },
                  ]}
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="homeUseNumber"
                  label="Home Number"
                  tooltip="Valid home use contact number"
                  rules={[{ validator: validateDigitsOnly }]}
                />
              </Col>
              <Col span={8}>
                <ProFormText
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
                  placeholder="Contactable Email Address"
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="faxNumber"
                  label="Fax Number"
                  placeholder="Fax Number if any"
                />
              </Col>
              <Col span={8}>
                <ProFormSelect
                  width="md"
                  name="preferredContactChannel"
                  label="Preferred Contact Channel"
                  placeholder="Select a Preferred Contact Channel"
                  options={[
                    { value: "Email", label: "Email" },
                    { value: "SMS", label: "SMS" },
                    { value: "Call", label: "Call" },
                  ]}
                />
              </Col>
            </Row>
          </ProForm.Group>
          <ProForm.Item label=" " colon={false}>
            <Space>
              <Button type="primary" onClick={handleNextStep}>
                Next
              </Button>
            </Space>
          </ProForm.Item>
        </ProForm>
      )}
      {currentStep === 1 && (
        <ProForm
          initialValues={{
            postcode: postcode,
            state: stateData,
            address: addressData[1] ?? "",
            town: addressData[2] ?? "",
            country: selectedCountry?.value ?? null,
          }}
          submitter={{
            render: (_, dom) => [
              <Button type="default" key="prev" onClick={handlePrevStep}>
                Previous
              </Button>,
              dom.pop(),
            ],
          }}
          onFinish={handleSubmit}
        >
          <ProForm.Group>
            <Row gutter={16}>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="postcode"
                  label="Postcode"
                  tooltip="Enter the postcode"
                  fieldProps={{
                    onChange: (e) => handlePostcodeChange(e.target.value),
                  }}
                  rules={[{ validator: validateDigitsOnly }]}
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="state"
                  label="State"
                  disabled
                  placeholder={stateData}
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="address"
                  label="Address"
                  placeholder="Address Line 1"
                />
              </Col>
            </Row>
          </ProForm.Group>
          <ProForm.Group>
            <Row gutter={16}>
              <Col span={8}>
                <ProFormText
                  width="md"
                  name="town"
                  label="Town"
                  placeholder="City/Town"
                />
              </Col>
              <Col span={8}>
                <ProFormSelect
                  width="md"
                  name="country"
                  label="Country"
                  placeholder="Select a Country"
                  options={countries}
                  value={selectedCountry?.value}
                  onChange={handleCountryChange}
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                />
              </Col>
            </Row>
          </ProForm.Group>
        </ProForm>
      )}
      {currentStep === 2 && (
        <ProForm
          initialValues={{
            customerName: customerName,
            contactNumber: mobileNumber,
          }}
          submitter={{
            render: (_, dom) => [
              <Button type="default" key="prev" onClick={handlePrevStep}>
                Previous
              </Button>,
              dom.pop(),
            ],
          }}
          onFinish={handleSubmit}
        >
          <ProForm.Group>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  width="md"
                  name="customerName"
                  label="Contact Name"
                  disabled
                  placeholder={customerName}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  width="md"
                  name="contactNumber"
                  label="Contact Number"
                  disabled
                  placeholder={mobileNumber}
                />
              </Col>
            </Row>
          </ProForm.Group>
        </ProForm>
      )}
    </div>
  );
};

export default CustomerInfo;
