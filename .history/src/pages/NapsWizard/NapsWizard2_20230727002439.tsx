import { Button, Steps } from "antd";
import React, { useState } from "react";
import "./NapsWizard2.css"; // 創建一個CSS文件來自定義組件的樣式

// 導入實際的表單組件
import BillPaymentApprovalForm from "../Forms/BillPaymentApprovalForm";
import ConnectionApprovalForm from "../Forms/ConnectionApprovalForm";
import GetNeighbourAccountForm from "../Forms/GetNeighbourAccountForm";
import PlanApprovalInfoForm from "../Forms/PlanApprovalInfoForm";
import SiteInspectionApprovalForm from "../Forms/SiteInspectionApprovalForm";
import SiteVisitApprovalForm from "../Forms/SiteVisitApprovalForm";
import "./napsWizard.css";
// 此處可以是 mock 表單組件
const MockForm = () => {
  return <div>Mock Form</div>;
};

const { Step } = Steps;

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
  // 此處為 mock 步驟
  {
    title: "Mock Step 1",
    content: <MockForm />,
  },
  {
    title: "Mock Step 2",
    content: <MockForm />,
  },
  {
    title: "Mock Step 3",
    content: <MockForm />,
  },
  {
    title: "Mock Step 4",
    content: <MockForm />,
  },
];

const NapsWizard2: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="naps-wizard2">
      <Steps current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>

      <div className="steps-content">{steps[currentStep].content}</div>

      <div className="steps-action">
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default NapsWizard2;
