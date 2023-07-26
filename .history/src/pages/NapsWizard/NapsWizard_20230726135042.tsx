import React from "react";
// import BillPaymentApprovalForm from "../Forms/BillPaymentApprovalForm";
// import ConnectionApprovalForm from "../Forms/ConnectionApprovalForm";
// import GetNeighbourAccountForm from "../Forms/GetNeighbourAccountForm";
// import PlanApprovalInfoForm from "../Forms/PlanApprovalInfoForm";
// import SiteInspectionApprovalForm from "../Forms/SiteInspectionApprovalForm";
// import SiteVisitApprovalForm from "../Forms/SiteVisitApprovalForm";

import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { message } from "antd";
import "./napsWizard.css";

interface Theme {
  [key: string]: string;
}

interface NapsWizardProps {
  theme: Theme;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const NapsWizard: React.FC<NapsWizardProps> = ({ theme }) => {
  // 假设有10个步骤
  const totalSteps = 10;

  // 假设已完成的步骤数量
  const completedSteps = 3;

  // 生成已完成步骤的顺序号码显示
  const generateCompletedStepsDisplay = (completed: number, total: number) => {
    const display = [];
    for (let i = 1; i <= completed; i++) {
      display.push(`❶❷⓵`[i - 1]);
    }
    return display.join(" ");
  };

  // 获取已完成步骤的显示
  const completedStepsDisplay = generateCompletedStepsDisplay(
    completedSteps,
    totalSteps
  );

  // 当前步骤
  const currentStep = 4; // 假设当前步骤是第四步

  // 表单内容
  const currentStepFormContent = (
    <ProCard
      style={{
        marginBlockEnd: 16,
        minWidth: 800,
        maxWidth: "100%",
      }}
    >
      {/* Your Step 4 content here */}
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
  );

  // 生成尚未完成步骤的显示
  const generateRemainingStepsDisplay = (current: number, total: number) => {
    const display = [];
    for (let i = current + 1; i <= total; i++) {
      display.push(`❺❻⓸`[i - current - 1]);
    }
    return display.join(" ");
  };

  // 获取尚未完成步骤的显示
  const remainingStepsDisplay = generateRemainingStepsDisplay(
    currentStep,
    totalSteps
  );

  // 计算进度百分比
  const calculateProgress = (completed: number, total: number) => {
    return Math.floor((completed / total) * 100);
  };

  // 获取进度百分比
  const progressPercentage = calculateProgress(completedSteps, totalSteps);

  return (
    <>
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          await waitTime(1000);
          message.success("提交成功");
        }}
        formProps={{
          validateMessages: {
            required: "此项为必填项",
          },
        }}
      >
        <div className="naps-wizard-container">
          {/* 左侧已完成步骤显示 */}
          <div className="naps-wizard-completed-steps">
            {completedStepsDisplay}
          </div>

          {/* 中间当前步骤显示 */}
          <div className="naps-wizard-current-step">
            <div className="naps-wizard-step-title">❹ 步骤标题</div>
            {currentStepFormContent}
          </div>

          {/* 右侧尚未完成步骤显示 */}
          <div className="naps-wizard-remaining-steps">
            {remainingStepsDisplay}
          </div>

          {/* 进度条显示 */}
          <div className="naps-wizard-progress-bar">
            <div
              className="naps-wizard-progress-bar-inner"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </StepsForm>
    </>
  );
};

export default NapsWizard;
