import { Button, Steps, message } from "antd";
import React from "react";
import BillPaymentApprovalForm from "../Forms/BillPaymentApprovalForm";
import ConnectionApprovalForm from "../Forms/ConnectionApprovalForm";
import GetNeighbourAccountForm from "../Forms/GetNeighbourAccountForm";
import PlanApprovalInfoForm from "../Forms/PlanApprovalInfoForm";
import SiteInspectionApprovalForm from "../Forms/SiteInspectionApprovalForm";
import SiteVisitApprovalForm from "../Forms/SiteVisitApprovalForm";
import "./napsWizard.css";

const { Step } = Steps;

interface Theme {
  [key: string]: string;
}

interface NapsWizard2Props {
  theme: Theme;
}

const NapsWizard2: React.FC<NapsWizard2Props> = ({ theme }) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    {
      title: "Bill Payment Approval",
      content: <BillPaymentApprovalForm />,
    },
    {
      title: "Connection Approval",
      content: <ConnectionApprovalForm />,
    },
    {
      title: "Get Neighbour Account",
      content: <GetNeighbourAccountForm />,
    },
    {
      title: "Plan Approval Info",
      content: <PlanApprovalInfoForm />,
    },
    {
      title: "Site Inspection Approval",
      content: <SiteInspectionApprovalForm />,
    },
    {
      title: "Site Visit Approval",
      content: <SiteVisitApprovalForm />,
    },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    message.success("All steps completed!");
  };

  return (
    <div>
      <Steps current={currentStep} style={{ marginBottom: "20px" }}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleFinish}>
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default NapsWizard2;
