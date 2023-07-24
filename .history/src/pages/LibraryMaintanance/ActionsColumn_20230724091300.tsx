import React from "react";

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
  const handleEdit = () => {
    action?.startEditable?.(record.id);
  };

  const handleDelete = () => {
    setDataSource((prevDataSource) =>
      prevDataSource.filter((item) => item.id !== record.id)
    );
  };

  return (
    <span className="blurry-actions">
      <a key="editable" onClick={handleEdit}>
        &nbsp;&nbsp;编辑 &nbsp;&nbsp;
      </a>
      <a key="delete" onClick={handleDelete}>
        &nbsp;删除 &nbsp;&nbsp;&nbsp;
      </a>
    </span>
  );
};

export default ActionsColumn;
