// ... (Previous imports, interfaces, and component definitions remain the same)

const TransferSample: React.FC<TransferSampleProps> = ({
  theme,
  doubleClickedDate,
}) => {
  // ... (Previous useState and mock data definitions remain the same)

  // Customize rowSelection for leftColumnTable
  const leftRowSelection = {
    onSelectAll(selected: boolean, selectedRows: DataType[]) {
      const treeSelectedKeys = selectedRows
        .filter((item) => !item.disabled)
        .map(({ key }) => key);
      const diffKeys = selected
        ? difference(treeSelectedKeys, targetKeys)
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
    getCheckboxProps: (item: DataType) => ({
      disabled: item.disabled,
    }),
    // Move getCheckboxProps to the last column
    renderCell: (
      checked: boolean,
      record: DataType,
      index: number,
      originNode: React.ReactNode
    ) => {
      const checkboxNode = (
        <span style={{ color: record.disabled ? "black" : "grey" }}>
          {record.disabled ? "Disabled" : "Active"}
        </span>
      );
      const clonedNode = React.cloneElement(originNode as React.ReactElement, {
        children: (
          <>
            {index === 0 && checkboxNode}
            {index === 0 ? originNode : null}
          </>
        ),
      });
      return clonedNode;
    },
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
      dataIndex: "selection",
      title: "Selection",
      render: (text, record) => (
        <span style={{ color: record.disabled ? "black" : "grey" }}>
          {record.disabled ? "Disabled" : "Active"}
        </span>
      ),
    },
  ];

  const leftTableColumns: ColumnsType<DataType> = [
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
      render: (text, record, index) => (
        <span style={{ color: record.disabled ? "black" : "grey" }}>
          {record.disabled ? "Disabled" : "Active"}
        </span>
      ),
      // Add render method to customize the checkbox placement
      ...leftRowSelection,
    },
  ];

  // ... (Remaining code remains the same as before)
};

export default TransferSample;
