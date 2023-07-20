import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormDigit,
  ProFormDigitRange,
  ProFormField,
  ProFormGroup,
  ProFormRadio,
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
  blocks?: {
    block?: [number, number] | null;
    rate?: number;
  }[];
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
      {
        block: [1, 2],
        rate: 0.5,
      },
      {
        block: [3, 4],
        rate: 0.75,
      },
    ],
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
      {
        block: [5, 6],
        rate: 0.25,
      },
      {
        block: [7, 8],
        rate: 0.9,
      },
    ],
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
      title: "Title",
      dataIndex: "title",
      width: "15%",
    },
    {
      title: "Readonly",
      dataIndex: "readonly",
      width: "15%",
    },
    {
      title: "State",
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
      title: "Decs",
      dataIndex: "decs",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      valueType: "date",
    },
    {
      title: "Update At",
      dataIndex: "update_at",
      valueType: "date",
    },
    {
      title: "Actions",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  const nestedColumns: ProColumns<{
    block?: [number, number] | null;
    rate?: number;
  }>[] = [
    {
      title: "Block",
      dataIndex: "block",
      valueType: "group",
      renderFormItem: (_, { isEditable }) => {
        return (
          <ProFormGroup>
            <ProFormDigitRange
              fieldProps={{ precision: 0 }}
              editable={isEditable}
            />
          </ProFormGroup>
        );
      },
      render: (_, record) => (
        <ProFormGroup>
          <ProFormDigitRange
            fieldProps={{ precision: 0 }}
            value={record.block}
            editable={false}
          />
        </ProFormGroup>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      valueType: "group",
      renderFormItem: (_, { isEditable }) => {
        return (
          <ProFormGroup>
            <ProFormDigit fieldProps={{ precision: 2 }} editable={isEditable} />
          </ProFormGroup>
        );
      },
      render: (_, record) => (
        <ProFormGroup>
          <ProFormDigit
            fieldProps={{ precision: 2 }}
            value={record.rate}
            editable={false}
          />
        </ProFormGroup>
      ),
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
        expandable={{
          expandedRowRender: (record) => (
            <EditableProTable<{
              block?: [number, number] | null;
              rate?: number;
            }>
              rowKey="block"
              headerTitle="Nested Table"
              columns={nestedColumns}
              value={record.blocks}
              onChange={(newBlocks) => {
                const newData = [...dataSource];
                const targetIndex = newData.findIndex(
                  (item) => item.id === record.id
                );
                if (targetIndex !== -1) {
                  newData[targetIndex].blocks = newBlocks;
                }
                setDataSource(newData);
              }}
              editable={{
                type: "multiple",
                editableKeys,
                onSave: async (rowKey, data, row) => {
                  console.log(rowKey, data, row);
                  await waitTime(2000);
                },
                onChange: setEditableRowKeys,
              }}
            />
          ),
        }}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
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
