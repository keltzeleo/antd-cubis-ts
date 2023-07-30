import { Steps } from "antd";
import React, { useState } from "react";
import ProgressBar from "../../customComponents/ProgressBar/ProgressBar";
import BillPaymentApprovalForm from "../Forms/BillPaymentApprovalForm";
import ConnectionApprovalForm from "../Forms/ConnectionApprovalForm";
import GetNeighbourAccountForm from "../Forms/GetNeighbourAccountForm";
import SiteInspectionApprovalForm from "../Forms/SiteInspectionApprovalForm_";
import SiteVisitApprovalForm from "../Forms/SiteVisitApprovalForm_";
import "./napsWizard.css";

interface Theme {
  [key: string]: string;
}

interface NapsWizardProps {
  theme: Theme;
}

interface StepItem {
  title: string;
  subTitle?: string;
  description: React.ReactNode;
  theme: Theme;
}

const steps: StepItem[] = [
  {
    title: "Bill & Payment Approval Form",
    description: "Enter Amount and Payment Date",
    theme: {}, // Add a default empty theme object
  },
  {
    title: "Connection Approval Form",
    description: "Select Connection Type and Address",
    theme: {}, // Add a default empty theme object
  },
  {
    title: "Get Neighbour Account Form",
    description: "Enter Neighbour's Name",
    theme: {}, // Add a default empty theme object
  },
  {
    title: "Plan Approval Info Form",
    description: "Enter Plan Name and Description",
    theme: {}, // Add a default empty theme object
  },
  {
    title: "Site Inspection Approval Form",
    description: "Enter Inspection Date, Inspector Name, and Notes",
    theme: {}, // Add a default empty theme object
  },
  {
    title: "Site Visit Approval Form",
    description: "Enter Site Name",
    theme: {}, // Add a default empty theme object
  },
];

const NapsWizard: React.FC<NapsWizardProps> = ({ theme }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    // Handle form submission logic here
    console.log("Form submitted successfully!");
  };

  const getCurrentStepContent = () => {
    // You can add more cases for additional forms if needed
    switch (currentStep) {
      case 0:
        return <BillPaymentApprovalForm />;
      case 1:
        return <ConnectionApprovalForm />;
      case 2:
        return <GetNeighbourAccountForm />;
      case 3:
      // return <PlanApprovalInfoForm />;
      case 4:
        return <SiteInspectionApprovalForm />;
      case 5:
        return <SiteVisitApprovalForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Custom Progress Bar */}
      <ProgressBar
        current={currentStep}
        percent={(currentStep / (steps.length - 1)) * 100}
        items={steps}
      />

      {/* Render the content of the current step */}
      <div style={{ marginTop: "24px" }}>
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Steps.Step key={index} title={step.title} />
          ))}
        </Steps>
        <div style={{ marginTop: "24px" }}>{getCurrentStepContent()}</div>
        <div style={{ marginTop: "24px" }}>
          {currentStep > 0 && <button onClick={handlePrev}>Previous</button>}
          {currentStep < steps.length - 1 && (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button type="button" onClick={handleFinish}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NapsWizard;
