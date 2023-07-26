import { Button, Steps, message } from "antd";
import React, { useEffect, useState } from "react";
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
  const [completedSteps, setCompletedSteps] = useState(3); // 已完成的步驟數量（這裡假設是3，您可以根據實際情況來設定）

  useEffect(() => {
    if (currentStep === totalSteps - 1) {
      // 最後一個步驟完成時，增加已完成步驟數量
      setCompletedSteps((prevCompleted) => prevCompleted + 1);
    }
  }, [currentStep, totalSteps]);

  const pendingSteps = totalSteps - completedSteps - 1; // 待定的步驟數量

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    message.success("All steps completed!");
  };

  const allSteps = [
    // 將所有的步驟資訊移至這裡
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

  const completedStepsList = allSteps.slice(0, completedSteps); // 已完成的步驟列表
  const pendingStepsList = allSteps.slice(completedSteps + 1); // 待定的步驟列表

  return (
    <div>
      <div className="steps-container">
        <div className="completed-steps">
          {completedStepsList.map((step, index) => (
            <div key={index} className="step">
              {index + 1}
            </div>
          ))}
          {completedSteps > 2 && (
            <div className="step-number">+{completedSteps - 2}</div>
          )}
        </div>
        <div className="current-step">
          <div className="step">{currentStep + 1}</div>
          <div className="step-title">
            {currentStep < totalSteps ? allSteps[currentStep].title : ""}
          </div>
        </div>
        <div className="pending-steps">
          {pendingStepsList.map((step, index) => (
            <div key={index} className="step">
              {completedSteps + index + 1}
            </div>
          ))}
          {pendingSteps > 1 && (
            <div className="step-number">+{pendingSteps}</div>
          )}
        </div>
      </div>
      <div className="steps-content">
        {currentStep >= 0 && currentStep < totalSteps
          ? allSteps[currentStep].content
          : null}
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
