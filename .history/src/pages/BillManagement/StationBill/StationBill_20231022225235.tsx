import {
  ExclamationCircleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table'; // Import EditableProTable and ProColumns
import { Alert, Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import RealType from '../../../customComponents/RealTimeTextDisplay/RealType';

const { Option } = Select;
const { TextArea } = Input;

interface Theme {
  [key: string]: string;
}

interface StationBillProps {
  theme: Theme;
}

const StationBill: React.FC<StationBillProps> = ({ theme }) => {
  // Define columns for EditableProTable
  const columns: ProColumns<{
    key: string;
    eventGroup: string;
    taxCode: string;
    taxRate: string;
    eventItem: string;
    eventItemDescription: string;
    itemQuantity: string;
    itemChargeRate: string;
    itemAmount: string;
    governmentServiceChargeRate: string;
    governmentServiceChargeAmount: string;
  }> = [
    {
      title: 'Event Group',
      dataIndex: 'eventGroup',
      key: 'eventGroup',
    },
    {
      title: 'Tax Code',
      dataIndex: 'taxCode',
      key: 'taxCode',
    },
    {
      title: 'Tax Rate %',
      dataIndex: 'taxRate',
      key: 'taxRate',
    },
    {
      title: 'Event Item',
      dataIndex: 'eventItem',
      key: 'eventItem',
    },
    {
      title: 'Event Item Description',
      dataIndex: 'eventItemDescription',
      key: 'eventItemDescription',
    },
    {
      title: 'Item Quantity',
      dataIndex: 'itemQuantity',
      key: 'itemQuantity',
    },
    {
      title: 'Item Charge Rate',
      dataIndex: 'itemChargeRate',
      key: 'itemChargeRate',
    },
    {
      title: 'Item Amount',
      dataIndex: 'itemAmount',
      key: 'itemAmount',
    },
    {
      title: 'Government Service Charge %',
      dataIndex: 'governmentServiceChargeRate',
      key: 'governmentServiceChargeRate',
    },
    {
      title: 'Government Service Charge Amount',
      dataIndex: 'governmentServiceChargeAmount',
      key: 'governmentServiceChargeAmount',
    },
  ];

  const [dataSource, setDataSource] = useState([]); // Initialize dataSource with your data

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
        Station Bill
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
                {/* Rest of your customer information form fields */}
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
              CURRENT MeterList
            </h2>
            <div
              style={{
                border: '1px solid #ccc',
                padding: 24,
                borderRadius: 16,
                textAlign: 'left',
              }}
            >
              {/* Rest of your function tabs */}
            </div>
          </Col>
        </Row>
        {/* Work Order */}
        <h2>
          <PlusCircleTwoTone
            twoToneColor={theme['orange']}
            style={{ fontSize: 20 }}
          />{' '}
          Work Order
        </h2>
        <Row gutter={16}>
          <Col style={{ width: 260 }}>
            {/* Work Order Type */}
            <Form.Item label="Work Order Type" name="workOrderType">
              <Select
                value={selectedWorkOrderType}
                onChange={(value) => setSelectedWorkOrderType(value)}
              >
                {/* Options for work order types */}
              </Select>
            </Form.Item>
          </Col>
          {/* Rest of your work order form fields */}
        </Row>
        {/* Assign Work Order */}
        <h2>
          <PlusCircleTwoTone
            twoToneColor={theme['orange']}
            style={{ fontSize: 20 }}
          />{' '}
          Assign Work Order
        </h2>
        <Row gutter={16}>
          {/* Rest of your assign work order form fields */}
        </Row>
        {/* Buttons */}
        <Form.Item style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit">
            Save Work Order
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleClearWorkOrderInfo}>
            Clear Work Order Information
          </Button>
        </Form.Item>
        {/* Send Via Email/SMS and Print Form */}
        <Row gutter={16}>
          <Col style={{ width: 260 }}>
            <Form.Item label="Send Via Email/SMS" name="sendViaEmailSMS">
              <Checkbox
                checked={sendViaEmailSMS}
                onChange={(e) => handleEmailCheckboxChange(e.target.checked)}
              >
                Send via Email/SMS
              </Checkbox>
            </Form.Item>
          </Col>
          <Col style={{ width: 260 }}>
            <Form.Item label="Print Form" name="printForm">
              <Checkbox
                checked={printForm}
                onChange={(e) => handlePrintCheckboxChange(e.target.checked)}
              >
                Print Form
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StationBill;
