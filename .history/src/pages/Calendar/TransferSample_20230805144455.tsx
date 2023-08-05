import { Checkbox, Space, Switch, Table, Tag, Transfer } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
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

// TableRowSelection type for row selection
interface TableRowSelection<T> {
  getCheckboxProps: (record: T) => { disabled: boolean };
  onSelect: (record: T, selected: boolean) => void;
  onSelectAll: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  selectedRowKeys?: string[];
  selections?: object[] | boolean;
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

      // Add the checkbox in the column header for selection
      const headerCheckbox = (
        <Checkbox
          checked={filteredItems.every((item) =>
            listSelectedKeys.includes(item.key)
          )}
          onChange={(e) => {
            const keys = filteredItems.map((item) => item.key);
            onItemSelectAll(keys, e.target.checked);
          }}
          indeterminate={
            filteredItems.some((item) => listSelectedKeys.includes(item.key)) &&
            !filteredItems.every((item) => listSelectedKeys.includes(item.key))
          }
          disabled={listDisabled}
        />
      );

      const rowSelection: TableRowSelection<DataType> = {
        getCheckboxProps: (item: DataType) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(
          selected: boolean,
          selectedRows: DataType[],
          changeRows: DataType[]
        ) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected, changeRows);
        },
        onSelect({ key }: TransferItem, selected: boolean) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table<DataType>
          rowSelection={rowSelection}
          columns={columns.map((col) => {
            if (col.dataIndex === "selection") {
              // Render the checkbox in the column header for selection
              return {
                ...col,
                title: () => headerCheckbox,
                // Use custom render to display the checkbox for each row
                render: (text, record) => (
                  <Checkbox
                    checked={listSelectedKeys.includes(record.key)}
                    disabled={listDisabled || record.disabled}
                    onChange={(e) => {
                      onItemSelect(record.key as string, e.target.checked);
                    }}
                  />
                ),
              };
            } else {
              return col as ColumnType<DataType>;
            }
          })}
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
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Renamed to selectedDate
  // State variable to hold the date

  const leftTableColumns: ColumnsType<DataType> = [
    {
      dataIndex: "tag",
      title: "Tag",
      render: (tag) => <Tag>{tag}</Tag>,
    },
    {
      dataIndex: "description",
      title: "Description",
      render: (title) => {
        return <span style={{ color: theme["colorText"] }}>{title}</span>;
      },
    },
    {
      dataIndex: "title",
      title: "Name",
      render: (title) => {
        return <span style={{ color: theme["colorText"] }}>{title}</span>;
      },
    },
    // Selection column moved to the last position
    {
      title: "Selection",
      dataIndex: "selection",
      render: (text, record) => (
        <span style={{ color: record.disabled ? "black" : "grey" }}>
          {record.disabled ? "Disabled" : "Active"}
        </span>
      ),
    },
    {
      title: () => headerCheckbox, // Clone the checkbox in the column header for the title area
      dataIndex: "clone1", // A dummy dataIndex to avoid conflicts
      render: (text, record) => (
        <Checkbox
          checked={targetKeys.includes(record.key)}
          onChange={(e) => {
            const keys = [...targetKeys];
            if (e.target.checked) {
              keys.push(record.key as string);
            } else {
              const index = keys.indexOf(record.key as string);
              if (index !== -1) {
                keys.splice(index, 1);
              }
            }
            setTargetKeys(keys);
          }}
        />
      ),
    },
  ];

  const rightTableColumns: ColumnsType<DataType> = [
    {
      dataIndex: "title",
      title: "Name",
      render: (title) => {
        return <span style={{ color: theme["colorText"] }}>{title}</span>;
      },
    },
    // Selection column moved to the last position
    {
      title: "Selection",
      dataIndex: "selection",
      render: (text, record) => (
        <span style={{ color: record.disabled ? "black" : "grey" }}>
          {record.disabled ? "Disabled" : "Active"}
        </span>
      ),
    },
    {
      title: () => headerCheckbox, // Clone the checkbox in the column header for the title area
      dataIndex: "clone2", // A dummy dataIndex to avoid conflicts
      render: (text, record) => (
        <Checkbox
          checked={targetKeys.includes(record.key)}
          onChange={(e) => {
            const keys = [...targetKeys];
            if (e.target.checked) {
              keys.push(record.key as string);
            } else {
              const index = keys.indexOf(record.key as string);
              if (index !== -1) {
                keys.splice(index, 1);
              }
            }
            setTargetKeys(keys);
          }}
        />
      ),
    },
  ];

  const onChange = (
    nextTargetKeys: string[],
    direction: string,
    moveKeys: TransferItem[]
  ) => {
    // Function to handle the double-click event and update the date state
    const currentDate = dayjs(); // Get the current date as a Dayjs object
    setSelectedDate(currentDate);
  };

  const triggerDisable = (checked: boolean) => {
    setDisabled(checked);
  };

  const triggerShowSearch = (checked: boolean) => {
    setShowSearch(checked);
  };

  const handleDoubleClick = (record: DataType) => {
    // Function to handle the double-click event and update the date state
    const currentDate = dayjs(); // Get the current date as a Dayjs object
    setSelectedDate(currentDate);
  };

  return (
    <>
      {" "}
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
            flex: 1, // Added flex property
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

            margin: "8px 16px 0px 0px", // Adjusted margin to create space between the two sections
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
            {/* Display the doubleClickedDate value or a message if no date is selected */}
          </div>
        </div>
        <div
          style={{
            flex: 1, // Added flex property
            display: "flex",
            height: 30,
            width: "30%",
            padding: "1px 8px 1px 24px",
            justifyContent: "flex-start",
            fontWeight: "bold",
            borderRadius: "22px 8px 6px 4px",
            background: theme.colorPrimaryBase,
            fontFamily: "Muli",
            overflow: "hidden",
            color: "#ffffff",
            margin: "8px 0px 0px 16px", // Adjusted margin to create space between the two sections
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
    </>
  );
};

export default TransferSample;
