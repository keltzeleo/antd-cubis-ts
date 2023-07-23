import { Line } from "@ant-design/charts";
import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface EditableTableProps {
  theme: Theme;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type Tuple = [number, number]; // Define a type for tuples

type DataSourceType = {
  id: React.Key;
  state?: string;

  tariffCode?: string;
  tariffAbbreviation?: string;
  decs?: string;

  blockConsumption1?: Tuple | null; // Update the type to use the Tuple type
  ratespercubicm1?: number;
  blockConsumption2?: Tuple | null; // Update the type to use the Tuple type
  ratespercubicm2?: number; // Update to a number
  blockConsumption3?: Tuple | null; // Update the type to use the Tuple type
  ratespercubicm3?: number;
  blockConsumption4?: Tuple | null; // Update the type to use the Tuple type
  ratespercubicm4?: number; // Update to a number
  blockConsumption5?: Tuple | null; // Update the type to use the Tuple type
  ratespercubicm5?: number;
  blockConsumption6?: Tuple | null; // Update the type to use the Tuple type
  ratespercubicm6?: number; // Update to a number
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    state: "open",

    tariffCode: "TAR-001",
    tariffAbbreviation: "TA",
    decs: "这个活动真好玩",
    created_at: "1590486176000",
    update_at: "1590486176000",
    blockConsumption1: [0, 20], // Corrected to use an array of numbers
    ratespercubicm1: 0.03, // Corrected to be a number
    blockConsumption2: [20, 50], // Corrected to use an array of numbers
    ratespercubicm2: 0.07, // Corrected to be a number
    blockConsumption3: [50, 999], // Corrected to use an array of numbers
    ratespercubicm3: 0.11, // Corrected to be a number
  },
  {
    id: 624691229,
    state: "closed",

    tariffCode: "TAR-002",
    tariffAbbreviation: "TB",
    decs: "这个活动真好玩",
    created_at: "1590481162000",
    update_at: "1590481162000",
    blockConsumption1: [0, 15], // Corrected to use an array of numbers
    ratespercubicm1: 0.05, // Corrected to be a number
    blockConsumption2: [15, 35], // Corrected to use an array of numbers
    ratespercubicm2: 0.08, // Corrected to be a number
    blockConsumption3: [35, 100], // Corrected to use an array of numbers
    ratespercubicm3: 0.11, // Corrected to be a number
    blockConsumption4: [100, 999], // Corrected to use an array of numbers
    ratespercubicm4: 0.25, // Corrected to be a number
  },
];
const EditableTable: React.FC<EditableTableProps> = ({ theme }) => {
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
      title: "Block Consumption 3",
      dataIndex: "blockConsumption3",
      valueType: "digitRange", // use 'digitRange' to enter two numbers
      width: "150",
      render: (text, record) => (
        <span>
          {record.blockConsumption3 &&
            `${record.blockConsumption3[0]} - ${record.blockConsumption3[1]}`}
        </span>
      ),
    },
    {
      title: "Rates 3",
      dataIndex: "ratespercubicm3", // Updated to "ratespercubicm1"
      valueType: "digit", // use 'digit' to enter one number
      width: "100",
    },
    {
      title: "Block Consumption 4",
      dataIndex: "blockConsumption4",
      valueType: "digitRange", // use 'digitRange' to enter two numbers
      width: "150",
      render: (text, record) => (
        <span>
          {record.blockConsumption4 &&
            `${record.blockConsumption4[0]} - ${record.blockConsumption4[1]}`}
        </span>
      ),
    },
    {
      title: "Block Consumption 5",
      dataIndex: "blockConsumption5",
      valueType: "digitRange", // use 'digitRange' to enter two numbers
      width: "150",
      render: (text, record) => (
        <span>
          {record.blockConsumption5 &&
            `${record.blockConsumption5[0]} - ${record.blockConsumption5[1]}`}
        </span>
      ),
    },
    {
      title: "Rates 5",
      dataIndex: "ratespercubicm5", // Updated to "ratespercubicm1"
      valueType: "digit", // use 'digit' to enter one number
      width: "100",
    },
    {
      title: "Block Consumption 6",
      dataIndex: "blockConsumption6",
      valueType: "digitRange", // use 'digitRange' to enter two numbers
      width: "150",
      render: (text, record) => (
        <span>
          {record.blockConsumption6 &&
            `${record.blockConsumption6[0]} - ${record.blockConsumption6[1]}`}
        </span>
      ),
    },
    {
      title: "Rates 6",
      dataIndex: "ratespercubicm6", // Updated to "ratespercubicm1"
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
    const chartData: {
      blockConsumption: number;
      rate: number;
      series: string;
    }[] = [];

    const colors = [
      theme.red,
      theme.orange,
      theme.yellow,
      theme.green,
      theme.blue,
      theme.cyan,
      theme.purple,
    ];

    if (data.blockConsumption1 && data.ratespercubicm1 !== undefined) {
      const blockConsumption = data.blockConsumption1;
      const rate = data.ratespercubicm1;

      for (let i = blockConsumption[0]; i <= blockConsumption[1]; i++) {
        chartData.push({
          blockConsumption: i,
          rate,
          series: "Rate 1",
        });
      }

      // Calculate the mid-point between two block consumption points
      const midPointIndex = Math.floor(
        (blockConsumption[0] + blockConsumption[1]) / 2
      );
      const midPoint = data.blockConsumption1[midPointIndex];
      const rateAtMidPoint = rate;

      // Define the vertical line annotation
      const verticalLine = {
        type: "line",
        data: [
          { x: midPoint, y: 0 },
          { x: midPoint, y: rateAtMidPoint + 0.02 }, // Adjust the y-value based on your data range
        ],
        style: {
          stroke: "gray",
          lineDash: [4, 2],
        },
      };

      const config = {
        data: chartData,
        xField: "blockConsumption",
        yField: "rate",
        seriesField: "series",
        height: 300,
        xAxis: {
          title: {
            text: "Block Consumptions (in m³)",
          },
          nice: true,
        },
        yAxis: {
          title: {
            text: "Rates (in RM)",
          },
          nice: true,
        },
        color: colors, // Use the colors array for multiple colors
        geometries: [verticalLine], // Add the vertical line annotation
      };

      return config;
    }

    return null;
  };
  useEffect(() => {
    setDataSource(defaultData);
  }, []);

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="可编辑表格"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== "hidden"
            ? {
                position: "bottom",
                record: { id: (Math.random() * 1000000).toFixed(0) },
              }
            : false
        }
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
          onSave: async (rowKey, data, row) => {
            await waitTime(2000);
            console.log(rowKey, data, row);
          },
          onCancel: async (rowKey, data) => {
            console.log(rowKey, data);
          },
          onDelete: async (rowKey, data) => {
            console.log(rowKey, data);
          },
        }}
        {...expandableConfig} // Spread the expandableConfig here
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
            <ProCard key={row.id} headerBordered collapsible defaultCollapsed>
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
