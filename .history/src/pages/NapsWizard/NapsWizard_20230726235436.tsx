import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import React, { useState } from "react";
import "./napsWizard.css"; // 創建一個CSS文件來自定義組件的樣式

interface Theme {
  [key: string]: string;
}

interface NapsWizardProps {
  theme: Theme;
  // 定義步驟接口
}
interface Step {
  title: string; // 步驟標題
  completed: boolean; // 是否已完成
}

// 定義NapsWizard組件的Props接口
interface NapsWizardProps {
  steps: Step[]; // 步驟數據
}

const NapsWizard: React.FC<NapsWizardProps> = ({ steps, theme }) => {
  // 管理當前完成的步驟數量的狀態
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  // 計算待定步驟的數量
  const pendingSteps = steps.length - completedSteps;

  // 設置上一步和下一步的索引
  const prevStepIndex = completedSteps - 1;
  const nextStepIndex = completedSteps + 1;

  // 計算當前步驟滑動的位置
  const currentStepLeft = `calc(${completedSteps * 100}% + ${
    completedSteps * 16
  }px)`;

  return (
    <div className="naps-wizard">
      {/* 已完成步驟區域 */}
      <div className="completed-steps">
        {steps.slice(0, completedSteps).map((step, index) => (
          <Tooltip key={index} title={step.title}>
            <Avatar icon={<UserOutlined />} />
          </Tooltip>
        ))}
        {completedSteps > 2 && (
          <div className="completed-count">+{completedSteps - 2}</div>
        )}
      </div>

      {/* 當前步驟區域 */}
      <div className="current-step" style={{ left: currentStepLeft }}>
        {steps[completedSteps] && (
          <Tooltip title={steps[completedSteps].title}>
            <Avatar icon={<UserOutlined />} />
          </Tooltip>
        )}
      </div>

      {/* 待定步驟區域 */}
      <div className="pending-steps">
        {steps.slice(completedSteps + 1).map((step, index) => (
          <Tooltip key={index} title={step.title}>
            <Avatar icon={<UserOutlined />} />
          </Tooltip>
        ))}
        {pendingSteps > 2 && (
          <div className="pending-count">+{pendingSteps - 2}</div>
        )}
      </div>
    </div>
  );
};

export default NapsWizard;
