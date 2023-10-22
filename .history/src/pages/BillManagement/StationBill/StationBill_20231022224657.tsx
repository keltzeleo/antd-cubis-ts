import {
  ExclamationCircleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import EditableProTable from '@ant-design/pro-table';

import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import React, { useState } from 'react';
import RealType from '../../../customComponents/RealTimeTextDisplay/RealType';

const { Option } = Select;
const { TextArea } = Input;

interface Theme {
  [key: string]: string;
}

interface StationBillProps {
  theme: Theme;
  //   onClearSelectedWorkOrder: () => void;

  //   onSelectedWorkOrderChange: (value: string) => void; // Add this line
}

const StationBill: React.FC<StationBillProps> = ({
  theme,
  //   onSelectedWorkOrderChange,
}) => {
  const [workOrderType, setWorkOrderType] = useState('');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState('');
  const [workOrderDescription, setWorkOrderDescription] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [form] = Form.useForm();
  const [sendViaEmailSMS, setSendViaEmailSMS] = useState(false);
  const [printForm, setPrintForm] = useState(false);
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState('');

  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log('Form values:', values);
    // Add logic to apply the filter and fetch data here
  };

  const handleEmailCheckboxChange = (checked: boolean) => {
    setSendViaEmailSMS(checked);
  };

  const handlePrintCheckboxChange = (checked: boolean) => {
    setPrintForm(checked);
  };

  const handleClearWorkOrderInfo = () => {
    form.setFieldsValue({
      scheduleStartDate: undefined,
      scheduleEndDate: undefined,
      scheduleStartTime: undefined,
      workOrderRemark: undefined,
      departmentInCharge: undefined,
      meterRemark: undefined,
      assignTo: undefined,
    });
  };

  const handleReset = () => {
    // Reset the form and clear the filter
    form.resetFields();
  };

  // Define columns for EditableProTable
  const columns = [
    {
      title: 'Meter No',
      dataIndex: 'meterNo',
      key: 'meterNo',
      render: (text: string) => (
        <strong style={{ color: theme['colorTextBase'] }}>{text}</strong>
      ),
    },
    {
      title: 'Meter Status',
      dataIndex: 'meterStatus',
      key: 'meterStatus',
      render: (text: string) => (
        <strong style={{ color: theme['colorTextBase'] }}>{text}</strong>
      ),
    },
    // Add more columns as needed
  ];

  // Define mock data for EditableProTable
  const dataSource = [
    {
      key: '1',
      meterNo: '12345',
      meterStatus: 'Active',
      // Add more data fields as needed
    },
    // Add more rows as needed
  ];

  return (
    <div style={{ marginLeft: 32 }}>
      <h1
        style={{
          marginLeft: -32,
          paddingLeft: 24,
          borderRadius: 32,
          backgroundColor: theme['colorPrimary'],
          color: '#fafafa',
          fontFamily: 'Book Antique',
          fontWeight: 'bold',
        }}
      >
        Station Bill{' '}
      </h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Filtering Entry */}
        {/* Work Order Type */}
        <h2>Filtering Entry</h2>
        <Row gutter={16}>
          <Col style={{ width: 260 }}>
            {/* Account Number */}
            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                value={accountNumber}
                onChange={(e) => {
                  // Use a regular expression to remove non-digit characters
                  const sanitizedValue = e.target.value.replace(/\D/g, '');
                  setAccountNumber(sanitizedValue);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{ marginTop: 30 }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {/* Alert Message */}
        <Row style={{ marginTop: '-16px', marginBottom: '10px' }}>
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
        {/* RealType for real-time text display */}
        <RealType
          primaryText={workOrderType}
          secondaryText={workOrderDescription}
          additionalText={accountNumber}
        />
        {/* Customer Information (Left) and Function Tabs (Right) */}
        <Row gutter={16} style={{ paddingLeft: 16, marginTop: 16 }}>
          <Col style={{ width: 420 }}>
            {/* Customer Information */}
            <h2>Account Information</h2>
            <div
              style={{
                height: 'auto',
                bottom: 0,
                overflowY: 'scroll',
                border: '1px solid #ccc',
                padding: 24,
                borderRadius: 16,
                textAlign: 'left',
              }}
            >
              <Form layout="vertical">
                {/* Add customer information here */}
              </Form>
            </div>
          </Col>
          <Col span={18} style={{ marginLeft: 16, alignContent: 'center' }}>
            {/* Function Tabs */}
            <h2>
              <PlusCircleTwoTone
                twoToneColor={theme['orange']}
                style={{ fontSize: 20 }}
              />{' '}
              CURRENT Meter Information
            </h2>
            <EditableProTable
              columns={columns}
              dataSource={dataSource}
              rowKey="key"
              // Add other table properties and events as needed
            />
            <h2 style={{ marginTop: 32 }}>Work Order Information</h2>
            <Form
              layout="vertical"
              style={{
                marginLeft: 0,
                marginTop: 0,
                background: 'transparent',
                padding: 32,
              }}
            >
              {/* Display-only fields */}
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Work Order Type">
                    <span
                      style={{
                        background: theme['cyan.2'],
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 8,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                    >
                      {selectedWorkOrder} - {workOrderDescription}
                    </span>{' '}
                  </Form.Item>
                </Col>
                {/* Add other display-only fields */}
              </Row>
              {/* Input fields */}
              <Row gutter={16}>
                <Col span={8} style={{ width: '250px' }}>
                  <Form.Item
                    label="Schedule Start Date"
                    name="scheduleStartDate"
                  >
                    <DatePicker format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
                {/* Add other input fields */}
              </Row>
              <Row gutter={16}>{/* Add more rows for input fields */}</Row>
              <Row gutter={16}>
                <div>
                  <Form.Item>
                    <Checkbox.Group>
                      <Space direction="horizontal">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '8px',
                            width: '100%',
                            minWidth: '400px',
                            flexWrap: 'wrap',
                            padding: 10,
                            marginLeft: 8,
                            marginTop: 16,
                            background: printForm
                              ? theme['colorPrimary']
                              : 'rgba(230,250,250,0.1)',
                            border: '1px solid #e3e6e9',
                            transition: 'background 0.3s ease-in-out',
                          }}
                        >
                          <Checkbox
                            value="printForm"
                            checked={printForm}
                            onChange={(e) =>
                              handlePrintCheckboxChange(e.target.checked)
                            }
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '8px',
                                width: '420px',
                                minWidth: '360px',
                                flexWrap: 'wrap',
                              }}
                            >
                              <Avatar
                                style={{
                                  backgroundColor: '#ffffff',
                                  marginRight: '8px',
                                  width: 40,
                                  height: 40,
                                }}
                                src="./icons/icon_printDoc.png"
                              />
                              <span
                                style={{
                                  flex: 1,
                                  color: theme['colorTextBase'],
                                }}
                              >
                                <b>Generate/Print out</b> a single hard copy of
                                the <b>Issue New Work Order Document.</b>{' '}
                              </span>
                            </div>
                          </Checkbox>
                        </div>
                      </Space>
                    </Checkbox.Group>
                  </Form.Item>
                </div>
              </Row>
              <Row gutter={16} style={{ textAlign: 'right' }}>
                <Col span={24}>
                  <Form.Item>
                    <Button style={{ marginRight: 8 }} onClick={handleReset}>
                      Reset
                    </Button>
                    {/* <Button type="link" onClick={handleClearWorkOrderInfo}>
                        Clear Work Order Information
                      </Button> */}
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StationBill;
