import { ProForm } from "@ant-design/pro-form";
import { Button, Select, Steps, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import light from "../../../src/tokens/light.json";

const { Option } = Select;
const { Step } = Steps;

const steps = [
  { title: "Customer Information" },
  { title: "Customer Address" },
  { title: "Sub-Contact" },
];

// Helper function to validate digits-only input
const validateDigitsOnly = (_: any, value: string) => {
  if (value && !/^\d+$/.test(value)) {
    return Promise.reject(new Error("Please enter digits only."));
  }
  return Promise.resolve();
};

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
  // State variables
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dobFromId, setDobFromId] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [addressData, setAddressData] = useState<string[]>([]);
  const [postcode, setPostcode] = useState<string>("");
  const [stateData, setStateData] = useState("");

  // Fetch countries data
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

  // Fetch state data based on postcode
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

  // Extract DOB from IC number and calculate age
  useEffect(() => {
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

    const formattedDob = inputIcNumber
      ? extractDobFromIcNumber(inputIcNumber)
      : "";
    const age = formattedDob ? calculateAge(formattedDob) : 0;

    setDobFromId(formattedDob);
    setAge(age);
  }, [inputIcNumber]);

  // Handle form submission
  const handleSubmit = () => {
    // Handle form submission
  };

  // Handle step navigation
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Handle postcode change
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

  // Handle country selection change
  const handleCountryChange = (selectedOption: Country | null) => {
    setSelectedCountry(selectedOption);
    onNationalityChange(selectedOption?.value ?? null);

    if (addressData.length > 0) {
      const postcode = addressData[0];
      setStateData(postcode);
    }
  };

  // Handle name prefix change
  const handleNamePrefixChange = (value: string | undefined) => {
    onCustomerTitleChange(value);
  };

  // Handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerNameChange(e.target.value);
  };

  // Format DOB for display
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
      {/* Render step tags */}
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

      {/* Render step content */}
      {currentStep === 0 && (
        <div style={{ padding: "0" }}>
          <ProForm.Group>
            {/* Customer Information fields */}
            {/* ... */}
          </ProForm.Group>
          {/* Render "Next" button */}
          <div>
            <Button type="primary" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <ProForm.Group>
          {/* Customer Address fields */}
          {/* ... */}
        </ProForm.Group>
      )}

      {currentStep === 2 && (
        <ProForm.Group>
          {/* Sub-Contact fields */}
          {/* ... */}
        </ProForm.Group>
      )}

      {/* Render navigation buttons */}
      {currentStep > 0 && (
        <div>
          <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
            Previous
          </Button>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </div>
      )}

      {/* Render submit button */}
      {currentStep === steps.length - 1 && (
        <div>
          <Button style={{ marginRight: 8 }} onClick={handlePrevStep}>
            Previous
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerInfo;
