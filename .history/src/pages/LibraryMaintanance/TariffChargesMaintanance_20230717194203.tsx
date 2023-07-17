import { Button, DatePicker, Input, Table } from "antd";
import moment, {Moment} from "moment";
import React, { useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: React.Key;
  nestedKey?: React.Key;
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
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([
    {
      key: "1",
      tariffCode: "12345",
      tariffAbbreviation: "ABC",
      monthlyMinimumCharges: 100.0,
      effectiveDate: "2023-01-01",
      isEditing: false,
      createdBy: "Admin",
      createDate: "2023-01-01",
      modifiedBy: "Admin",
      modifiedDate: "2023-01-01",
      nestedData: [
        {
          key: "1",
          status: "Active",
          block: [1, 1],
          rate: 50.0,
          effectiveDate: "2023-01-01",
          createdBy: "Admin",
          createDate: "2023-01-01",
          modifiedBy: "Admin",
          modifiedDate: "2023-01-01",
        },
        {
          key: "2",
          status: "Active",
          block: [2, 2],
          rate: 75.0,
          effectiveDate: "2023-02-01",
          createdBy: "Admin",
          createDate: "2023-02-01",
          modifiedBy: "Admin",
          modifiedDate: "2023-02-01",
        },
      ],
    },
  ]);

  const handleSave = () => {
    // Perform saving logic or API call with the updated data
    console.log("Updated Data:", dataSource);
  };

  const handleNestedCellChange = (
    value: any,
    record: NestedDataType,
    dataIndex: string
  ) => {
    const newData = [...dataSource];
    const targetRow = newData.find((item) => item.key === record.nestedKey);
    if (targetRow) {
      targetRow[dataIndex] = value;
      setDataSource(newData);
    }
  };

  const handleNestedEdit = (record: NestedDataType) => {
    const newData = [...dataSource];
    const targetRow = newData.find((item) => item.key === record.nestedKey);
    if (targetRow) {
      targetRow.isEditing = true;
      setDataSource(newData);
    }
  };

  const handleNestedSave = (record: NestedDataType) => {
    const newData = [...dataSource];
    const targetRow = newData.find((item) => item.key === record.nestedKey);
    if (targetRow) {
      targetRow.isEditing = false;
      setDataSource(newData);
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: TariffChargesDataType) => {
        if (record.isEditing) {
          return (
            <Button type="link" onClick={() => handleNestedSave(record)}>
              Save
            </Button>
          );
        }
        return (
          <Button type="link" onClick={() => handleNestedEdit(record)}>
            Edit
          </Button>
        );
      },
    },
  ];

  const nestedColumns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (text: any) => {
        if (text) {
          const [start, end] = text;
          return `${start} - ${end}`;
        }
        return null;
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: string, record: NestedDataType) =>
        record.isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleNestedCellChange(e.target.value, record, "rate")
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: string, record: NestedDataType) =>
        record.isEditing ? (
          <DatePicker
            value={moment(text)}
            onChange={(date) =>
              handleNestedCellChange(
                date?.format("YYYY-MM-DD"),
                record,
                "effectiveDate"
              )
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
    },
  ];

  return (
    <Table<TariffChargesDataType>
      dataSource={dataSource}
      columns={columns}
      rowKey="key"
      expandable={{
        expandedRowRender: (record) => (
          <Table<NestedDataType>
            dataSource={record.nestedData}
            columns={nestedColumns}
            rowKey="key"
            pagination={false}
          />
        ),
      }}
      footer={() => (
        <Button type="primary" onClick={handleSave}>
          Save All
        </Button>
      )}
    />
  );
};

export default TariffChargesMaintenance;
