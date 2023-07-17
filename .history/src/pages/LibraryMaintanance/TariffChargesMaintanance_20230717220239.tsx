import { Button, DatePicker, InputNumber, Space, Table, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment, { Moment } from "moment";
import React, { useState } from "react";

interface TariffData {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges: number;
  effectiveDate: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData: NestedData[];
}

interface NestedData {
  key: string;
  status: string;
  block: [number, number];
  rate: number;
  effectiveDate: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

const TariffChargesMaintenance: React.FC = () => {
  const [data, setData] = useState<TariffData[]>([
    {
      key: "1",
      tariffCode: "TAR-001",
      tariffAbbreviation: "TA",
      monthlyMinimumCharges: 100,
      effectiveDate: "2023-07-01",
      createdBy: "John Doe",
      createDate: "2023-07-01",
      modifiedBy: "John Doe",
      modifiedDate: "2023-07-01",
      nestedData: [
        {
          key: "1-1",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "1-2",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "1-3",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
      ],
    },
    {
      key: "2",
      tariffCode: "TAR-002",
      tariffAbbreviation: "TB",
      monthlyMinimumCharges: 150,
      effectiveDate: "2023-07-01",
      createdBy: "Jane Smith",
      createDate: "2023-07-01",
      modifiedBy: "Jane Smith",
      modifiedDate: "2023-07-01",
      nestedData: [
        {
          key: "2-1",
          status: "Applied",
          block: [0, 20],
          rate: 0.05,
          effectiveDate: "2023-07-01",
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
        },
        {
          key: "2-2",
          status: "Applied",
          block: [21, 30],
          rate: 0.18,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "2-3",
          status: "Pending",
          block: [31, 100],
          rate: 0.23,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
      ],
    },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState<TariffData[]>([]);

  const enterEditMode = () => {
    setTempData(data.map((item) => ({ ...item })));
    setEditMode(true);
  };

  const cancelEditMode = () => {
    setTempData([]);
    setEditMode(false);
  };

  const saveChanges = () => {
    setData(tempData);
    setTempData([]);
    setEditMode(false);
    message.success("Changes saved successfully.");
  };

  const handleSaveMonthlyMinimumCharges = (
    value: number | undefined,
    record: TariffData,
    nestedRecord: NestedData
  ) => {
    const newData = tempData.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          nestedData: item.nestedData.map((nestedItem) => {
            if (nestedItem.key === nestedRecord.key) {
              return {
                ...nestedItem,
                block: [value || 0, nestedItem.block[1]],
              };
            }
            return nestedItem;
          }),
        };
      }
      return item;
    });
    setTempData(newData);
  };

  const handleSaveEffectiveDate = (
    value: Moment | undefined,
    record: TariffData,
    nestedRecord: NestedData
  ) => {
    const newData = tempData.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          nestedData: item.nestedData.map((nestedItem) => {
            if (nestedItem.key === nestedRecord.key) {
              return {
                ...nestedItem,
                effectiveDate: value ? value.format("YYYY-MM-DD") : "",
              };
            }
            return nestedItem;
          }),
        };
      }
      return item;
    });
    setTempData(newData);
  };

  const tariffColumns: ColumnsType<TariffData> = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      render: (_, record) => (
        <InputNumber
          value={
            editMode
              ? tempData.find((item) => item.key === record.key)
                  ?.monthlyMinimumCharges
              : record.monthlyMinimumCharges
          }
          onChange={(value) =>
            handleSaveMonthlyMinimumCharges(value, record, null)
          }
          disabled={!editMode}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      render: (_, record) => (
        <DatePicker
          value={moment(record.effectiveDate)}
          onChange={(value) => handleSaveEffectiveDate(value, record, null)}
          disabled={!editMode}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space>
          {editMode ? (
            <>
              <Button
                type="primary"
                onClick={() => saveChanges()}
                disabled={!tempData.find((item) => item.key === record.key)}
              >
                Save
              </Button>
              <Button onClick={() => cancelEditMode()}>Cancel</Button>
            </>
          ) : (
            <Button type="primary" onClick={() => enterEditMode()}>
              Edit
            </Button>
          )}
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const nestedColumns: ColumnsType<NestedData> = [
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Block",
      dataIndex: "block",
      render: (_, record) => (
        <Space>
          <InputNumber
            value={record.block[0]}
            onChange={(value) =>
              handleSaveMonthlyMinimumCharges(value, record, null)
            }
            disabled={!editMode}
          />
          <InputNumber
            value={record.block[1]}
            onChange={(value) =>
              handleSaveMonthlyMinimumCharges(value, record, null)
            }
            disabled={!editMode}
          />
        </Space>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      render: (_, record) => (
        <InputNumber
          value={record.rate}
          onChange={(value) =>
            handleSaveMonthlyMinimumCharges(value, record, null)
          }
          disabled={!editMode}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      render: (_, record) => (
        <DatePicker
          value={moment(record.effectiveDate)}
          onChange={(value) => handleSaveEffectiveDate(value, record, null)}
          disabled={!editMode}
        />
      ),
    },
  ];

  const expandedRowRender = (record: TariffData) => (
    <Table<NestedData>
      columns={nestedColumns}
      dataSource={record.nestedData}
      pagination={false}
    />
  );

  const handleDelete = (record: TariffData) => {
    const newData = data.filter((item) => item.key !== record.key);
    setData(newData);
    message.success("Record deleted successfully.");
  };

  const editButton = (
    <Button type="primary" onClick={enterEditMode}>
      Edit
    </Button>
  );

  const saveButton = (
    <Button type="primary" onClick={saveChanges}>
      Save
    </Button>
  );

  const cancelButton = <Button onClick={cancelEditMode}>Cancel</Button>;

  const actionButtons = editMode ? (
    <Space>
      {saveButton}
      {cancelButton}
    </Space>
  ) : (
    editButton
  );

  return (
    <Table<TariffData>
      dataSource={data}
      columns={tariffColumns}
      expandable={{ expandedRowRender }}
      rowKey="key"
      pagination={false}
      footer={() => <Space>{editMode && actionButtons}</Space>}
    />
  );
};

export default TariffChargesMaintenance;
