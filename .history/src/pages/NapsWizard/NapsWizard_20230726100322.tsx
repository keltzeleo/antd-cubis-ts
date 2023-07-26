// Import the necessary components and libraries
import { StepsForm } from "@ant-design/pro-components";
import { message } from "antd";
import React, { useState } from "react";
import "./napsWizard.css";

const circleIconClass = "circle-icon";

// Define the theme interface
interface Theme {
  [key: string]: string;
}

// Define the NapsWizardProps interface
interface NapsWizardProps {
  theme: Theme;
}

// Utility function for simulating wait time
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// NapsWizard component
const NapsWizard: React.FC<NapsWizardProps> = ({ theme }) => {
  const totalSteps = 5; // Replace this with the actual number of steps in your form

  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepData, setStepData] = useState<Record<string, any>>({});

  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, totalSteps - 1));
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const renderFormContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepsForm.StepForm
            name="base"
            title="Step 1"
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              handleNextStep();
            }}
          >
            {/* Form content for Step 1 */}
            {/* ... (Step 1 form content) */}
          </StepsForm.StepForm>
        );
      case 1:
        return (
          <StepsForm.StepForm
            name="checkbox"
            title="Step 2"
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              handleNextStep();
            }}
          >
            {/* Form content for Step 2 */}
            {/* ... (Step 2 form content) */}
          </StepsForm.StepForm>
        );
      case 2:
        return (
          <StepsForm.StepForm
            name="time"
            title="Step 3"
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              handleNextStep();
            }}
          >
            {/* Form content for Step 3 */}
            {/* ... (Step 3 form content) */}
          </StepsForm.StepForm>
        );
      case 3:
        return (
          <StepsForm.StepForm
            name="step4"
            title="Step 4"
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              handleNextStep();
            }}
          >
            {/* Form content for Step 4 */}
            {/* ... (Step 4 form content) */}
          </StepsForm.StepForm>
        );
      case 4:
        return (
          <StepsForm.StepForm
            name="step5"
            title="Step 5"
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              message.success("All steps completed!");
            }}
          >
            {/* Form content for Step 5 */}
            {/* ... (Step 5 form content) */}
          </StepsForm.StepForm>
        );
      default:
        return null;
    }
  };
  const renderNextStepsArea = () => {
    const remainingSteps = totalSteps - activeStep - 1;
    const nextSteps = remainingSteps > 0 ? Math.min(remainingSteps, 3) : 0;

    if (nextSteps === 0) {
      return null;
    }

    return (
      <div className="next-step-area">
        {[...Array(nextSteps)].map((_, index) => (
          <span key={index} className={circleIconClass}>
            {activeStep + index + 2}
          </span>
        ))}
        {remainingSteps > 3 && (
          <span className={circleIconClass} onClick={handleNextStep}>
            (+{remainingSteps})
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="steps-form-wrapper">
      <StepsForm
        current={activeStep + 1}
        onFinish={async (values) => {
          console.log(values);
          setStepData({ ...stepData, ...values });
          await waitTime(1000);
          message.success("All steps completed!");
        }}
        formProps={{
          validateMessages: {
            required: "This field is required",
          },
        }}
      >
        {renderFormContent()}
      </StepsForm>

      {renderNextStepsArea()}
    </div>
  );
};

export default NapsWizard;
