import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Row, Select } from "antd";

const { Option } = Select;

interface CustomerInfoProps {
  customerTitle: string | undefined;
  customerName: string;
  inputIcNumber: string; // Add inputIcNumber prop
  onCustomerTitleChange: (value: string | undefined) => void;
  onCustomerNameChange: (value: string) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerTitle,
  customerName,
  inputIcNumber,

  onCustomerTitleChange,
  onCustomerNameChange,
}) => {
  const extractDobFromIcNumber = (icNumber: string): string => {
    // Extract the DDMMYY portion from the icNumber
    const dob = icNumber.substr(0, 6);
    const day = dob.substr(0, 2);
    const month = dob.substr(2, 2);
    const year = dob.substr(4, 2); // Extract the year part from the dob

    const currentYear = new Date().getFullYear(); // Get the current year

    let centuryPrefix = ""; // Determine the century prefix dynamically

    if (parseInt(year, 10) > currentYear % 100) {
      // If the year is greater than the last two digits of the current year, assume it belongs to the previous century
      centuryPrefix = (currentYear - 100).toString().substr(0, 2);
    } else {
      // Otherwise, assume it belongs to the current century
      centuryPrefix = currentYear.toString().substr(0, 2);
    }

    const formattedDob = `${dob.substr(0, 2)}-${dob.substr(
      2,
      2
    )}-${centuryPrefix}${year}`;
    return formattedDob;
  };

  const calculateAge = (dob: string): number => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleNamePrefixChange = (value: string | undefined) => {
    onCustomerTitleChange(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerNameChange(e.target.value);
  };

  const formattedDob = inputIcNumber
    ? extractDobFromIcNumber(inputIcNumber)
    : "";

  const age = formattedDob ? calculateAge(formattedDob) : 0;

  return (
    <div
      style={{
        border: "0",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "",
      }}
    >
      <ProForm>
        {/* Rest of the code */}
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={8}>
              <ProFormText
                width="md"
                name="dob"
                label="D.O.B"
                disabled
                placeholder={formattedDob}
              />
            </Col>
            <Col span={8}>
              <ProFormText
                width="md"
                name="age"
                label="Age"
                disabled
                initialValue={age.toString()} // Set the initial value of age
              />
            </Col>
            <Col span={8}>
              <ProFormText
                width="md"
                name="race"
                label="Race"
                rules={[{ required: true, message: "Please enter Race" }]}
              />
            </Col>
          </Row>
        </ProForm.Group>
      </ProForm>
    </div>
  );
};

export default CustomerInfo;
