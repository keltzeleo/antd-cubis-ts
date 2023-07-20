import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormDigitRange,
  ProFormRadio,
  ProFormTable,
} from "@ant-design/pro-components";
import React, { useState } from "react";

const waitTime = (time: number = 100): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
  blocks?: Array<[number, number] | null>;
  rates?: number[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: "活动名称一",
    readonly: "活动名称一",
    decs: "这个活动真好玩",
    state: "open",
    created_at: "1590486176000",
    update_at: "1590486176000",
    blocks: [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    rates: [0.5, 0.75, 0.25],
  },
  {
    id: 624691229,
    title: "活动名称二",
    readonly: "活动名称二",
    decs: "这个活动真好玩",
    state: "closed",
    created_at: "1590481162000",
    update_at: "1590481162000",
    blocks: [
      [7, 8],
      [9, 10],
      [11, 12],
    ],
    rates: [0.9, 0.6, 0.8],
  },
];

const EditableTable: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );

  const columns: ProColumns<DataSourceType>[] = [
    // Existing columns
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
      width: "15%",
    },
    {
      title: "活动名称二",
      dataIndex: "readonly",
      tooltip: "只读，使用form.getFieldValue可以获取到值",
      readonly: true,
      width: "15%",
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
      title: "活动时间",
      dataIndex: "created_at",
      valueType: "date",
    },
    {
      title: "操作",
      valueType: "option",
      width: 200,
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
    // Additional columns
    {
      title: "Blocks and Rates",
      dataIndex: "blocks",
      renderFormItem: (_, { isEditable }) => {
        if (isEditable) {
          return null;
        }
        return (
          <ProFormTable
            columns={[
              {
                title: "Block",
                dataIndex: "block",
                valueType: "digitRange",
                renderFormItem: () => (
                  <ProFormDigitRange fieldProps={{ precision: 0 }} />
                ),
              },
              {
                title: "Rate",
                dataIndex: "rate",
                valueType: "digit",
              },
            ]}
            editable={{
              type: "multiple",
            }}
          />
        );
      },
    },
  ];

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
                position: position as "top",
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: "添加到顶部",
                value: "top",
              },
              {
                label: "添加到底部",
                value: "bottom",
              },
              {
                label: "隐藏",
                value: "hidden",
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <ProFormTable
              columns={[
                {
                  title: "Block",
                  dataIndex: "block",
                  valueType: "digitRange",
                  renderFormItem: () => (
                    <ProFormDigitRange fieldProps={{ precision: 0 }} />
                  ),
                },
                {
                  title: "Rate",
                  dataIndex: "rate",
                  valueType: "digit",
                },
              ]}
              dataSource={record.blocks?.map((block, index) => ({
                block,
                rate: record.rates?.[index],
              }))}
              editable={false}
              showHeader={false}
              pagination={false}
            />
          ),
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        {/* Display the JSON representation of the data */}
      </ProCard>
    </>
  );
};

export default EditableTable;
