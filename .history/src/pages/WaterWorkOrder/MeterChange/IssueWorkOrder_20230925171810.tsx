import ProForm, {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Button } from "antd";
import React from "react";
import WorkOrderTypeSelection from "../../../customComponents/Select/WorkOrderTypeSelection";

interface Theme {
  [key: string]: string;
}

interface IssueWorkOrderProps {
  theme?: Theme;
}

const IssueWorkOrder: React.FC<IssueWorkOrderProps> = ({ theme }) => {
  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Form values:", values);
    // Add logic to apply the filter and fetch data here
  };

  const handleReset = () => {
    // Clear the form and reset the filter
  };

  const handleWorkOrderSelect = (selectedWorkOrder: string) => {
    // Implement logic for handling work order selection
    console.log(`Selected work order code: ${selectedWorkOrder}`);
  };

  return (
    <div style={{ marginLeft: 24 }}>
      <h1>Issue Work Order</h1>
      <ProForm
        onFinish={handleSubmit}
        submitter={{
          render: (_, dom) => (
            <>
              {dom}
              <Button onClick={handleReset} style={{ marginLeft: 8 }}>
                Reset
              </Button>
            </>
          ),
        }}
      >
        {/* Filtering Entry */}
        <h2>Filtering Entry</h2>
        <ProForm.Group>
          <ProFormSelect
            name="workOrderType"
            label="Work Order Type"
            rules={[{ required: true, message: "Missing Work Order Type" }]}
            request={async () => {
              // Implement the logic to fetch work order types here
              return [
                { label: "Type 1", value: "type1" },
                { label: "Type 2", value: "type2" },
              ];
            }}
          />
          <ProFormText
            name="accountNumber"
            label="Account Number"
            rules={[{ required: true, message: "Missing Account Number" }]}
          />
          <WorkOrderTypeSelection onSelect={handleWorkOrderSelect} / theme={}>
        </ProForm.Group>

        {/* Fields for Account Information, Meter Information, and Work Order Information here */}

        {/* Work Order Information */}
        <h2>Work Order Information</h2>
        <ProFormDatePicker
          name="startDate"
          label="Schedule Start Date"
          rules={[{ required: true, message: "Start Date is required" }]}
          fieldProps={{
            format: "DD/MM/YYYY",
          }}
        />

        {/* Add other fields for Work Order Information here */}
      </ProForm>
    </div>
  );
};

export default IssueWorkOrder;
