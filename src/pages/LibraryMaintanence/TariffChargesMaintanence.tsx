import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormList,
} from "@ant-design/pro-form";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, message, Modal } from "antd";
import React from "react";

interface MainTableData {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharge: number;
  effectiveSince: string;
}

interface NestedTableData {
  key: string;
  effectiveSince: string;
  block: number;
  rate: number;
}

const MainTable: React.FC = () => {
  const actionRef = React.useRef<ActionType>();

  const columns: ProColumns<MainTableData>[] = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
      search: true,
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
      search: true,
    },
    {
      title: "Monthly Minimum Charge",
      dataIndex: "monthlyMinimumCharge",
      key: "monthlyMinimumCharge",
    },
    {
      title: "Effective Since",
      dataIndex: "effectiveSince",
      key: "effectiveSince",
      search: true,
    },
  ];

  const dataSource: MainTableData[] = [
    {
      key: "1",
      tariffCode: "TC001",
      tariffAbbreviation: "TC1",
      monthlyMinimumCharge: 100,
      effectiveSince: "2023-07-10",
    },
    {
      key: "2",
      tariffCode: "TC002",
      tariffAbbreviation: "TC2",
      monthlyMinimumCharge: 200,
      effectiveSince: "2023-07-11",
    },
    {
      key: "3",
      tariffCode: "TC003",
      tariffAbbreviation: "TC3",
      monthlyMinimumCharge: 150,
      effectiveSince: "2023-07-12",
    },
  ];

  return (
    <ProTable<MainTableData>
      actionRef={actionRef}
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      search={true}
      pagination={{ pageSize: 10 }}
    />
  );
};

const NestedTable: React.FC = () => {
  return (
    <ProFormList
      name="nestedTableData"
      initialValue={[
        {
          key: "1",
          effectiveSince: "2023-07-10",
          block: 50,
          rate: 1.23,
        },
        {
          key: "2",
          effectiveSince: "2023-07-11",
          block: 60,
          rate: 1.45,
        },
      ]}
    >
      <ProForm.Item
        name="effectiveSince"
        label="Effective Since"
        rules={[{ required: true }]}
      >
        <ProFormDatePicker />
      </ProForm.Item>
      <ProForm.Item name="block" label="Block" rules={[{ required: true }]}>
        <ProFormDigit />
      </ProForm.Item>
      <ProForm.Item name="rate" label="Rate" rules={[{ required: true }]}>
        <ProFormDigit />
      </ProForm.Item>
    </ProFormList>
  );
};

const TariffChargesMaintenance: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [actionType, setActionType] = React.useState<string>("");

  const handleAddRow = () => {
    setActionType("add");
    setIsModalVisible(true);
  };

  const handleEditRow = () => {
    setActionType("edit");
    setIsModalVisible(true);
  };

  const handleDeleteRow = () => {
    message.success("Row deleted");
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    message.success(`Row ${actionType === "add" ? "added" : "edited"}`);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleAddRow}>
        Add Row
      </Button>
      <Button onClick={handleEditRow}>Edit Row</Button>
      <Button danger onClick={handleDeleteRow}>
        Delete Row
      </Button>
      <MainTable />
      <Modal
        title={actionType === "add" ? "Add Row" : "Edit Row"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <ProForm>
          <NestedTable />
        </ProForm>
      </Modal>
    </>
  );
};

export default TariffChargesMaintenance;
