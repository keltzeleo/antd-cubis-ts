import { Checkbox, Table, Tag } from "antd";
import { useState } from "react";

interface RowData {
  name: string[];
  age: number[];
  status: string[];
}

interface NestedRowData {
  data: RowData[];
}

const MainTable = () => {
  const [filterStatusNested, setFilterStatusNested] = useState<string[]>([]);
  const [filterStatusMaster, setFilterStatusMaster] = useState<string[]>([]);

  const data: RowData[] = [
    {
      name: ["a", "b", "c"],
      age: [22, 23, 24],
      status: ["aa", "bb", "cc", "dd"],
    },
    {
      name: ["a", "", "c"],
      age: [22, 24],
      status: ["aa", "dd"],
    },
    {
      name: ["a", "b", "c", "d", "e", "f"],
      age: [34, 33, 22, 66, 55, 77],
      status: ["aa", "aa", "bb", "bb", "cc", "dd"],
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string[]) => text.join(", "),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text: number[]) => text.join(", "),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string[], record: RowData) => (
        <>
          {text.map((status: string) => (
            <Tag
              key={status}
              color={filterStatusMaster.includes(status) ? "blue" : ""}
              onClick={() => toggleFilterStatusMaster(status)}
            >
              {status}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  const toggleFilterStatusNested = (status: string) => {
    const updatedFilter = filterStatusNested.includes(status)
      ? filterStatusNested.filter((s) => s !== status)
      : [...filterStatusNested, status];
    setFilterStatusNested(updatedFilter);
  };

  const toggleFilterStatusMaster = (status: string) => {
    const updatedFilter = filterStatusMaster.includes(status)
      ? filterStatusMaster.filter((s) => s !== status)
      : [...filterStatusMaster, status];
    setFilterStatusMaster(updatedFilter);
  };

  const filterData = (rowData: RowData[], filterStatus: string[]) => {
    return rowData.filter((row) =>
      row.status.some((status) => filterStatus.includes(status))
    );
  };

  const filteredDataNested = filterData(data, filterStatusNested);
  const filteredDataMaster = filterData(data, filterStatusMaster);

  return (
    <>
      <h2>Filter Status Nested</h2>
      {filteredDataNested.length > 0 && (
        <Table
          columns={columns}
          dataSource={filteredDataNested}
          pagination={false}
        />
      )}
      <div>
        {data.map((row, index) => (
          <div key={index}>
            {row.status.map((status) => (
              <label key={status} style={{ marginRight: 8 }}>
                <Checkbox
                  checked={filterStatusNested.includes(status)}
                  onChange={() => toggleFilterStatusNested(status)}
                >
                  {status}
                </Checkbox>
              </label>
            ))}
          </div>
        ))}
      </div>

      <h2>Filter Status Master</h2>
      {filteredDataMaster.length > 0 && (
        <Table
          columns={columns}
          dataSource={filteredDataMaster}
          pagination={false}
        />
      )}
      <div>
        {data.map((row, index) => (
          <div key={index}>
            {row.status.map((status) => (
              <Tag
                key={status}
                color={filterStatusMaster.includes(status) ? "blue" : ""}
                onClick={() => toggleFilterStatusMaster(status)}
                style={{ marginRight: 8 }}
              >
                {status}
              </Tag>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default MainTable;
