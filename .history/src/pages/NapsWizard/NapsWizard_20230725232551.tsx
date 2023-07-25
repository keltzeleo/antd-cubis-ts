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
import React from "react";
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
        {/* Step 1 */}
        <StepsForm.StepForm
          name="base"
          title="第一步骤"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProCard
            title="源和目标"
            bordered
            headerBordered
            collapsible
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: "100%",
            }}
          >
            {/* Your Step 1 content here */}
            <ProFormText
              name="name"
              width="md"
              label="迁移任务名称"
              tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入名称"
              rules={[{ required: false }]}
            />
            <ProForm.Group title="节点" size={8}>
              <ProFormSelect
                width="sm"
                name="source"
                placeholder="选择来源节点"
              />
              <ProFormSelect
                width="sm"
                name="target"
                placeholder="选择目标节点"
              />
            </ProForm.Group>
          </ProCard>
        </StepsForm.StepForm>
        {/* Step 2 */}
        <StepsForm.StepForm name="checkbox" title="第二步骤">
          <ProCard
            style={{
              minWidth: 800,
              marginBlockEnd: 16,
              maxWidth: "100%",
            }}
          >
            {/* Your Step 2 content here */}
            <ProFormCheckbox.Group
              name="checkbox"
              label="迁移类型"
              width="lg"
              options={["结构迁移", "全量迁移", "增量迁移", "全量校验"]}
            />
            <ProForm.Group>
              <ProFormText name="dbname" label="业务 DB 用户名" />
              <ProFormDatePicker
                name="datetime"
                label="记录保存时间"
                width="sm"
              />
            </ProForm.Group>
            <ProFormCheckbox.Group
              name="checkbox"
              label="迁移类型"
              options={["完整 LOB", "不同步 LOB", "受限制 LOB"]}
            />
          </ProCard>
        </StepsForm.StepForm>
        {/* Step 3 */}
        <StepsForm.StepForm name="time" title="第三步骤">
          <ProCard
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: "100%",
            }}
          >
            {/* Your Step 3 content here */}
            <ProFormCheckbox.Group
              name="checkbox"
              label="部署单元"
              rules={[
                {
                  required: true,
                },
              ]}
              options={["部署单元1", "部署单元2", "部署单元3"]}
            />
            <ProFormSelect
              label="部署分组策略"
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
                  label: "策略一",
                },
                { value: "2", label: "策略二" },
              ]}
            />
            <ProFormSelect
              label="Pod 调度策略"
              name="remark2"
              width="md"
              initialValue="2"
              options={[
                {
                  value: "1",
                  label: "策略一",
                },
                { value: "2", label: "策略二" },
              ]}
            />
          </ProCard>
        </StepsForm.StepForm>

        {/* Step 4 */}
        <StepsForm.StepForm name="step4" title="第四步骤">
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
        </StepsForm.StepForm>

        {/* Step 5 */}
        <StepsForm.StepForm name="step5" title="第五步骤">
          <ProCard
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: "100%",
            }}
          >
            {/* Your Step 5 content here */}
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
      </StepsForm>
    </>
  );
};

export default NapsWizard;
