import { RightCircleTwoTone } from "@ant-design/icons";
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

const TransferSample: React.FC<TransferSampleProps> = ({
  theme,
  doubleClickedDate,
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [oneWay, setOneWay] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Renamed to selectedDate
  // State variable to hold the date

  const onChange = (nextTargetKeys: string[]) => {
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

  const handleCheckboxChange = (key: string) => {
    // Toggle the checkbox state for the specific item with the given key
    const newTargetKeys = targetKeys.includes(key)
      ? targetKeys.filter((itemKey) => itemKey !== key)
      : [...targetKeys, key];

    setTargetKeys(newTargetKeys);
  };

  const leftTableColumns: ColumnsType<DataType> = [
    {
      dataIndex: "title",
      title: "Name",
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
      dataIndex: "description",
      title: "Description",
      render: (description) => {
        return <span style={{ color: theme["colorText"] }}>{description}</span>;
      },
    },
    {
      dataIndex: "selection",
      title: "",
      width: "36", // Set the width to 'auto'

      render: (text, record) => (
        <>
          {record.disabled || disabled ? (
            <span>
              <RightCircleTwoTone twoToneColor={theme["shades.2"]} />
            </span>
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onDoubleClick={() => handleCheckboxChange(record.key)}
            >
              <RightCircleTwoTone twoToneColor={theme["colorPrimary"]} />
            </span>
          )}
        </>
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
    {
      dataIndex: "description",
      title: "Description",
      render: (description) => {
        return <span style={{ color: theme["colorText"] }}>{description}</span>;
      },
    },
  ];

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
          unCheckedChildren="one way"
          checkedChildren="one way"
          checked={oneWay}
          onChange={setOneWay}
        />
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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            flex: 1, // Added flex property
            display: "flex",
            height: 30,
            width: "30%",
            padding: "1px 20px 1px 8px",
            justifyContent: "flex-end",
            fontWeight: "bold",
            marginRight: 32,
            borderRadius: "8px 6px 22px 8px",

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
              : "(No date selected)"}{" "}
            {/* Display the doubleClickedDate value or a message if no date is selected */}
          </div>
        </div>
        <div
          style={{
            flex: 1, // Added flex property
            display: "flex",
            height: 30,
            width: "30",
            padding: "1px 8px 1px 20px",
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
            (date) : Column Selection #2
          </div>
        </div>
      </div>
      \{" "}
      <TableTransfer
        dataSource={mockData}
        targetKeys={targetKeys}
        disabled={disabled}
        showSearch={showSearch}
        oneWay={oneWay}
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
