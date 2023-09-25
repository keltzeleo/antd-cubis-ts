import {
  ProForm,
  ProFormDatePicker,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Button } from "antd";
import React from "react";
import WorkOrderTypeSelection from "../../../customComponents/Select/WorkOrderTypeSelection";

const IssueWorkOrder: React.FC = () => {
  const handleFinish = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Form values:", values);
    // Add logic to apply the filter and fetch data here
  };

  const handleReset = () => {
    // Reset the form and clear the filter
    // You can use form.resetFields() here if you have access to the form instance
  };

  const handleWorkOrderSelect = (selectedWorkOrder: string) => {
    // Implement logic for handling work order selection
    console.log(`Selected work order code: ${selectedWorkOrder}`);
  };

  return (
    <div style={{ marginLeft: 24 }}>
      <h1>Issue Work Order</h1>
      <ProForm
        onFinish={handleFinish}
        submitter={{
          render: (_, dom) => (
            <ProFormGroup>
              {dom}
              <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                Reset
              </Button>
            </ProFormGroup>
          ),
        }}
      >
        {/* Filtering Entry */}
        <h2>Filtering Entry</h2>
        <ProFormGroup>
          <ProFormSelect
            label="Work Order Type"
            name="workOrderType"
            rules={[{ required: true, message: "Missing Work Order Type" }]}
            request={async () => []} // Replace with your own options
            // You can use 'request' to fetch options dynamically if needed
            initialValue={undefined}
          >
            <WorkOrderTypeSelection
              onSelect={handleWorkOrderSelect}
              theme={{ cyan: "#00a991" }}
            />
          </ProFormSelect>
          <ProFormText
            label="Account Number"
            name="accountNumber"
            rules={[{ required: true, message: "Missing Account Number" }]}
          />
        </ProFormGroup>

        {/* Fields for Account Information, Meter Information, and Work Order Information here */}

        {/* Work Order Information */}
        <h2>Work Order Information</h2>
        <ProFormGroup>
          <ProFormDatePicker
            label="Schedule Start Date"
            name="startDate"
            rules={[{ required: true, message: "Start Date is required" }]}
          />
          {/* Add other fields for Work Order Information here */}
        </ProFormGroup>
      </ProForm>
    </div>
  );
};

export default IssueWorkOrder;
