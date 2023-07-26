import { Steps } from "antd";
import React from "react";

const { Step } = Steps;

const NapsWizard: React.FC = () => {
  // 假设有10个步骤
  const totalSteps = 10;
  // 假设当前已完成的步骤为4
  const completedSteps = 4;

  // 计算进度百分比
  const calculateProgress = (completed: number, total: number) => {
    return Math.floor((completed / total) * 100);
  };

  // 获取进度百分比
  const progressPercentage = calculateProgress(completedSteps, totalSteps);

  return (
    <>
      <div className="naps-wizard-container">
        <div className="naps-wizard-completed-steps">
          {/* 已完成步骤显示 */}
          {Array.from({ length: completedSteps }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <svg className="naps-wizard-progress-ring" width="120" height="120">
          {/* ...环形进度条的代码... */}
          <circle
            className="naps-wizard-progress-ring-circle"
            r="52"
            cx="60"
            cy="60"
            fill="transparent"
            stroke="#1890ff"
            strokeWidth="8"
            strokeDasharray={`${progressPercentage} 100`}
          />
          {/* 环形进度条中的步骤编号显示 */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#1890ff"
            fontSize="18"
          >
            {completedSteps + 1}
          </text>
        </svg>
        <div className="naps-wizard-remaining-steps">
          {/* 尚未完成步骤显示 */}
          {Array.from(
            { length: totalSteps - completedSteps - 1 },
            (_, index) => (
              <span key={index}>{completedSteps + index + 2}</span>
            )
          )}
        </div>
        <Steps
          current={completedSteps}
          percent={progressPercentage}
          size="small"
          labelPlacement="vertical"
          className="naps-wizard-steps"
        >
          {/* Ant Design Steps 组件的代码 */}
          {Array.from({ length: totalSteps }, (_, index) => (
            <Step key={index} title={`步骤 ${index + 1}`} />
          ))}
        </Steps>
      </div>
    </>
  );
};

export default NapsWizard;
