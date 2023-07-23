import { Line } from "@ant-design/charts";
import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from "@ant-design/pro-components";
import React, { useState } from "react";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  tariffCode?: string;
  tariffAbbreviation?: string;
  readonly?: string;
  decs?: string;
  state?: string;

  blockConsumption1?: [number, number] | null;
  ratespercubicm1?: number;
  blockConsumption2?: [number, number] | null;
  ratespercubicm2?: number;
  blocks?: string[]; // Array to store "Block" values
  rates?: string[]; // Array to store "Rate" values
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: "活动名称一",
    readonly: "活动名称一",
    tariffCode: "TAR-001",
    tariffAbbreviation: "TA",
    decs: "这个活动真好玩",
    state: "open",
    created_at: "1590486176000",
    update_at: "1590486176000",
    blockConsumption1: [0, 19],
    ratespercubicm1: 0.03,
    blockConsumption2: [20, 49],
    ratespercubicm2: 0.07,
    blocks: ["Block 1", "Block 2", "Block 3", "Block 4", "Block 5", "Block 6"], // Added mock data for "Block" column
    rates: ["Rate 1", "Rate 2", "Rate 3", "Rate 4", "Rate 5", "Rate 6"], // Added mock data for "Rate" column
  },
  {
    id: 624691229,
    title: "活动名称二",
    readonly: "活动名称二",
    tariffCode: "TAR-002",
    tariffAbbreviation: "TB",
    decs: "这个活动真好玩",
    state: "closed",
    created_at: "1590481162000",
    update_at: "1590481162000",
    blockConsumption1: [0, 15],
    ratespercubicm1: 0.05,
    blockConsumption2: [16, 35],
    ratespercubicm2: 0.08,
    blocks: ["Block 1", "Block 2", "Block 3", "Block 4", "Block 5", "Block 6"], // Added mock data for "Block" column
    rates: ["Rate 1", "Rate 2", "Rate 3", "Rate 4", "Rate 5", "Rate 6"], // Added mock data for "Rate" column
  },
];

const EditableTable: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      valueType: "indexBorder",
    },
    {
      title: "活动名称",
      dataIndex: "title",
      tooltip: "只读，使用form.getFieldValue获取不到值",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: "此项为必填项" }] : [],
        };
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: "150",
    },
    {
      title: "活动名称二",
      dataIndex: "readonly",
      tooltip: "只读，使用form.getFieldValue可以获取到值",
      readonly: true,
      width: "150",
    },
    {
      title: "状态",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        all: { text: "全部", status: "Default" },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
        },
      },
    },
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      valueType: "text",
      readonly: true,
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      valueType: "text",
      readonly: true,
    },
    {
      title: "Effective Date (from)",
      dataIndex: "created_at",
      valueType: "date",
    },
    {
      title: "Block Consumption 1",
      dataIndex: "blockConsumption1",
      valueType: "digitRange", // use 'digitRange' to enter two numbers
      width: "150",
      render: (text, record) => (
        <span>
          {record.blockConsumption1 &&
            `${record.blockConsumption1[0]} - ${record.blockConsumption1[1]}`}
        </span>
      ),
    },
    {
      title: "Rates 1",
      dataIndex: "ratespercubicm1", // Updated to "ratespercubicm1"
      valueType: "digit", // use 'digit' to enter one number
      width: "100",
    },
    {
      title: "Block Consumption 2",
      dataIndex: "blockConsumption2",
      valueType: "digitRange", // use 'digitRange' to enter two numbers
      width: "150",
      render: (text, record) => (
        <span>
          {record.blockConsumption2 &&
            `${record.blockConsumption2[0]} - ${record.blockConsumption2[1]}`}
        </span>
      ),
    },
    {
      title: "Rates 2",
      dataIndex: "ratespercubicm2", // Updated to "ratespercubicm1"
      valueType: "digit", // use 'digit' to enter one number
      width: "100",
    },
    {
      title: "描述",
      dataIndex: "decs",
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || "", "title"]) === "不好玩") {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },

    {
      title: "Block", // Added column header for "Block"
      dataIndex: "blocks",
      readonly: true, // Read-only
      width: "100",
      render: (text, record) => (
        <span>{record.blocks && record.blocks.join(", ")}</span>
      ),
    },
    {
      title: "Rate", // Added column header for "Rate"
      dataIndex: "rates",
      readonly: true, // Read-only
      width: "100",
      render: (text, record) => (
        <span>{record.rates && record.rates.join(", ")}</span>
      ),
    },
    {
      title: "操作",
      valueType: "option",
      width: 150,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const convertDataForChart = (data: DataSourceType) => {
    const chartData: { block: string; rate: string; consumption: number }[] =
      [];

    if (data.blocks && data.rates && data.blockConsumption1) {
      data.blocks.forEach((block, index) => {
        if (data.rates[index] && data.blockConsumption1[index]) {
          chartData.push({
            block,
            rate: data.rates[index],
            consumption: data.blockConsumption1[index][1],
          });
        }
      });
    }

    return chartData;
  };

  return (
    <>
      <EditableProTable<DataSourceType>
      // ... (existing code)
      />
      {editableKeys.map((rowKey) => {
        const row = dataSource.find((data) => data.id === rowKey);
        if (row) {
          const chartData = convertDataForChart(row);
          const config = {
            data: chartData,
            xField: "block",
            yField: "consumption",
            seriesField: "rate",
            height: 300,
          };

          return (
            <ProCard
              key={row.id}
              title={`Graph for ${row.title}`}
              headerBordered
              collapsible
              defaultCollapsed
            >
              <Line {...config} />
            </ProCard>
          );
        }
        return null;
      })}
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};

export default EditableTable;
