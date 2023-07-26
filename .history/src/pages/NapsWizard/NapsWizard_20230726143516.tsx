import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  StepsForm,
} from "@ant-design/pro-components";
import { message } from "antd";
import "./napsWizard.css";

// 假设有10个步骤
const totalSteps = 10;

// 假设已完成的步骤数量
const completedSteps = 3;

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const NapsWizard = () => {
  // 生成已完成步骤的显示
  const generateCompletedStepsDisplay = (completed, total) => {
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
    <ProCard style={{ marginBlockEnd: 16, minWidth: 800, maxWidth: "100%" }}>
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
  const generateRemainingStepsDisplay = (current, total) => {
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
  const calculateProgress = (completed, total) => {
    return Math.floor((completed / total) * 100);
  };

  // 计算当前步骤位置的角度
  const currentStepAngle = (completed, total) => {
    return (360 / total) * completed;
  };

  // 获取进度百分比
  const progressPercentage = calculateProgress(completedSteps, totalSteps);
  // 获取当前步骤位置的角度
  const angle = currentStepAngle(completedSteps, totalSteps);

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
          {/* 环形进度条显示 */}
          <svg className="naps-wizard-progress-ring" width="120" height="120">
            {/* 外圈 */}
            <circle
              className="naps-wizard-progress-ring-circle"
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              strokeWidth="6"
              stroke="#f0f0f0"
            />
            {/* 进度条 */}
            <circle
              className="naps-wizard-progress-ring-progress"
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              strokeWidth="6"
              stroke="#1890ff"
              strokeDasharray={`${progressPercentage} 100`}
            />
            {/* 步骤号码 */}
            <text
              className="naps-wizard-step-number"
              x="60"
              y="60"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fontWeight="bold"
              fill="#1890ff"
              transform={`rotate(${angle}, 60, 60)`}
            >
              {completedSteps}
            </text>
            {/* 当前步骤标题 */}
            <text
              className="naps-wizard-step-title"
              x="60"
              y="45"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="bold"
              fill="#1890ff"
            >
              步骤 {completedSteps}
            </text>
          </svg>
        </div>
      </StepsForm>
    </>
  );
};

export default NapsWizard;
