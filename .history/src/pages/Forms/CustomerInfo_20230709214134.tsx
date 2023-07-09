import { ProCard } from "@ant-design/pro-card";
import { ProForm, ProFormItem, ProFormText } from "@ant-design/pro-form";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Tag,
} from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

import axios from "axios";
import { useEffect, useState } from "react";

import SquircleBorder from "../../customComponents/SquircleBorder/SquircleBorder";

const { Option } = Select;

const Step = [
  {
    title: "Customer Info",
  },
  {
    title: "Customer Primary Address",
  },
  {
    title: "Sub-Contact",
  },
  {
    title: "Account Entry",
  },
];

const StepAccountEntry = [
  {
    title: "Account Category and Usage",
  },
  {
    title: "Refund Information",
  },
];

interface Country {
  label: string;
  value: string;
  flag: string;
}

interface Theme {
  [key: string]: string;
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
  lotNo: string;
  blockNo: string;
  premiseNo: string;
  premiseName: string;
  otherContactName: string;
  othersContactNumber: string;
  relationship: string;
  theme: Theme;
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
  lotNo,
  blockNo,
  premiseNo,
  premiseName,
  otherContactName,
  othersContactNumber,
  relationship,
  theme,
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
  const [currentStepAccountEntry, setCurrentStepAccountEntry] = useState(0);

  const [addressData, setAddressData] = useState<string[]>([]);
  const [postcode, setPostcode] = useState<string>("");
  const [stateData, setStateData] = useState("");

  const [readonlyAccountAddress, setReadonlyAccountAddress] = useState(true);
  const [readonlyPostalAddress, setReadonlyPostalAddress] = useState(true);
  const [gstIsApplicable, gstSetIsApplicable] = useState(false);

  const [consolidatedFormEditable, setConsolidatedFormEditable] =
    useState(false);
  const [addAccountFormVisible, setAddAccountFormVisible] = useState(false);

  const [selectedSupplyType, setSelectedSupplyType] = useState("P");
  const [selectedCorporateAccount, setSelectedCorporateAccount] =
    useState("no");

  const handleSupplyTypeChange = (e: RadioChangeEvent) => {
    setSelectedSupplyType(e.target.value);
  };

  const handleCorporateAccountChange = (e: RadioChangeEvent) => {
    setSelectedCorporateAccount(e.target.value);
  };

