import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Steps } from "antd";
import React, { useState } from "react";
import { animated, config, useTransition } from "react-spring";
import BillPaymentApprovalForm from "../Forms/BillPaymentApprovalForm";
import ConnectionApprovalForm from "../Forms/ConnectionApprovalForm";
import GetNeighbourAccountForm from "../Forms/GetNeighbourAccountForm";
import PlanApprovalInfoForm from "../Forms/PlanApprovalInfoForm";
import SiteInspectionApprovalForm from "../Forms/SiteInspectionApprovalForm";
import SiteVisitApprovalForm from "../Forms/SiteVisitApprovalForm";
import "./napsWizard.css";
interface Step {
  name: string;
  component: React.ReactNode;
  color: string;
}

interface Theme {
  [key: string]: string;
}

interface NapsWizardProps {
  theme: Theme;
}

// Define the type for the transitions
type Transition = {
  item: number;
  key: number;
  props: any; // Replace 'any' with the actual type if possible
};

const steps: Step[] = [
  {
    name: "Site Visit Approval Info",
    component: <SiteVisitApprovalForm />,
    color: "#1890ff",
  },
  {
    name: "Get Neighbour Account",
    component: <GetNeighbourAccountForm />,
    color: "#52c41a",
  },
  {
    name: "Plan Approval Info",
    component: <PlanApprovalInfoForm />,
    color: "#432768",
  },
  {
    name: "Site Inspection Approval",
    component: <SiteInspectionApprovalForm />,
    color: "#a89f80",
  },
  {
    name: "Bill Payment Approval",
    component: <BillPaymentApprovalForm />,
    color: "#78ffa7",
  },
  {
    name: "Connection Approval",
    component: <ConnectionApprovalForm />,
    color: "#aa7894",
  },
  // Add more steps here
];

const NapsWizard: React.FC<NapsWizardProps> = ({ theme }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [carouselOffset, setCarouselOffset] = useState<number>(0);
  const [form] = Form.useForm();

  const carouselVisibleSteps = 3; // Number of steps visible in the carousel

  // Create a single-element array with the activeStep
  const activeStepArray: number[] = [activeStep];

  const handleCarouselNext = () => {
    setCarouselOffset((prevOffset) =>
      Math.min(prevOffset + 1, Math.max(steps.length - carouselVisibleSteps, 0))
    );
  };

  const handleCarouselPrev = () => {
    setCarouselOffset((prevOffset) => Math.max(prevOffset - 1, 0));
  };

  const handleNextStep = () => {
    if (activeStep === steps.length - 1) {
      form.submit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleFormSubmit = () => {
    // Handle form submission for the final step here
    console.log("Form submitted!");
  };

  // Add the type definition for the transitions
  const transitions = useTransition(activeStep, {
    key: (step) => step,
    from: { opacity: 0, transform: "rotateX(90deg)" },
    enter: { opacity: 1, transform: "rotateX(0deg)" },
    leave: { opacity: 0, transform: "rotateX(-90deg)" },
    config: config.default,
  }) as Transition[];

  return (
    <div className="wizard-container">
      {/* Step Progress Indicator */}
      <Steps current={activeStep} size="small">
        {steps.map((step, index) => (
          <Steps.Step
            key={index}
            title={step.name}
            icon={<Avatar>{index + 1}</Avatar>}
          />
        ))}
      </Steps>

      {/* Avatar.Group */}
      <div className="avatar-group">
        {carouselOffset > 0 && (
          <div className="carousel-arrow" onClick={handleCarouselPrev}>
            <LeftOutlined />
          </div>
        )}
        {steps
          .slice(carouselOffset, carouselOffset + carouselVisibleSteps)
          .map((step, index) => (
            <div
              key={index}
              className={`wizard-step ${
                carouselOffset + index === activeStep ? "active" : ""
              }`}
              style={{ backgroundColor: step.color }}
              onClick={() => setActiveStep(carouselOffset + index)}
            >
              <Avatar>{carouselOffset + index + 1}</Avatar>
              {step.name}
            </div>
          ))}
        {carouselOffset < steps.length - carouselVisibleSteps && (
          <div className="carousel-arrow" onClick={handleCarouselNext}>
            <RightOutlined />
          </div>
        )}
      </div>

      {/* Form container */}
      <div className="form-container wizard-form-container">
        {/* Use the correct type 'Transition' for the map function */}
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props} className="wizard-form">
            {steps[item].component}
          </animated.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <Button disabled={activeStep === 0} onClick={handlePreviousStep}>
          Previous
        </Button>
        <Button onClick={handleNextStep}>
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>

      {/* Real-time Status Update (Dummy Data) */}
      <div className="status-update">
        <h3>Water Supply Status</h3>
        <p>
          Supply Status: <span className="status-green">Normal</span>
        </p>
        <p>
          Scheduled Interruption: <span className="status-red">None</span>
        </p>
      </div>

      {/* User Feedback and Support */}
      <div className="feedback-form">
        <h3>Feedback Form</h3>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="feedback"
            rules={[{ required: true, message: "Please provide feedback" }]}
          >
            <Input.TextArea placeholder="Your feedback..." rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Feedback
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NapsWizard;
