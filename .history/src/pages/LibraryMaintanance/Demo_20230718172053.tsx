import {
  EditableProTable,
  ProCard,
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormText,
} from "@ant-design/pro-components";
import { useState } from "react";

const Demo = () => {
  const [dataSource, setDataSource] = useState([
    {
      name: "1111",
      users: [
        {
          name: "333",
          nickName: "333",
        },
      ],
    },
  ]);

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      formItemProps: {
        rules: [{ required: true, message: "姓名不能为空" }],
      },
    },
    {
      title: "用户信息",
      dataIndex: "users",
      valueType: "text",
      renderFormItem: (_, { record }, form) => {
        return (
          <ProCard
            bordered
            extra={<a onClick={() => form?.remove(record.name)}>删除</a>}
            title={record?.name}
            style={{
              marginBlockEnd: 8,
            }}
          >
            <ProFormList
              name={["users", record.name]}
              initialValue={record.users}
            >
              <ProFormGroup>
                <ProFormText name="name" label="姓名" />
                <ProFormText name="nickName" label="昵称" />
              </ProFormGroup>
            </ProFormList>
          </ProCard>
        );
      },
    },
  ];

  const handleFinish = async (values) => {
    console.log(values);
  };

  return (
    <ProForm
      onFinish={handleFinish}
      initialValues={{
        users: dataSource,
      }}
    >
      <ProFormText name="name" label="姓名" />
      <ProFormList
        name="users"
        label="用户信息"
        itemRender={({ listDom, action }) => (
          <ProCard
            bordered
            extra={action}
            style={{
              marginBlockEnd: 8,
            }}
          >
            {listDom}
          </ProCard>
        )}
      >
        <EditableProTable
          rowKey="name"
          toolBarRender={() => [
            <EditableProTable.AddButton
              key="add"
              onClick={() => {
                setDataSource((prev) => [...prev, { name: "", users: [] }]);
              }}
            />,
          ]}
          recordCreatorProps={{
            newRecordType: "dataSource",
            position: "bottom",
            record: () => ({
              name: "",
              users: [],
            }),
          }}
          columns={columns}
          value={dataSource}
          onChange={setDataSource}
        />
      </ProFormList>
      <ProForm.SubmitButton />
    </ProForm>
  );
};

export default Demo;
