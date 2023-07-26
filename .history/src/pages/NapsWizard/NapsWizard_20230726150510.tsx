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

  const handleFormSubmit = (values) => {
    // Handle form submission logic here if needed
    console.log("Form submitted:", values);
  };

  // const getCurrentForm = () => {
  //   switch (currentStep) {
  //     case 0:
  //       return <BillPaymentApprovalForm onFinish={handleFormSubmit} />;
  //     case 1:
  //       return <ConnectionApprovalForm onFinish={handleFormSubmit} />;
  //     case 2:
  //       return <GetNeighbourAccountForm onFinish={handleFormSubmit} />;
  //     case 3:
  //       return <PlanApprovalInfoForm onFinish={handleFormSubmit} />;
  //     case 4:
  //       return <SiteInspectionApprovalForm onFinish={handleFormSubmit} />;
  //     case 5:
  //       return <SiteVisitApprovalForm onFinish={handleFormSubmit} />;
  //     default:
  //       return null;
  //   }
  // };

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

  return (
    <div>
      {/* Custom Progress Bar */}
      <ProgressBar
        current={currentStep}
        percent={(currentStep / (steps.length - 1)) * 100}
        items={stepsWithProgress}
      />

      {/* Show the current form */}
      <div style={{ marginTop: "24px" }}>{getCurrentForm()}</div>

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
