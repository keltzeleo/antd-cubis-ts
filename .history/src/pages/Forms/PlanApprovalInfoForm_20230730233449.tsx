import { ProCard } from "@ant-design/pro-components";
import {
  ProForm,
  ProFormDatePicker,
  ProFormItem,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Button, Col, Form, Modal, Row } from "antd";
import React from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou";
import "./forms.css";

const PlanApprovalInfoForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <h2>Plan Approval Info Form</h2>

      <div
        className="drag-drop-container"
        style={{
          height: "100vh",
          backgroundColor: "theme.colorBgBase",
        }}
      >
        <div className="top-section-site-visit">
          <div
          // style={{
          //   color: "#f3f6f9",
          //   borderRadius: 16,
          //   padding: "0 0 0 16",
          //   top: 0,
          //   justifyContent: "center",
          //   backgroundColor: "#00a991",
          //   fontSize: 12,
          // }}
          >
            {/* <h2>Site Visit Approval Form</h2> */}
          </div>
        </div>
        {/* <div className="top-section" style={{ width: "100vh" }}></div> */}
        <div className="content-container" style={{ display: "flex" }}>
          <div
            className="left-section"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              className="upload-area"
              style={{
                width: "250px",
                display: "inline-block",
                flexDirection: "column",
                height: "450px",
              }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <Dragger
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
                listType="picture"
                showUploadList={{ showRemoveIcon: true }}
                accept=".pdf,.png, .jpg"
                style={{ marginRight: 8 }}
                multiple
              >
                <div
                  style={{
                    display: "block",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {uploadButton}
                </div>
              </Dragger>
            </div>
            {isErrorMessageVisible && (
              <IWillFollowYou errorMessage={errorMessage} />
            )}
          </div>
          <div
            className="right-section"
            style={{
              // boxSizing: "border-box",
              // display: "flex",
              marginBottom: 0,
              padding: 16,
              flexDirection: "row",
              justifyContent: "flex-start",
              // height: "100%",
              width: "100%",
              // overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <ProCard
                title="Site Visit Entry Information"
                bordered
                headerBordered
                collapsible
                extra={
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Submit
                  </Button>
                }
              >
                <ProForm
                  style={{ marginBottom: 16 }}
                  submitter={false}
                  layout="vertical"
                  onFinish={(values) => Promise.resolve()} // Return a resolved promise with void
                  initialValues={{
                    AprrovedBy: "",
                    ApprovalDate: undefined,
                    Status: "",
                    Reason: "",
                    Remark: "",
                  }}
                >
                  <ProForm.Group>
                    <Row gutter={24}>
                      <Col span={12}>
                        <ProFormSelect
                          name="Status"
                          label="Visit Status"
                          width="md"
                          options={[]}
                        />
                      </Col>
                      <Col span={12}>
                        <ProFormSelect
                          name="Reason"
                          label="Non-Compliance Reason"
                          width="md"
                          options={[]}
                        />
                      </Col>
                    </Row>
                  </ProForm.Group>
                  <div style={{ height: 32 }} />
                  <ProForm.Group>
                    <Row gutter={24}>
                      <Col span={12}>
                        <ProFormSelect
                          name="ApprovedBy"
                          label="Site Visit Approval By"
                          options={[]}
                        />
                        <div style={{ height: 32 }} />
                        <ProFormDatePicker
                          name="ApprovalDate"
                          label="Approval Date"
                        />
                      </Col>
                    </Row>
                  </ProForm.Group>
                  <div style={{ height: 32 }} />
                  <ProForm.Group>
                    <Row gutter={24}>
                      <Col span={24}>
                        <ProFormItem
                          label="Remark"
                          labelCol={{ span: 7 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <ProFormTextArea name="Remark" width="xl" label="_" />
                        </ProFormItem>
                      </Col>
                    </Row>
                  </ProForm.Group>
                  <div style={{ height: 32 }} />
                </ProForm>
              </ProCard>
            </div>
            &nbsp;
          </div>
        </div>
      </div>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        {previewImage && (
          <>
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
            <div
              style={{
                display: "flex",
                fontSize: 12,
                justifyContent: "space-between",
              }}
            >
              <p>File Size: {formatBytes(fileInfo.size || 0)}</p>

              <p>Upload Date: {fileInfo.uploadDate?.toLocaleString()}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" onClick={() => window.print()}>
                Print
              </Button>
            </div>
          </>
        )}
      </Modal>
    </Form>
  );
};

export default PlanApprovalInfoForm;
