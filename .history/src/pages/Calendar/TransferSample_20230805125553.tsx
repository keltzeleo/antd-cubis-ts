import { Space, Switch, Table, Tag, Transfer } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TransferItem, TransferProps } from "antd/es/transfer";
import dayjs, { Dayjs } from "dayjs";
import difference from "lodash/difference";
import React, { useState } from "react";

// Interface for theme colors
interface Theme {
  [key: string]: string;
}

// Interface for the props of the TransferSample component
interface TransferSampleProps {
  theme: Theme;
  doubleClickedDate: Dayjs | null; // Add the prop for double-clicked date
}

// Interface for the data in the table
interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
  tag: string;
}

// Interface for the data to be transferred
interface DataType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
  tag: string;
}

// Interface for the props of the TableTransfer component
interface TableTransferProps extends TransferProps<DataType> {
  leftColumns: ColumnsType<DataType>;
  rightColumns: ColumnsType<DataType>;
}

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
      selectedKeys: listSelectedKeys, // Corrected variable name
      disabled: listDisabled, // Corrected variable name
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

const TransferSample: React.FC<TransferSampleProps> = ({
  theme,
  doubleClickedDate,
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const leftRowSelection = {
    getCheckboxProps: (item: DataType) => ({
      disabled: disabled || item.disabled, // Replaced listDisabled with disabled
    }),
    onSelectAll(selected: boolean, selectedRows: DataType[]) {
      const treeSelectedKeys = selectedRows
        .filter((item) => !item.disabled)
        .map(({ key }) => key);
      const diffKeys = selected
        ? difference(treeSelectedKeys, treeSelectedKeys) // No need to use listSelectedKeys
        : difference(originTargetKeys, treeSelectedKeys);
      setTargetKeys(diffKeys as string[]);
    },
    onSelect({ key }: TransferItem, selected: boolean) {
      const selectedKeys = [...targetKeys];
      const index = selectedKeys.indexOf(key as string);
      if (selected && index === -1) {
        selectedKeys.push(key as string);
      } else if (!selected && index !== -1) {
        selectedKeys.splice(index, 1);
      }
      setTargetKeys(selectedKeys);
    },
    selectedRowKeys: targetKeys,
  };

  const rightTableColumns: ColumnsType<DataType> = [
    {
      dataIndex: "title",
      title: "Name",
      render: (title) => {
        return <span style={{ color: theme["colorText"] }}>{title}</span>;
      },
    },
    {
      dataIndex: "selection", // Add selection column to the right table
      title: "Selection",
      render: (text, record) => (
        <span style={{ color: record.disabled ? "black" : "grey" }}>
          {record.disabled ? "Disabled" : "Active"}
        </span>
      ),
    },
  ];

  const leftTableColumns: ColumnsType<DataType> = [
    // Move the getCheckboxProps to the last column
    {
      dataIndex: "description",
      title: "Description",
      render: (title) => {
        return <span style={{ color: theme["colorText"] }}>{title}</span>;
      },
    },
    {
      dataIndex: "tag",
      title: "Tag",
      render: (tag) => <Tag>{tag}</Tag>,
    },
    {
      dataIndex: "title",
      title: "Name",
      render: (title) => {
        return <span style={{ color: theme["colorText"] }}>{title}</span>;
      },
    },
    {
      title: "Selection",
      dataIndex: "selection",
      render: (text, record) => (
        <span style={{ color: record.disabled ? "black" : "grey" }}>
          {record.disabled ? "Disabled" : "Active"}
        </span>
      ),
    },
  ];
  const onChange = (nextTargetKeys: string[]) => {
    const currentDate = dayjs();
    setSelectedDate(currentDate);
  };

  const triggerDisable = (checked: boolean) => {
    setDisabled(checked);
  };

  const triggerShowSearch = (checked: boolean) => {
    setShowSearch(checked);
  };

  const handleDoubleClick = (record: DataType) => {
    const currentDate = dayjs();
    setSelectedDate(currentDate);
  };

  return (
    <>
      <div style={{ height: 48 }}></div>
      <Space
        style={{
          margin: "32px 0px 4px 0px",
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
            flex: 1,
            display: "flex",
            height: 30,
            width: "30%",
            padding: "1px 24px 1px 8px",
            justifyContent: "flex-end",
            fontWeight: "bold",
            marginRight: 32,
            borderRadius: "8px 6px 24px 8px",
            background: theme.colorPrimaryBase,
            fontFamily: "Muli",
            overflow: "hidden",
            color: "#ffffff",
            margin: "8px 16px 0px 0px",
          }}
        >
          <div
            style={{
              fontSize: 36,
              margin: "-7px 0px 0px 10px",
              fontFamily: "play",
              paddingTop: -20,
            }}
          >
            Column Selection #1:{" "}
            {doubleClickedDate
              ? doubleClickedDate.format("DD-MM-YYYY")
              : "(No date selected)"}
            {" ⇀"}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            height: 30,
            width: "30",
            padding: "1px 8px 1px 24px",
            justifyContent: "flex-start",
            fontWeight: "bold",
            borderRadius: "22px 8px 6px 4px",
            background: theme.colorPrimaryBase,
            fontFamily: "Muli",
            overflow: "hidden",
            color: "#ffffff",
            margin: "8px 0px 0px 16px",
          }}
        >
          <div
            style={{
              fontSize: 36,
              margin: "-7px 0px 0px 10px",
              fontFamily: "play",
              paddingTop: -20,
            }}
          >
            ↽ (date) : Column Selection #2
          </div>
        </div>
      </div>{" "}
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
    </>
  );
};

export default TransferSample;
