import { Button, Form, Space, Steps, message, Progress} from "antd";
import React, { useState } from "react";

// Import the six form components with the updated paths
import BillPaymentApprovalForm from "../Forms/BillPaymentApprovalForm";
import ConnectionApprovalForm from "../Forms/ConnectionApprovalForm";
import GetNeighbourAccountForm from "../Forms/GetNeighbourAccountForm";
import PlanApprovalInfoForm from "../Forms/PlanApprovalInfoForm";
import SiteInspectionApprovalForm from "../Forms/SiteInspectionApprovalForm";
import SiteVisitApprovalForm from "../Forms/SiteVisitApprovalForm";

import "./napsWizard.css";

interface Theme {
  [key: string]: string;
}

interface NapsWizardProps {
  theme: Theme;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const { Step } = Steps;

const steps = [
  {
    title: "Step 1",
    content: <BillPaymentApprovalForm />,
  },
  {
    title: "Step 2",
    content: <ConnectionApprovalForm />,
  },
  {
    title: "Step 3",
    content: <GetNeighbourAccountForm />,
  },
  {
    title: "Step 4",
    content: <PlanApprovalInfoForm />,
  },
  {
    title: "Step 5",
    content: <SiteInspectionApprovalForm />,
  },
  {
    title: "Step 6",
    content: <SiteVisitApprovalForm />,
  },
  // Add other steps if needed
];

const NapsWizard: React.FC<NapsWizardProps> = ({ theme }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

    // Calculate progress percentage
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;


  const [form] = Form.useForm();

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      form.resetFields();
    });
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    // Handle form submission logic here
    message.success("Form submitted successfully!");
  };

 return (
    <div>
      <Progress
        type="circle"
        percent={progressPercentage}
        width={80}
        style={{ position: "absolute", top: 20, right: 20 }} // Adjust position as needed
      />
    <div>
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div style={{ marginTop: "24px" }}>{steps[currentStep].content}</div>
      <div style={{ marginTop: "24px" }}>
        <Space>
          {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={handleFinish}>
              Submit
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default NapsWizard;
