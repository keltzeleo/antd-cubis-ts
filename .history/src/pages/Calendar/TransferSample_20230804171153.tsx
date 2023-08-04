import { Space, Switch, Table, Tag, Transfer } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TransferItem, TransferProps } from "antd/es/transfer";
import difference from "lodash/difference";
import React, { useState } from "react";

interface Theme {
  [key: string]: string;
}

interface TransferSampleProps {
  theme: Theme;
}
interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
  tag: string;
}

interface DataType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
  tag: string;
}

interface TableTransferProps extends TransferProps<DataType> {
  leftColumns: ColumnsType<DataType>;
  rightColumns: ColumnsType<DataType>;
}

// Customize Table Transfer
const TableTransfer = ({
  leftColumns,
  rightColumns,
  ...restProps
}: TableTransferProps) => (
  <Transfer<DataType>
    {...restProps}
    footer={(props) => <>{/* Custom footer can be added here */}</>}
  >
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item: DataType) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected: boolean, selectedRows: DataType[]) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }: TransferItem, selected: boolean) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table<DataType>
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : undefined }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(
                key as string,
                !listSelectedKeys.includes(key as string)
              );
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockTags = ["cat", "dog", "bird"];

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  disabled: i % 4 === 0,
  tag: mockTags[i % 3],
}));

const originTargetKeys = mockData
  .filter((item) => Number(item.key) % 3 > 1)
  .map((item) => item.key);

const leftTableColumns: ColumnsType<DataType> = [
  {
    dataIndex: "title",
    title: "Name",
  },
  {
    dataIndex: "tag",
    title: "Tag",
    render: (tag) => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: "description",
    title: "Description",
  },
];

const rightTableColumns: ColumnsType<DataType> = [
  {
    dataIndex: "title",
    title: "Name",
  },
];

const TransferSample: React.FC<TransferSampleProps> = ({ theme }) => {
  const [targetKeys, setTargetKeys] = useState<string[]>(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const triggerDisable = (checked: boolean) => {
    setDisabled(checked);
  };

  const triggerShowSearch = (checked: boolean) => {
    setShowSearch(checked);
  };

  return (
    <>
      {" "}
      <div style={{ height: 36 }}></div>
      <Space
        style={{
          margin: "32px 0px 16px 0px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={triggerDisable}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={triggerShowSearch}
        />
      </Space>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1, // Added flex property
            display: "flex",
            height: 30,
            width: "30%",
            padding: "1px 4px 1px 16px",
            justifyContent: "flex-start",
            fontWeight: "bold",
            marginRight: 32,
            borderRadius: "8px 4px 4px 16px",

            background: theme.colorPrimaryBase,
            fontFamily: "Muli",
            overflow: "hidden",
            color: "#ffffff",

            margin: "8px 4px 0px 0px", // Adjusted margin to create space between the two sections
          }}
        >
          <div
            style={{
              fontSize: 40,
              margin: "-20px 0px 0px 10px",
            }}
          >
            Previous : (date)
          </div>
        </div>
        <div
          style={{
            flex: 1, // Added flex property
            display: "flex",
            height: 30,
            width: "30",
            padding: "1px 16px 1px 4px",
            justifyContent: "flex-end",
            fontWeight: "bold",
            borderRadius: "4px 16px 16px 4px",
            background: theme.colorPrimaryBase,
            fontFamily: "Muli",
            overflow: "hidden",
            color: "#ffffff",
            margin: "8px 0px 0px 4px", // Adjusted margin to create space between the two sections
          }}
        >
          <div
            style={{
              fontSize: 40,
              margin: "-20px 0px 0px 10px",
            }}
          >
            Transfer : (date)
          </div>
        </div>
      </div>
      \{" "}
      <TableTransfer
        dataSource={mockData}
        targetKeys={targetKeys}
        disabled={disabled}
        showSearch={showSearch}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 ||
          item.tag.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
      <div style={{ marginBottom: 16, fontWeight: "bold" }}>Right Table</div>
    </>
  );
};

export default TransferSample;
