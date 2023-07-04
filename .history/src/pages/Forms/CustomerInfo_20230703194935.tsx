import { Button, Col, Form, Input, Row, Select, Space, Steps, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import light from "../../../src/tokens/light.json";

const { Option } = Select;
const { Step } = Steps;

const steps = [
  { title: "Customer Information" },
  { title: "Consumer Address" },
  { title: "Sub-Contact" },
];

const CustomerInfo = ({
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
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dobFromId, setDobFromId] = useState("");
  const [age, setAge] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [addressData, setAddressData] = useState([]);
  const [postcode, setPostcode] = useState("");
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

  const handlePostcodeChange = async (value) => {
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
        const countriesData = response.data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
          flag: country.flags.png,
        }));

        countriesData.sort((a, b) => a.label.localeCompare(b.label));

        setCountries(countriesData);
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const extractDobFromIcNumber = (icNumber) => {
    const year = icNumber.substr(0, 2);
    const month = icNumber.substr(2, 2);
    const date = icNumber.substr(4, 2);
    const currentYear = new Date().getFullYear();
    const centuryPrefix =
      currentYear - (parseInt(year, 10) > currentYear % 100 ? 100 : 0);

    const formattedDob = `${date}-${month}-${centuryPrefix}${year}`;
    return formattedDob;
  };

  const calculateAge = (dob) => {
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

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    onNationalityChange(selectedOption?.value || null);

    if (addressData.length > 0) {
      const postcode = addressData[0];
      setStateData(postcode);
    }
  };

  const handleNamePrefixChange = (value) => {
    onCustomerTitleChange(value);
  };

  const handleNameChange = (e) => {
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

  const validateDigitsOnly = (_, value) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject(new Error("Please enter digits only."));
    }
    return Promise.resolve();
  };

  const formatDob = (dob) => {
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
          <Form>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Branch Site">
                  <Input width="md" name="branch" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Customer Number">
                  <Input width="md" name="customerNo" disabled />
                </Form.Item>
              </Col>
            </Row>
            {/* Rest of the form */}
          </Form>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </div>
      )}
      {currentStep === 1 && (
        <Form>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Lot No." name="lotNo">
                <Input width="md" placeholder="Lot Number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Block" name="blockNo">
                <Input width="md" placeholder="Block Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Premise No.">
                <Space.Compact>
                  <Input width="md" name="premiseNo" placeholder="Number" />
                  <Input name="premiseName" placeholder="Premise Name" />
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
          {/* Rest of the form */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Garden" name="garden">
                <Input width="md" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Section" name="section">
                <Input width="md" />
              </Form.Item>
            </Col>
          </Row>
          {/* Rest of the form */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Village" name="village">
                <Input width="md" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Area" name="area">
                <Input width="md" />
              </Form.Item>
            </Col>
          </Row>
          {/* Rest of the form */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Postcode" name="postcode">
                <Input
                  width="md"
                  onChange={(event) => handlePostcodeChange(event.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="State" name="state">
                <Input width="md" />
              </Form.Item>
            </Col>
          </Row>
          {/* Rest of the form */}
          <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
            Previous
          </Button>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </Form>
      )}
      {currentStep === 2 && (
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Other Contact Name" name="otherContactName">
                <Input width="md" placeholder="Sub-holder name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Other Contact Number" name="otherContactNumber">
                <Input
                  width="md"
                  addonBefore="+60"
                  placeholder="Contactable number"
                  value={mobileNumber}
                  onChange={(e) => onMobileNumberChange(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Relationship" name="relationship">
                <Input width="md" placeholder="" />
              </Form.Item>
            </Col>
          </Row>
          <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
            Previous
          </Button>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </Form>
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
