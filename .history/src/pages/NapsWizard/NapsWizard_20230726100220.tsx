// Import the necessary components and libraries
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
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
            title={<span className={circleIconClass}>1</span>}
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              handleNextStep(); // Move to the next step after Step 1 finishes
            }}
          >
            {/* Form content for Step 1 */}
            <ProCard
              title="Step 1: Source and Target"
              bordered
              headerBordered
              collapsible
              style={{
                marginBlockEnd: 16,
                minWidth: 800,
                maxWidth: "100%",
              }}
            >
              <ProFormText
                name="name"
                width="md"
                label="Migration Task Name"
                tooltip="Maximum 24 characters for unique identification"
                placeholder="Enter name"
                rules={[{ required: false }]}
              />
              <ProForm.Group title="Nodes" size={8}>
                <ProFormSelect
                  width="sm"
                  name="source"
                  placeholder="Select source node"
                />
                <ProFormSelect
                  width="sm"
                  name="target"
                  placeholder="Select target node"
                />
              </ProForm.Group>
            </ProCard>
          </StepsForm.StepForm>
        );
      case 1:
        return (
          <StepsForm.StepForm
            name="checkbox"
            title={<span className={circleIconClass}>2</span>}
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              handleNextStep();
            }}
          >
            {/* Form content for Step 2 */}
            <ProCard
              style={{
                minWidth: 800,
                marginBlockEnd: 16,
                maxWidth: "100%",
              }}
              title="Step 2: Migration Types"
              bordered
              headerBordered
              collapsible
            >
              <ProFormCheckbox.Group
                name="checkbox"
                label="Migration Types"
                width="lg"
                options={[
                  "Structure Migration",
                  "Full Migration",
                  "Incremental Migration",
                  "Full Validation",
                ]}
              />
              <ProForm.Group>
                <ProFormText name="dbname" label="Business DB Username" />
                <ProFormDatePicker
                  name="datetime"
                  label="Record Save Time"
                  width="sm"
                />
              </ProForm.Group>
              <ProFormCheckbox.Group
                name="checkbox"
                label="LOB Types"
                options={["Complete LOB", "Asynchronous LOB", "Restricted LOB"]}
              />
            </ProCard>
          </StepsForm.StepForm>
        );
      case 2:
        return (
          <StepsForm.StepForm
            name="time"
            title={<span className={circleIconClass}>3</span>}
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              handleNextStep();
            }}
          >
            {/* Form content for Step 3 */}
            <ProCard
              style={{
                marginBlockEnd: 16,
                minWidth: 800,
                maxWidth: "100%",
              }}
              title="Step 3: Deployment Units"
              bordered
              headerBordered
              collapsible
            >
              <ProFormCheckbox.Group
                name="checkbox"
                label="Deployment Units"
                rules={[
                  {
                    required: true,
                  },
                ]}
                options={[
                  "Deployment Unit 1",
                  "Deployment Unit 2",
                  "Deployment Unit 3",
                ]}
              />
              <ProFormSelect
                label="Deployment Group Strategy"
                name="remark"
                rules={[
                  {
                    required: true,
                  },
                ]}
                width="md"
                initialValue="1"
                options={[
                  {
                    value: "1",
                    label: "Strategy 1",
                  },
                  { value: "2", label: "Strategy 2" },
                ]}
              />
              <ProFormSelect
                label="Pod Scheduling Strategy"
                name="remark2"
                width="md"
                initialValue="2"
                options={[
                  {
                    value: "1",
                    label: "Strategy 1",
                  },
                  { value: "2", label: "Strategy 2" },
                ]}
              />
            </ProCard>
          </StepsForm.StepForm>
        );
      case 3:
        return (
          <StepsForm.StepForm
            name="step4"
            title={<span className={circleIconClass}>4</span>}
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              handleNextStep();
            }}
          >
            {/* Form content for Step 4 */}
            <ProCard
              style={{
                marginBlockEnd: 16,
                minWidth: 800,
                maxWidth: "100%",
              }}
              title="Step 4: Additional Details"
              bordered
              headerBordered
              collapsible
            >
              <ProForm.Group>
                <ProFormText
                  name="step4Field1"
                  label="Step 4 Field 1"
                  placeholder="Enter Step 4 Field 1"
                />
                <ProFormDatePicker
                  name="step4Field2"
                  label="Step 4 Field 2"
                  width="sm"
                />
              </ProForm.Group>
              {/* Add more form fields for Step 4 as needed */}
            </ProCard>
          </StepsForm.StepForm>
        );
      case 4:
        return (
          <StepsForm.StepForm
            name="step5"
            title={<span className={circleIconClass}>5</span>}
            onFinish={async (values) => {
              setStepData({ ...stepData, ...values });
              await waitTime(2000);
              message.success("All steps completed!");
            }}
          >
            {/* Form content for Step 5 */}
            <ProCard
              style={{
                marginBlockEnd: 16,
                minWidth: 800,
                maxWidth: "100%",
              }}
              title="Step 5: Final Step"
              bordered
              headerBordered
              collapsible
            >
              <ProFormCheckbox.Group
                name="step5Checkbox"
                label="Step 5 Checkbox Group"
                options={["Option 1", "Option 2", "Option 3"]}
              />
              <ProFormSelect
                label="Step 5 Select"
                name="step5Select"
                width="md"
                initialValue="1"
                options={[
                  {
                    value: "1",
                    label: "Option 1",
                  },
                  { value: "2", label: "Option 2" },
                ]}
              />
              <ProFormText
                name="step5Field"
                label="Step 5 Field"
                placeholder="Enter Step 5 Field"
              />
              {/* Add more form fields for Step 5 as needed */}
            </ProCard>
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
