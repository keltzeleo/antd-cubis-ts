import { ProCard, ProTable } from "@ant-design/pro-components";
import {
  ProFormDigit,
  ProFormDigitRange,
  ProFormRadio,
} from "@ant-design/pro-form";
import { ProColumns } from "@ant-design/pro-table";
import { Form } from "antd";
import React, { useState } from "react";

const waitTime = (time = 100): Promise<boolean> => {
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
  block?: [number, number] | null;
  rate?: number;
};

const defaultData: DataSourceType[] = [
  {
    id: "624748504",
    title: "活动名称一",
    readonly: "活动名称一",
    decs: "这个活动真好玩",
    state: "open",
    created_at: "1590486176000",
    update_at: "1590486176000",
    block: [1, 2],
    rate: 0.5,
  },
  {
    id: "624691229",
    title: "活动名称二",
    readonly: "活动名称二",
    decs: "这个活动真好玩",
    state: "closed",
    created_at: "1590481162000",
    update_at: "1590481162000",
    block: [5, 6],
    rate: 0.25,
  },
];

const EditableTable: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );

  const columns: ProColumns<DataSourceType>[] = [
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
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <ProFormDigitRange /> : <span />;
      },
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
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <ProFormDigit /> : <span />;
      },
    },
    {
      title: "活动时间",
      dataIndex: "created_at",
      valueType: "date",
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (_, record) => {
        if (editableKeys.includes(record.id)) {
          // Render editable form fields for editing mode
          return (
            <Form.Item
              name={[record.id, "block"]}
              initialValue={record.block}
              rules={[
                { required: true },
                () => ({
                  validator(_, value) {
                    if (!value || value[0] < value[1]) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "reminder: the start of the block must be less than the end!"
                      )
                    );
                  },
                }),
              ]}
            >
              <ProFormDigitRange
                fieldProps={{ precision: 0 }}
                disabled={!editableKeys.includes(record.id)}
              />
            </Form.Item>
          );
        } else {
          // Render read-only text for non-editing mode
          return (
            <span>
              {record.block ? `${record.block[0]} - ${record.block[1]}m³` : ""}
            </span>
          );
        }
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      valueType: "digit",
      key: "rate",
      render: (_, record) => {
        if (editableKeys.includes(record.id)) {
          // Render editable form fields for editing mode
          return (
            <Form.Item
              name={[record.id, "rate"]}
              initialValue={record.rate}
              rules={[
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: "Please input a valid rate.",
                  required: true,
                },
              ]}
            >
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!editableKeys.includes(record.id)}
              />
            </Form.Item>
          );
        } else {
          // Render read-only text for non-editing mode
          return (
            <span>
              RM {record.rate !== undefined ? record.rate.toFixed(2) : ""}
            </span>
          );
        }
      },
    },
    {
      title: "操作",
      valueType: "option",
      width: 200,
      render: (_, record, __, action) => [
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

  return (
    <>
      <ProTable<DataSourceType>
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
          total: defaultData.length,
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
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <Form.Item
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          initialValue={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};

export default EditableTable;
