import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import {
  Alert,
  Button,
  Col,
  Collapse,
  Dropdown,
  Input,
  Row,
  Table,
  Tabs,
} from "antd";
import React, { useState } from "react";
import { StationDropdownMenu } from "./DropdownStationSelection";
import { mockCustomerData, mockStations } from "./mockDataInquireAccountPage";

interface Theme {
  [key: string]: string;
}

interface InquireAccountPageProps {
  theme: Theme;
}

const { TabPane } = Tabs;
const { Panel } = Collapse;

const InquireAccountPage: React.FC<InquireAccountPageProps> = ({ theme }) => {
  const [accountNumber, setAccountNumber] = useState("");


  const columns = [
    {
      title: (
        <div
          style={{
            background: theme["colorPrimary"] // Background color
            border: "1px solid #91d5ff", // Border style
            padding: "8px", // Padding
            display: "inline-flex", // Align items horizontally
            alignItems: "center", // Center items vertically
          }}
        >
          <UserOutlined style={{ marginRight: "8px" }} /> Account Information
        </div>
      ),
      dataIndex: "name",
      key: "name",
    },
    // Add more columns
  ];

  return (
    <ProLayout navTheme="dark">
      <PageContainer>
        {/* Account Selection */}
        <Row gutter={[16, 16]}>
          <Col span={2}>
            <Dropdown overlay={<StationDropdownMenu stations={mockStations} />}>
              <Button>Select Station</Button>
            </Dropdown>
          </Col>
          <Col span={8}>
            <Input
              type="text"
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Col>
          <Col span={8}>
            <Button type="primary">View Account</Button>
          </Col>
        </Row>

        {/* Alert Message */}
        <Row style={{ marginTop: "12px" }}>
          <Col span={24}>
            {accountNumber.length === 0 && (
              <Alert
                message="Account Number Required"
                description="Please enter a valid account number to proceed."
                type="warning"
                showIcon
                icon={<ExclamationCircleOutlined />}
              />
            )}
          </Col>
        </Row>

        {/* Customer Information (Left) and Function Tabs (Right) */}
        <Row gutter={16}>
          <Col span={6}>
            {/* Customer Information */}
            <Table dataSource={mockCustomerData} columns={columns} />
          </Col>
          <Col span={18}>
            {/* Function Tabs */}
            <Tabs>
              <TabPane tab="Statement of Account" key="1">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Events" key="2">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Bills" key="3">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Payment" key="4">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Deposit" key="5">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Instalment" key="6">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Meter" key="7">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Sewerage" key="8">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Stale Cheque" key="9">
                {/* Your Content Here */}
              </TabPane>
              <TabPane tab="Cancel Bill History" key="10">
                {/* Your Content Here */}
              </TabPane>
            </Tabs>
          </Col>
        </Row>

        {/* Expandable Sections */}
        <Collapse>
          <Panel header="Event Details" key="1">
            {/* Your Content Here */}
          </Panel>
          {/* Add more panels */}
        </Collapse>
      </PageContainer>
    </ProLayout>
  );
};

export default InquireAccountPage;
