import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditableProTable, { ProColumns } from '@ant-design/pro-table';
import { Alert, Button, Col, Form, Input, Row, Select } from 'antd';
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
    },
    {
      title: 'Tax Code',
      dataIndex: 'taxCode',
    },
    {
      title: 'Tax Rate %',
      dataIndex: 'taxRate',
    },
    {
      title: 'Event Item',
      dataIndex: 'eventItem',
    },
    {
      title: 'Event Item Description',
      dataIndex: 'eventItemDescription',
    },
    {
      title: 'Item Quantity',
      dataIndex: 'itemQuantity',
      render: (text, record) => {
        return (
          <Form.Item
            name={['itemQuantity', record.key]} // Use a unique key for each item
            initialValue={text}
          >
            <Input />
          </Form.Item>
        );
      },
    },
    {
      title: 'Item Charge Rate',
      dataIndex: 'itemChargeRate',
    },
    {
      title: 'Item Amount',
      dataIndex: 'itemAmount',
    },
    {
      title: 'Government Service Charge %',
      dataIndex: 'governmentServiceChargeRate',
    },
    {
      title: 'Government Service Charge Amount',
      dataIndex: 'governmentServiceChargeAmount',
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

  const handleFormChange = (changedValues, allValues) => {
    // Handle changes in form values here
    // You may update your state with the new values
  };

  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log('Form values:', values);
    // Add logic to apply the filter and fetch data here
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
        {/* Customer Information (Left) and Function Tabs (Right) */}
        <Row gutter={16} style={{ paddingLeft: 16, marginTop: 16 }}>
          <Col style={{ width: 420 }}>
            {/* Account Information */}
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
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Branch">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        Branch 01
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Account Status">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        Active
                      </span>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Name">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        John Doe
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="D.O.B">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        22/02/2000
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Consumer Type">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        Individual
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Tariff">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        Residential
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Book No">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        12345
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Account Type">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        Regular
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Current Deposit">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        RM160.00
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Last Deposit Revision">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        [sample]
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Deposit Type">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        Type 01{' '}
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Addtional Deposit">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        [sample]
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Current Arrears">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        RM60.00
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="GST Relief">
                      <span
                        style={{
                          background: theme['cyan.3'],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        [yes]
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
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
