import { Steps } from "antd";
import React, { useState } from "react";
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

interface StepItem {
  title: string;
  subTitle?: string;
  description?: string;
}

const steps: StepItem[] = [
  {
    title: "Bill & Payment Approval Form",
    description: "Enter Amount and Payment Date",
  },
  {
    title: "Connection Approval Form",
    description: "Select Connection Type and Address",
  },
  {
    title: "Get Neighbour Account Form",
    description: "Enter Neighbour's Name",
  },
  {
    title: "Plan Approval Info Form",
    description: "Enter Plan Name and Description",
  },
  {
    title: "Site Inspection Approval Form",
    description: "Enter Inspection Date, Inspector Name, and Notes",
  },
  {
    title: "Site Visit Approval Form",
    description: "Enter Site Name",
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
        return currentStep === 0 ? <BillPaymentApprovalForm /> : null;
      case 1:
        return currentStep === 1 ? <ConnectionApprovalForm /> : null;
      case 2:
        return currentStep === 2 ? <GetNeighbourAccountForm /> : null;
      case 3:
        return currentStep === 3 ? <PlanApprovalInfoForm /> : null;
      case 4:
        return currentStep === 4 ? <SiteInspectionApprovalForm /> : null;
      case 5:
        return currentStep === 5 ? <SiteVisitApprovalForm /> : null;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Custom Progress Bar */}
      <div style={{ marginTop: "24px" }}>
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Steps.Step key={index} title={step.title} />
          ))}
        </Steps>
        <div style={{ marginTop: "24px" }}>
          <p>{steps[currentStep].description}</p>
        </div>
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
