import { ProFormDatePicker, ProFormDigit } from "@ant-design/pro-form";
import React, { useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: React.Key;
  status: string;
  block?: [number, number] | null;
  rate?: number;
  effectiveDate?: string;
  isEditing?: boolean;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface TariffChargesDataType {
  key: React.Key;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges?: number;
  effectiveDate?: string;
  isEditing?: boolean;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      valueType: "date",
      formItemProps: {
        rules: [{ required: true, message: "Effective Date is required" }],
      },
      renderFormItem: (_, { defaultRender }) => (
        <ProFormDatePicker name="effectiveDate" placeholder="Select Date" />
      ),
    },
    {
      title: "Minimum Monthly Charges",
      dataIndex: "minimumMonthlyCharges",
      valueType: "digit",
      formItemProps: {
        rules: [
          { required: true, message: "Minimum Monthly Charges is required" },
        ],
      },
      renderFormItem: (_, { defaultRender }) => (
        <ProFormDigit name="minimumMonthlyCharges" />
      ),
    },
    {
      title: "Tariff Rates",
      dataIndex: "tariffRates",
      render: (_, record) => <EditableNestedTable />,
    },
  ];

  return (
    <EditableProTable
      rowKey="id"
      headerTitle="Editable Table"
      columns={columns}
      value={dataSource}
      onChange={setDataSource}
      recordCreatorProps={{
        record: {
          id: Date.now(),
          effectiveDate: "",
          minimumMonthlyCharges: 0,
          tariffRates: [],
        },
        creatorButtonText: "Add New Row",
      }}
      editable={{
        type: "multiple",
        editableKeys,
        onChange: setEditableKeys,
        actionRender: (row, config, defaultDom) => [defaultDom.delete],
      }}
      tableLayout="fixed"
    />
  );
};

export default TariffChargesMaintenance;
