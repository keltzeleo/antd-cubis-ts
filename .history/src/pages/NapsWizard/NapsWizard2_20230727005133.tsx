import { Button, Steps, message } from "antd";
import React, { useState } from "react";
import "./napsWizard2.css";

// 將您提供的Forms引入
import BillPaymentApprovalForm from "../Forms/BillPaymentApprovalForm";
import ConnectionApprovalForm from "../Forms/ConnectionApprovalForm";
import GetNeighbourAccountForm from "../Forms/GetNeighbourAccountForm";
import PlanApprovalInfoForm from "../Forms/PlanApprovalInfoForm";
import SiteInspectionApprovalForm from "../Forms/SiteInspectionApprovalForm";
import SiteVisitApprovalForm from "../Forms/SiteVisitApprovalForm";

const { Step } = Steps;

interface Theme {
  [key: string]: string;
}

interface NapsWizard2Props {
  theme: Theme;
}

const NapsWizard2: React.FC<NapsWizard2Props> = ({ theme }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6; // 總共的步驟數量
  const completedSteps = 3; // 已完成的步驟數量（這裡假設是3，您可以根據實際情況來設定）

  const pendingSteps = totalSteps - completedSteps - 1; // 待定的步驟數量

  const steps = Array.from({ length: completedSteps }, (_, i) => i); // 已完成步驟的陣列

  const pendingStepsArray = Array.from({ length: pendingSteps }, (_, i) => i); // 待定步驟的陣列

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    message.success("All steps completed!");
  };

  return (
    <div>
      <div className="steps-container">
        <div className="completed-steps">
          {steps.map((step) => (
            <div key={step} className="step">
              ⬤
            </div>
          ))}
          {completedSteps > 2 && (
            <div className="step-number">+{completedSteps - 2}</div>
          )}
        </div>
        <div className="current-step">
          <div className="step">⬤</div>
        </div>
        <div className="pending-steps">
          {pendingStepsArray.map((step) => (
            <div key={step} className="step">
              ⬤
            </div>
          ))}
          {pendingSteps > 1 && (
            <div className="step-number">+{pendingSteps}</div>
          )}
        </div>
      </div>
      <div className="steps-content">
        {currentStep === 0 && <BillPaymentApprovalForm />}
        {currentStep === 1 && <ConnectionApprovalForm />}
        {currentStep === 2 && <GetNeighbourAccountForm />}
        {currentStep === 3 && <PlanApprovalInfoForm />}
        {currentStep === 4 && <SiteInspectionApprovalForm />}
        {currentStep === 5 && <SiteVisitApprovalForm />}
      </div>
      <div className="steps-action">
        {currentStep < totalSteps - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === totalSteps - 1 && (
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
