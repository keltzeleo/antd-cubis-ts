import { Line } from "@ant-design/charts";
import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from "@ant-design/pro-components";
import { Checkbox } from "antd";
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
  effectiveDate?: string;
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    state: "open",

    tariffCode: "TAR-001",
    tariffAbbreviation: "TA",
    decs: "这个活动真好玩",
    effectiveDate: "07-07-2023",
    blockConsumption1: [0, 20], // Corrected to use an array of numbers
    ratespercubicm1: 0.03, // Corrected to be a number
    blockConsumption2: [20, 50], // Corrected to use an array of numbers
    ratespercubicm2: 0.07, // Corrected to be a number
    blockConsumption3: [50, 999], // Corrected to use an array of numbers
    ratespercubicm3: 0.11,
    createdBy: "John Doe",
    createdDate: "07-06-2023",
    modifiedBy: "John Doe",
    modifiedDate: "07-07-2023", // Corrected to be a number
  },
  {
    id: 624691229,
    state: "closed",

    tariffCode: "TAR-002",
    tariffAbbreviation: "TB",
    decs: "这个活动真好玩",
    effectiveDate: "07-07-2023",
    blockConsumption1: [0, 15], // Corrected to use an array of numbers
    ratespercubicm1: 0.05, // Corrected to be a number
    blockConsumption2: [15, 35], // Corrected to use an array of numbers
    ratespercubicm2: 0.08, // Corrected to be a number
    blockConsumption3: [35, 100], // Corrected to use an array of numbers
    ratespercubicm3: 0.12, // Corrected to be a number
    blockConsumption4: [100, 999], // Corrected to use an array of numbers
    ratespercubicm4: 0.25,
    createdBy: "John Doe",
    createdDate: "01-07-2023",
    modifiedBy: "John Doe",
    modifiedDate: "07-07-2023", // Corrected to be a number
  },
];
const EditableTable: React.FC<EditableTableProps> = ({ theme }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);
  const [showBlockConsumptionsRates, setShowBlockConsumptionsRates] =
    useState(true);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );

  const handleToggleColumns = (checked: boolean, columnType: string) => {
    if (columnType === "additionalColumns") {
      setShowAdditionalColumns(checked);
    } else if (columnType === "blockConsumptionsRates") {
      setShowBlockConsumptionsRates(checked);
    }
  };

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      valueType: "indexBorder",
      width: "20",
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
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>{record.tariffCode}</span>
      ),
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      valueType: "text",
      readonly: true,
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>
          {record.tariffAbbreviation}
        </span>
      ),
    },
    {
      title: "Effective Date (from)",
      dataIndex: "effectiveDate",
      valueType: "date",
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>{record.effectiveDate}</span>
      ),
    },
    ...(showBlockConsumptionsRates
      ? [
          {
            title: "Block Consumption 1",
            dataIndex: "blockConsumption1",
            valueType: "digitRange" as CustomValueType, // Use the custom valueType here

            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.blockConsumption1 &&
                  `${record.blockConsumption1[0]}-${record.blockConsumption1[1]}m³`}
              </span>
            ),
          },
          {
            title: "Rate 1",
            dataIndex: "ratespercubicm1", // Updated to "ratespercubicm1"
            valueType: "digit", // use 'digit' to enter one number
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.modifiedDate}
              </span>
            ),
          },
          {
            title: "Block Consumption 2",
            dataIndex: "blockConsumption2",
            valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.blockConsumption2 &&
                  `${record.blockConsumption2[0]}-${record.blockConsumption2[1]}m³`}
              </span>
            ),
          },
          {
            title: "Rate 2",
            dataIndex: "ratespercubicm2", // Updated to "ratespercubicm1"
            valueType: "digit", // use 'digit' to enter one number
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.modifiedDate}
              </span>
            ),
          },
          {
            title: "Block Consumption 3",
            dataIndex: "blockConsumption3",
            valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.blockConsumption3 &&
                  `${record.blockConsumption3[0]}-${record.blockConsumption3[1]}m³`}
              </span>
            ),
          },
          {
            title: "Rate 3",
            dataIndex: "ratespercubicm3", // Updated to "ratespercubicm1"
            valueType: "digit", // use 'digit' to enter one number
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.ratespercubicm3}
              </span>
            ),
          },
          {
            title: "Block Consumption 4",
            dataIndex: "blockConsumption4",
            valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.blockConsumption4 &&
                  `${record.blockConsumption4[0]}-${record.blockConsumption4[1]}m³`}
              </span>
            ),
          },
          {
            title: "Rate 4",
            dataIndex: "ratespercubicm4", // Updated to "ratespercubicm1"
            valueType: "digit", // use 'digit' to enter one number
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.ratespercubicm4}
              </span>
            ),
          },
          {
            title: "Block Consumption 5",
            dataIndex: "blockConsumption5",
            valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.blockConsumption5 &&
                  `${record.blockConsumption5[0]}-${record.blockConsumption5[1]}m³`}
              </span>
            ),
          },
          {
            title: "Rate 5",
            dataIndex: "ratespercubicm5", // Updated to "ratespercubicm1"
            valueType: "digit", // use 'digit' to enter one number
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.ratespercubicm5}
              </span>
            ),
          },
          {
            title: "Block Consumption 6",
            dataIndex: "blockConsumption6",
            valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.blockConsumption6 &&
                  `${record.blockConsumption6[0]}-${record.blockConsumption6[1]}m³`}
              </span>
            ),
          },
          {
            title: "Rate 6",
            dataIndex: "ratespercubicm6", // Updated to "ratespercubicm1"
            valueType: "digit", // use 'digit' to enter one number
            width: "auto",
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.ratespercubicm6}
              </span>
            ),
          },
        ]
      : []),
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            width: "auto",
            key: "createdBy",
            readonly: true,
            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>{record.createdBy}</span>
            ),
          },
          {
            title: "Create Date",
            dataIndex: "createdDate",
            width: "auto",
            key: "createdDate",
            readonly: true,

            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.createdDate}
              </span>
            ),
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            width: "auto",
            key: "modifiedBy",
            readonly: true,

            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.modifiedBy}
              </span>
            ),
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            width: "auto",
            key: "modifiedDate",
            readonly: true,

            render: (text: string, record: DataSourceType) => (
              <span style={{ color: theme.colorText }}>
                {record.modifiedDate}
              </span>
            ),
          },
        ]
      : []),

    {
      title: (
        <div
          style={{
            fontWeight: "bold",
            height: "120%",
            width: "auto",
            overflow: "hidden",
            background: "rgba(92, 110, 113, 0.1)", // Semi-transparent overlay color for the blur effect
            zIndex: 1,
            borderRadius: "4px",
            padding: "16px 16px",
            right: 0,
            top: 0,
            left: 0,
            margin: "-12 -8 -12 -8", // Ensure the overlay is behind the content
            backdropFilter: "blur(14px)", // Use backdrop-filter for modern browsers that support it
          }}
        >
          &nbsp; Actions &nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </div>
      ),
      valueType: "option",
      fixed: "right",
      width: "auto",
      render: (text: any, record: DataSourceType, _, action) => (
        <>
          <a
            style={{
              fontWeight: "bold",
              height: "120%",
              width: "auto",
              overflow: "hidden",
              background: "rgba(92, 110, 113, 0.1)", // Semi-transparent overlay color for the blur effect
              zIndex: 1,
              borderRadius: "4px",
              padding: "16px 16px",
              right: 0,
              top: 0,
              left: 0,
              margin: "-12 -8 -12 -8", // Ensure the overlay is behind the content
              backdropFilter: "blur(14px)", // Use backdrop-filter for modern browsers that support it
            }}
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑 &nbsp;
          </a>

          <a
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  const convertDataForChart = (data: DataSourceType) => {
    const chartData: {
      blockConsumption: number;
      rate: number;
      series: string;
    }[] = [];

    const blockConsumptionRanges: Tuple[] = [
      data.blockConsumption1,
      data.blockConsumption2,
      data.blockConsumption3,
      data.blockConsumption4,
      data.blockConsumption5,
      data.blockConsumption6,
    ].filter((range) => range !== null && range !== undefined) as Tuple[];

    const rates: number[] = [
      data.ratespercubicm1,
      data.ratespercubicm2,
      data.ratespercubicm3,
      data.ratespercubicm4,
      data.ratespercubicm5,
      data.ratespercubicm6,
    ].filter((rate) => rate !== null && rate !== undefined) as number[];

    let currentBlockConsumption = 0;

    for (let i = 0; i < blockConsumptionRanges.length; i++) {
      const blockConsumption = blockConsumptionRanges[i];
      const rate = rates[i];

      if (i !== 0) {
        // To create continuity, push a data point with the previous end point's blockConsumption and the current rate
        chartData.push({
          blockConsumption: currentBlockConsumption,
          rate,
          series: `Rate ${i}`,
        });
      }

      for (let j = blockConsumption[0]; j <= blockConsumption[1]; j++) {
        chartData.push({
          blockConsumption: j,
          rate,
          series: `Rate ${i + 1}`,
        });
        currentBlockConsumption = j;
      }
    }

    return chartData;
  };

  const expandableConfig = {
    expandedRowRender: (record: DataSourceType) => {
      const chartData = convertDataForChart(record);

      const config = {
        data: chartData,
        xField: "blockConsumption",
        yField: "rate",
        seriesField: "series",
        height: 320,
        xAxis: {
          title: {
            text: "Block Consumptions (in m³)",
          },
          nice: true,
          // min: 0,
          // max: 80,
        },
        yAxis: {
          title: {
            text: "Rates (in RM)",
          },
          nice: true,
        },
        color: [
          theme.red,
          theme.orange,
          theme.yellow,
          theme.green,
          theme.blue,
          theme.cyan,
          theme.purple,
        ],
      };

      return (
        <ProCard>
          <Line {...config} />
        </ProCard>
      );
    },
    expandRowByClick: true,
    expandIconColumnIndex: -1,
  };

  useEffect(() => {
    setDataSource(defaultData);
  }, []);

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        scroll={{ x: "max-content" }}
        headerTitle={
          <span
            style={{
              fontFamily: theme.fontFamily,
            }}
          >
            Tariff Charges Maintenance
          </span>
        }
        toolbar={{
          actions: [
            <Checkbox
              key="toggleBlockConsumptionsRates"
              checked={showBlockConsumptionsRates}
              onChange={(e) =>
                handleToggleColumns(e.target.checked, "blockConsumptionsRates")
              }
            >
              Show Block Consumptions and Rates
            </Checkbox>,
            <Checkbox
              key="toggleAdditionalColumns"
              checked={showAdditionalColumns}
              onChange={(e) =>
                handleToggleColumns(e.target.checked, "additionalColumns")
              }
            >
              Show Additional Columns
            </Checkbox>,
          ],
        }}
        maxLength={5}
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
