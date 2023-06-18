import { ProForm, ProFormText } from "@ant-design/pro-form";

const CustomerInfo = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    return Promise.resolve();
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#e6edf4",
      }}
    >
      <ProForm onFinish={onFinish}>
        <div
          style={{
            height: 20,
            height: 20,
            width: "100vh",
            padding: "1px 4px 1px 4px",
            alignContent: "center",
            justifyContent: "center",
            fontWeight: "bold",
            borderRadius: 16,
            background: "#6d8099",
            overflow: "hidden",
            color: "#f3f3f3",
          }}
        >
          <div
            style={{
              fontSize: 50,
              alignContent: "center",
              justifyContent: "center",
              margin: "-25px 0px 0px 10px",
            }}
          >
            010180-14-1010
          </div>
        </div>
        <p></p>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="id"
            label="ID"
            rules={[{ required: true, message: "Please enter ID" }]}
          />
          <ProFormText
            width="md"
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter Name" }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="branch" label="Branch" disabled />
          <ProFormText
            width="md"
            name="customerNo"
            label="Customer No"
            disabled
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="race"
            label="Race"
            rules={[{ required: true, message: "Please enter Race" }]}
          />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};

export default CustomerInfo;
