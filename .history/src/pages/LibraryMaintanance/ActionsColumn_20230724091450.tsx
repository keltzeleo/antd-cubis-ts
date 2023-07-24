import { Popconfirm } from "antd";
import React from "react";
import { DataSourceType } from "./EditableTable"; // Use a regular import for DataSourceType

interface ActionsColumnProps {
  record: DataSourceType;
  action: any; // Replace any with the appropriate type for the action object
  setDataSource: React.Dispatch<
    React.SetStateAction<readonly DataSourceType[]>
  >;
}

const ActionsColumn: React.FC<ActionsColumnProps> = ({
  record,
  action,
  setDataSource,
}) => {
  const handleDelete = () => {
    setDataSource((prevData) =>
      prevData.filter((item) => item.id !== record.id)
    );
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure to delete this record?"
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
      >
        <a>Delete</a>
      </Popconfirm>
    </div>
  );
};

export default ActionsColumn;
