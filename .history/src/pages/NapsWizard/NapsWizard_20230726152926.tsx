import { Button, Form, Space, Steps, message } from "antd";
import React, { useState } from "react";

// Import the six form components with the updated paths
import ProgressBar from "../../customComponents/ProgressBar/ProgressBar";
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
  const [form] = Form.useForm();

  // Calculate the progress percentage
  const stepsWithProgress = steps.map((step, index) => {
    return {
      title: step.title,
      description: step.content,
      subTitle:
        currentStep === index
          ? "In Progress"
          : currentStep > index
          ? "Finished"
          : "Waiting",
    };
  });

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

  // Function to get the content of the current step

  return (
    <div>
      {/* Custom Progress Bar */}
      <ProgressBar
        current={currentStep}
        percent={(currentStep / (steps.length - 1)) * 100}
        items={stepsWithProgress}
      />

      {/* Render the content of the current step */}
      <div style={{ marginTop: "24px" }}>
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
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
    </div>
  );
};

export default NapsWizard;
