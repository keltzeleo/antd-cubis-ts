import { Table, Transfer } from "antd";
import { ColumnType } from "antd/es/table";
import { TransferItem } from "antd/es/transfer";
import React, { useState } from "react";

type DataType = {
  key: string;
  title: string;
  tag: string;
  disabled?: boolean;
};

interface TableTransferProps {
  leftColumns: ColumnType<DataType>[];
  rightColumns: ColumnType<DataType>[];
  dataSource: DataType[];
  targetKeys: string[];
  setTargetKeys: (keys: string[]) => void;
  disabled?: boolean;
  showSearch?: boolean;
  onChange?: (
    nextTargetKeys: string[],
    direction: string,
    moveKeys: string[]
  ) => void;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
}

const TableTransfer: React.FC<TableTransferProps> = ({
  leftColumns,
  rightColumns,
  targetKeys,
  setTargetKeys,
  ...restProps
}) => (
  <Transfer<DataType>
    {...restProps}
    footer={(props) => <>{/* Custom footer can be added here */}</>}
  >
    {(props) => {
      const {
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys,
      } = props;

      const handleSelectChange = (
        sourceSelectedKeys: string[],
        targetSelectedKeys: string[]
      ) => {
        const combinedSelectedKeys = [
          ...sourceSelectedKeys,
          ...targetSelectedKeys,
        ];
        setTargetKeys(combinedSelectedKeys);
      };

      const handleHeaderCheckboxChange = (
        direction: string,
        checked: boolean
      ) => {
        if (direction === "right") {
          const sourceSelectedKeys = selectedKeys[direction];
          const targetKeysForCheckedItems = filteredItems
            .filter((item) => !item.disabled)
            .map((item) => item.key);
          const combinedSelectedKeys = checked
            ? [...sourceSelectedKeys, ...targetKeysForCheckedItems]
            : sourceSelectedKeys.filter(
                (key) => !targetKeysForCheckedItems.includes(key)
              );
          setTargetKeys(combinedSelectedKeys);
        } else {
          onItemSelectAll(direction, checked);
        }
      };

      return (
        <Table<DataType>
          rowSelection={{
            selectedRowKeys: selectedKeys[direction],
            onChange: (sourceSelectedKeys, targetSelectedKeys) =>
              handleSelectChange(
                sourceSelectedKeys as string[],
                targetSelectedKeys as string[]
              ),
          }}
          columns={direction === "left" ? leftColumns : rightColumns}
          dataSource={filteredItems}
          pagination={false}
          rowKey={(record) => record.key}
          onHeaderCell={(column) => ({
            width: column.width,
            onResize: handleResize,
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

  const headerCheckbox = (
    <Checkbox
      disabled={disabled}
      checked={
        filteredItems.length > 0 &&
        filteredItems.every((item) => targetKeys.includes(item.key))
      }
      onChange={() => handleHeaderCheckboxChange()}
    />
  );

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
    // Move the selection column to the last position
    {
      dataIndex: "selection",
      title: () => headerCheckbox,
      render: (text, record) => (
        <Checkbox
          disabled={record.disabled || disabled}
          checked={targetKeys.includes(record.key)}
          onChange={() => handleHeaderCheckboxChange(record.key)} // Corrected function name
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
        setTargetKeys={setTargetKeys}
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
