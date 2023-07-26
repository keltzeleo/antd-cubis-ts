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
            <StepsForm.StepForm.StepRender>
              {/* Form content for Step 1 */}
              <div>
                <h3>Step 1: Source and Target</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Migration Task Name"
                />
                <select name="source">
                  <option value="">Select source node</option>
                  {/* Add options for source nodes */}
                </select>
                <select name="target">
                  <option value="">Select target node</option>
                  {/* Add options for target nodes */}
                </select>
              </div>
            </StepsForm.StepForm.StepRender>
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
            <StepsForm.StepForm.StepRender>
              {/* Form content for Step 2 */}
              <div>
                <h3>Step 2: Migration Types</h3>
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Structure Migration"
                />{" "}
                Structure Migration
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Full Migration"
                />{" "}
                Full Migration
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Incremental Migration"
                />{" "}
                Incremental Migration
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Full Validation"
                />{" "}
                Full Validation
                <input
                  type="text"
                  name="dbname"
                  placeholder="Business DB Username"
                />
                <input type="date" name="datetime" />
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Complete LOB"
                />{" "}
                Complete LOB
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Asynchronous LOB"
                />{" "}
                Asynchronous LOB
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Restricted LOB"
                />{" "}
                Restricted LOB
              </div>
            </StepsForm.StepForm.StepRender>
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
            <StepsForm.StepForm.StepRender>
              {/* Form content for Step 3 */}
              <div>
                <h3>Step 3: Deployment Units</h3>
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Deployment Unit 1"
                />{" "}
                Deployment Unit 1
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Deployment Unit 2"
                />{" "}
                Deployment Unit 2
                <input
                  type="checkbox"
                  name="checkbox"
                  value="Deployment Unit 3"
                />{" "}
                Deployment Unit 3
                <select name="remark">
                  <option value="1">Strategy 1</option>
                  <option value="2">Strategy 2</option>
                  {/* Add more options for deployment group strategies */}
                </select>
                <select name="remark2">
                  <option value="1">Strategy 1</option>
                  <option value="2">Strategy 2</option>
                  {/* Add more options for pod scheduling strategies */}
                </select>
              </div>
            </StepsForm.StepForm.StepRender>
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
            <StepsForm.StepForm.StepRender>
              {/* Form content for Step 4 */}
              <div>
                <h3>Step 4: Additional Details</h3>
                <input
                  type="text"
                  name="step4Field1"
                  placeholder="Step 4 Field 1"
                />
                <input type="date" name="step4Field2" />
                {/* Add more form fields for Step 4 as needed */}
              </div>
            </StepsForm.StepForm.StepRender>
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
            <StepsForm.StepForm.StepRender>
              {/* Form content for Step 5 */}
              <div>
                <h3>Step 5: Final Step</h3>
                <input
                  type="checkbox"
                  name="step5Checkbox"
                  value="Option 1"
                />{" "}
                Option 1
                <input
                  type="checkbox"
                  name="step5Checkbox"
                  value="Option 2"
                />{" "}
                Option 2
                <input
                  type="checkbox"
                  name="step5Checkbox"
                  value="Option 3"
                />{" "}
                Option 3
                <select name="step5Select">
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  {/* Add more options for Step 5 select */}
                </select>
                <input
                  type="text"
                  name="step5Field"
                  placeholder="Step 5 Field"
                />
                {/* Add more form fields for Step 5 as needed */}
              </div>
            </StepsForm.StepForm.StepRender>
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
