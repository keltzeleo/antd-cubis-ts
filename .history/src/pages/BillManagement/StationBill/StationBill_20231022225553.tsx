import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditableProTable, { ProColumns } from '@ant-design/pro-table';
import {
  Alert,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
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
}

const StationBill: React.FC<StationBillProps> = ({ theme }) => {
  const [workOrderType, setWorkOrderType] = useState('');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState('');
  const [workOrderDescription, setWorkOrderDescription] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [form] = Form.useForm();
  const [sendViaEmailSMS, setSendViaEmailSMS] = useState(false);
  const [printForm, setPrintForm] = useState(false);
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState('');

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
  }>[] = [
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

  const mockData = [
    {
      key: '1',
      eventGroup: 'Group 1',
      taxCode: 'TC001',
      taxRate: '10%',
      eventItem: 'Item 1',
      eventItemDescription: 'Description 1',
      itemQuantity: '5',
      itemChargeRate: '$20',
      itemAmount: '$100',
      governmentServiceChargeRate: '5%',
      governmentServiceChargeAmount: '$5',
    },
    {
      key: '2',
      eventGroup: 'Group 2',
      taxCode: 'TC002',
      taxRate: '8%',
      eventItem: 'Item 2',
      eventItemDescription: 'Description 2',
      itemQuantity: '3',
      itemChargeRate: '$15',
      itemAmount: '$45',
      governmentServiceChargeRate: '3%',
      governmentServiceChargeAmount: '$1.35',
    },
    // Add more mock data as needed
  ];

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
          <Col style={{ width: '70%' }}>
            <h2>Customer Information</h2>
            {/* Schedule Start Date */}
            {/* ... (other form fields) */}
            <Form.Item label="Schedule Start Date" name="scheduleStartDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            {/* Schedule End Date */}
            {/* ... (other form fields) */}
            {/* Email & SMS */}
            <Form.Item
              label="Send via Email / SMS"
              name="sendViaEmailSMS"
              valuePropName="checked"
            >
              <Checkbox
                onChange={(e) => handleEmailCheckboxChange(e.target.checked)}
              >
                Send via Email / SMS
              </Checkbox>
            </Form.Item>
            {/* Print */}
            <Form.Item label="Print" name="printForm" valuePropName="checked">
              <Checkbox
                onChange={(e) => handlePrintCheckboxChange(e.target.checked)}
              >
                Print
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={handleClearWorkOrderInfo}
              >
                Clear
              </Button>
            </Form.Item>
          </Col>
          <Col style={{ width: '30%' }}>
            {/* Function Tabs */}
            <h2>Function Tabs</h2>
            {/* Work Order Type */}
            <Form.Item label="Work Order Type" name="workOrderType">
              <Select
                value={selectedWorkOrderType}
                onChange={(value) => setSelectedWorkOrderType(value)}
              >
                <Option value="type1">Type 1</Option>
                <Option value="type2">Type 2</Option>
              </Select>
            </Form.Item>
            {/* Work Order */}
            <Form.Item label="Work Order" name="workOrder">
              <Select
                value={selectedWorkOrder}
                onChange={(value) => setSelectedWorkOrder(value)}
              >
                <Option value="order1">Order 1</Option>
                <Option value="order2">Order 2</Option>
              </Select>
            </Form.Item>
            {/* Work Order Description */}
            <Form.Item
              label="Work Order Description"
              name="workOrderDescription"
            >
              <TextArea
                rows={3}
                value={workOrderDescription}
                onChange={(e) => setWorkOrderDescription(e.target.value)}
              />
            </Form.Item>
            {/* Work Order Remark */}
            <Form.Item label="Work Order Remark" name="workOrderRemark">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
        {/* Editable Pro Table */}
        <h2>Bill Information</h2>
        <EditableProTable
          columns={columns}
          dataSource={mockData}
          rowKey="key"
          search={false}
          dateFormatter="string"
          headerTitle="Bill Information"
        />
      </Form>
    </div>
  );
};

export default StationBill;