  const handleGSTReliefSwitch = (checked: boolean) => {
    gstSetIsApplicable(checked);
  };

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerNameChange(e.target.value);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return true; // Step 0 validation is always true
      case 1:
        return true; // Step 1 validation is always true
      case 2:
        return true; // Step 2 validation is always true
      case 3:
        return true; // Step 3 validation is always true
      default:
        return false;
    }
  };

  const handleConsolidatedFormToggle = () => {
    setConsolidatedFormEditable((prevEditable) => !prevEditable);
  };

  const handleNextStep = () => {
    if (currentStep === Step.length - 1) {
      setCurrentStepAccountEntry(-1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNextStepAccountEntry = () => {
    setCurrentStepAccountEntry(currentStepAccountEntry + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const handlePrevStepAccountEntry = () => {
    if (currentStepAccountEntry > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const handleSubmit = () => {
    if (isStepValid(currentStep)) {
      // Handle the submission of the consolidated form and the "Add Account" form
    }
  };

  const handleSubmitAccountEntry = () => {
    // Perform submission logic for the account entry set
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
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: "16px", minWidth: "100v" }}>
        {Step.map((step, index) => (
          <Tag
            key={index}
            color={currentStep === index ? theme["cyan.6"] : "gray"}
            onClick={() => setCurrentStep(index)}
            style={{
              fontSize: "14px",
              padding: "3px 8px",
              borderRadius: "8px",
            }}
          >
            {step.title}
          </Tag>
        ))}
      </div>
      <ProForm style={{ marginBottom: 16 }} submitter={false}>
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
                  </ProFormItem>
                </Col>
                <Col span={12}>
                  <ProFormItem
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
                  </ProFormItem>
                </Col>
              </Row>
            </ProForm.Group>
            <ProForm.Group>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText label="Citizenship">
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
                  </ProFormText>
                </Col>
                <Col span={12}>
                  <ProFormText label="Nationality">
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
                  </ProFormText>
                </Col>
              </Row>
            </ProForm.Group>

            <ProForm.Group>
              <Row gutter={16}>
                <Col span={8}>
                  <ProFormText
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
                            backgroundColor={theme["red.2"]}
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
                            backgroundColor={theme["magenta.2"]}
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
                            backgroundColor={theme["green.2"]}
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
                            backgroundColor={theme["yellow.2"]}
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
                  </ProFormText>
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
                        initialValue={addressData[0]}
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
                  initialValue={addressData[0]}
                />
              </Col>
            </Row>
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
                <ProFormText
                  fieldProps={{
                    addonBefore: "+60",
                  }}
                  label="Other's Contact Number"
                  name="othersContactNumber"
                  tooltip="Valid and contactable number"
                  rules={[{ validator: validateDigitsOnly }]}
                ></ProFormText>
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
        )}
        {currentStep === 3 && (
          <div style={{ padding: "0" }}>
            {/* Step 4 - Account Entry */}
            <ProCard
              title="Account Address"
              collapsible
              collapsed={readonlyAccountAddress ? undefined : false}
              bordered
              style={{
                marginBlockEnd: 16,
                minWidth: "100%", // Set the desired width here
              }}
              extra={
                <Switch
                  style={{}}
                  checked={readonlyAccountAddress}
                  checkedChildren="Same as Primary Address"
                  unCheckedChildren="Account Address Fill In"
                  onChange={(value) => {
                    setReadonlyAccountAddress(value);
                  }}
                />
              }
            >
              <ProForm readonly={readonlyAccountAddress} submitter={false}>
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
                          <Col style={{ width: "160px" }}>
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
                          <Col style={{ width: "160px" }}>
                            <ProFormText
                              name="postcodeArea"
                              label="Postcode Area"
                              placeholder="Postcode Area"
                              initialValue={addressData[0]}
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
                        initialValue={addressData[0]}
                      />
                    </Col>
                  </Row>
                </ProForm.Group>
                {/* ... Add more form groups here ... */}
              </ProForm>
            </ProCard>
            <ProCard
              title="Postal Address"
              collapsible
              collapsed={readonlyPostalAddress ? undefined : false}
              bordered
              style={{
                marginBlockEnd: 16,
                maxWidth: "100%", // Set the desired width here
              }}
              extra={
                <Switch
                  style={{}}
                  checked={readonlyPostalAddress}
                  checkedChildren="Same as Account Address"
                  unCheckedChildren="Postal Address Fill In"
                  onChange={(value) => {
                    setReadonlyPostalAddress(value);
                  }}
                />
              }
            >
              <ProForm readonly={readonlyPostalAddress} submitter={false}>
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
                          <Col style={{ width: "160px" }}>
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
                          <Col style={{ width: "160px" }}>
                            <ProFormText
                              name="postcodeArea"
                              label="Postcode Area"
                              placeholder="Postcode Area"
                              initialValue={addressData[0]}
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
                        initialValue={addressData[0]}
                      />
                    </Col>
                  </Row>
                </ProForm.Group>
                {/* ... Add more form groups here ... */}
              </ProForm>
            </ProCard>
            <div style={{ marginBottom: "16px" }}>
              {StepAccountEntry.map((step, index) => (
                <Tag
                  key={index}
                  color={
                    currentStepAccountEntry === index ? theme["cyan.6"] : "gray"
                  }
                  onClick={() => setCurrentStepAccountEntry(index)}
                  style={{
                    fontSize: "14px",
                    padding: "3px 8px",
                    borderRadius: "8px",
                  }}
                >
                  {step.title}
                </Tag>
              ))}
            </div>
            {currentStepAccountEntry === 0 && (
              <ProForm submitter={false}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Tariff"
                      name="tariff"
                      rules={[
                        { required: true, message: "Tariff is required" },
                      ]}
                    >
                      <Select>
                        {/* Retrieve and map the drop-down list data */}
                        {/* Option 1: code + short description */}
                        <Option value="tariff1">
                          Tariff 1 - Description 1
                        </Option>
                        <Option value="tariff2">
                          Tariff 2 - Description 2
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}></Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Consumer Group"
                      name="consumerGroup"
                      rules={[
                        {
                          required: true,
                          message: "Consumer Group is required",
                        },
                      ]}
                    >
                      <Select>
                        {/* Retrieve and map the drop-down list data */}
                        {/* Option 1: code + abbreviation description */}
                        <Option value="group1">Group 1 - Abbreviation 1</Option>
                        <Option value="group2">Group 2 - Abbreviation 2</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Consumer Type"
                      name="consumerType"
                      rules={[
                        {
                          required: true,
                          message: "Consumer Type is required",
                        },
                      ]}
                    >
                      <Select>
                        {/* Retrieve and map the drop-down list data */}
                        {/* Option 1: code + abbreviation description */}
                        <Option value="type1">Type 1 - Abbreviation 1</Option>
                        <Option value="type2">Type 2 - Abbreviation 2</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Supply Type"
                      name="supplyType"
                      rules={[
                        {
                          required: true,
                          message: "Supply Type is required",
                        },
                      ]}
                    >
                      <Radio.Group
                        onChange={handleSupplyTypeChange}
                        defaultValue="P"
                      >
                        <Radio value="P">Permanent </Radio>
                        <Radio value="T">Temporary </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Temporary Supply End Date"
                      name="supplyEndDate"
                      rules={[
                        {
                          required: true,
                          message: "Temporary Supply End Date is required",
                        },
                      ]}
                    >
                      <DatePicker disabled={selectedSupplyType === "P"} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  {/* ... */}
                  <Col span={12}>
                    <Form.Item
                      label="Corporate Account"
                      name="corporateAccount"
                      rules={[
                        {
                          required: true,
                          message: "Corporate Account is required",
                        },
                      ]}
                    >
                      <Radio.Group
                        onChange={handleCorporateAccountChange}
                        defaultValue="no"
                      >
                        <Radio value="no">Not Applicable</Radio>
                        <Radio value="yes">Yes</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  {/* ... */}

                  {/* ... */}
                  <Col span={12}>
                    <Form.Item
                      label="Corporate Group"
                      name="corporateGroup"
                      rules={[
                        {
                          required: true,
                          message: "Corporate Group is required",
                        },
                      ]}
                    >
                      <Select disabled={selectedCorporateAccount === "no"}>
                        {/* Retrieve and map the dropdown list data */}
                        {/* Option 1: code + abbreviation description */}
                        <Option value="group1">Group 1 - Abbreviation 1</Option>
                        <Option value="group2">Group 2 - Abbreviation 2</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Meter Type"
                      name="meterType"
                      style={{ background: "" }}
                      rules={[
                        {
                          required: true,
                          message: "Meter Type is mandatory",
                        },
                      ]}
                    >
                      <Select placeholder="Please select a Meter Type">
                        <Select.Option value="1">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SquircleBorder
                              size={20}
                              curvature={0.43}
                              backgroundColor="transparent"
                              rotate={0}
                              borderType="dashed"
                              borderWidth={1}
                              borderColor={theme["cyan"]}
                              fontWeight={700}
                              character="1"
                            />
                            <span style={{ marginLeft: "8px" }}>
                              Individual Meter
                            </span>
                          </div>
                        </Select.Option>
                        <Select.Option value="I">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SquircleBorder
                              size={20}
                              curvature={0.43}
                              backgroundColor="transparent"
                              rotate={0}
                              borderType="dashed"
                              borderWidth={1}
                              borderColor={theme["cyan"]}
                              fontWeight={700}
                              character="2"
                            />
                            <span style={{ marginLeft: "8px" }}>
                              Bulk Meter
                            </span>
                          </div>
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Bill Delivery Type"
                      name="billDeliveryType"
                      style={{ background: "" }}
                      rules={[
                        {
                          required: true,
                          message: "Bill Delivery Type is mandatory",
                        },
                      ]}
                    >
                      <Select placeholder="Please select a Race">
                        <Select.Option value="C">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SquircleBorder
                              size={20}
                              curvature={0.43}
                              backgroundColor="transparent"
                              rotate={0}
                              borderType="dashed"
                              borderWidth={1}
                              borderColor={theme["cyan"]}
                              fontWeight={700}
                              character="S"
                            />
                            <span style={{ marginLeft: "8px" }}>Spot Bill</span>
                          </div>
                        </Select.Option>
                        <Select.Option value="I">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SquircleBorder
                              size={20}
                              curvature={0.43}
                              backgroundColor="transparent"
                              rotate={0}
                              borderType="dashed"
                              borderWidth={1}
                              borderColor={theme["cyan"]}
                              fontWeight={700}
                              character="P"
                            />
                            <span style={{ marginLeft: "8px" }}>
                              Postal Bill
                            </span>
                          </div>
                        </Select.Option>
                        <Select.Option value="M">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SquircleBorder
                              size={20}
                              curvature={0.43}
                              backgroundColor="transparent"
                              rotate={0}
                              borderType="dashed"
                              borderWidth={1}
                              borderColor={theme["cyan"]}
                              fontWeight={700}
                              character="G"
                            />
                            <span style={{ marginLeft: "8px" }}>
                              Green Bill
                            </span>
                          </div>
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <ProCard
                  title="GST Relief"
                  collapsible
                  collapsed={!gstIsApplicable}
                  bordered
                  style={{
                    marginBlockEnd: 16,
                    width: "100%",
                  }}
                  extra={
                    <Switch
                      checked={gstIsApplicable}
                      checkedChildren="Applicable"
                      unCheckedChildren="Not Applicable"
                      onChange={handleGSTReliefSwitch}
                    />
                  }
                >
                  {gstIsApplicable && (
                    <div>
                      {/* Place your checklist content here */}
                      <Checkbox>Checkbox 1</Checkbox>
                      <Checkbox>Checkbox 2</Checkbox>
                      <Checkbox>Checkbox 3</Checkbox>
                    </div>
                  )}
                </ProCard>
              </ProForm>
            )}
            {currentStepAccountEntry === 1 && (
              <ProForm submitter={false}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Bank"
                      name="bank"
                      style={{ background: "" }}
                      rules={[
                        {
                          required: true,
                          message: "Bank must be selected",
                        },
                      ]}
                    >
                      <Select placeholder="Please select a  Bank">
                        <Select.Option value="BNM">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SquircleBorder
                              size={20}
                              curvature={0.43}
                              backgroundColor="transparent"
                              rotate={0}
                              borderType="dashed"
                              borderWidth={1}
                              borderColor={theme["cyan"]}
                              fontWeight={700}
                              character="01"
                            />
                            <span style={{ marginLeft: "8px" }}>
                              Bank Negara Malaysia
                            </span>
                          </div>
                        </Select.Option>
                        <Select.Option value="RBS">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SquircleBorder
                              size={20}
                              curvature={0.43}
                              backgroundColor="transparent"
                              rotate={0}
                              borderType="dashed"
                              borderWidth={1}
                              borderColor={theme["cyan"]}
                              fontWeight={700}
                              character="02"
                            />
                            <span style={{ marginLeft: "8px" }}>
                              The Royal Bank of Scotland
                            </span>
                          </div>
                        </Select.Option>
                        <Select.Option value="BOA">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SquircleBorder
                              size={18}
                              curvature={0.43}
                              backgroundColor="transparent"
                              rotate={0}
                              borderType="dashed"
                              borderWidth={1}
                              borderColor={theme["cyan"]}
                              fontWeight={700}
                              character="07"
                            />
                            <span style={{ marginLeft: "8px" }}>
                              Bank of America Malaysia
                            </span>
                            {/* lots more of banks */}
                          </div>
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Bank Account No"
                      name="bankAccountNo"
                      rules={[
                        {
                          required: true,
                          message: "Bank Account No is required",
                        },
                        {
                          max: 20,
                          message:
                            "Bank Account No cannot exceed 20 characters",
                        },
                        {
                          validator: validateDigitsOnly,
                        },
                      ]}
                    >
                      <Input placeholder="Enter Bank Account No" />
                    </Form.Item>

                    {/* Add more form items for other fields if needed */}
                  </Col>
                </Row>
              </ProForm>
            )}
            {addAccountFormVisible && (
              <ProCard title="Add Account Form"></ProCard>
            )}
          </div>
        )}
      </ProForm>
      <>
        <div>&nbsp;</div>
        <div
          style={{
            position: "absolute",
            right: 15,
            bottom: 15,
            padding: "8 16px",
            width: "650px",
            backgroundColor: theme.colorPrimaryBg,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {currentStep === 0 ? (
                <></>
              ) : (
                <Button
                  style={{ marginRight: 8 }}
                  onClick={() => {
                    if (
                      currentStep ===
                      Step.findIndex((step) => step.title === "Account Entry")
                    ) {
                      if (currentStepAccountEntry === 0) {
                        setCurrentStep(2); // Replace SubContactStep with the index of the "Sub-Contact" step
                      } else {
                        setCurrentStepAccountEntry(currentStepAccountEntry - 1);
                      }
                    } else {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                  disabled={!isStepValid(currentStep)}
                >
                  Previous
                </Button>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {currentStep === Step.length - 1 ? (
                <>
                  {currentStep ===
                  Step.findIndex((step) => step.title === "Account Entry") ? (
                    <>
                      {currentStepAccountEntry ===
                      StepAccountEntry.length - 1 ? (
                        <Button
                          type="primary"
                          onClick={handleSubmitAccountEntry}
                          disabled={!isStepValid(currentStepAccountEntry)}
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          onClick={handleNextStepAccountEntry}
                          disabled={!isStepValid(currentStepAccountEntry)}
                        >
                          Next
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      type="primary"
                      onClick={handleNextStep}
                      disabled={!isStepValid(currentStep)}
                    >
                      Next
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  type="primary"
                  onClick={handleNextStep}
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CustomerInfo;
