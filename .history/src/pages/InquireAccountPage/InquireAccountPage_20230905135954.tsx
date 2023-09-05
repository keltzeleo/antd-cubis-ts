// InquireAccountPage.tsx
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
      title: "Name",
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
          <Col span={8}>
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
        {accountNumber.length === 0 && (
          <Alert
            message="Account Number Required"
            description="Please enter a valid account number to proceed."
            type="warning"
            showIcon
            icon={<ExclamationCircleOutlined />}
          />
        )}

        {/* Customer Information */}
        <Table dataSource={mockCustomerData} columns={columns} />

        {/* Function Tabs */}
        <Tabs>
          <TabPane tab="Statement of Account" key="1">
            {/* Your Content Here */}
          </TabPane>
          <TabPane tab="Events" key="2">
            {/* Your Content Here */}
          </TabPane>
          {/* Add more tabs */}
        </Tabs>

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
