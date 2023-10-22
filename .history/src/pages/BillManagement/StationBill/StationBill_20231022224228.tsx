import { PlusCircleTwoTone } from '@ant-design/icons';
import EditableProTable from '@ant-design/pro-table';
import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';

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
  const [eventItems, setEventItems] = useState([
    {
      EventGroup: 'Group 1',
      'Event Group': 'Event Group 1',
      'Drop List': 'Yes',
      Code: 'Code 1',
      'Tax Code': 'Tax Code 1',
      Rate: 'Rate 1',
      'Tax Rate %': 'Tax Rate % 1',
      'BillEvent.EventCode': 'Event Item 1',
      'Event Item': 'Event Item 1',
      'EventGroup.DocDescr': 'Event Item Description 1',
      'Event Item Description': 'Event Item Description 1',
      Quantity: 'Quantity 1',
      'Item Quantity': 'Item Quantity 1',
      Rate: 'Rate 1',
      'Item Charge Rate': 'Item Charge Rate 1',
      Amount: 'Amount 1',
      'Item Amount': 'Item Amount 1',
      'Government Service Charge %': 'Government Service Charge % 1',
      'Government Service Charge Amount': 'Government Service Charge Amount 1',
    },
    {
      EventGroup: 'Group 2',
      'Event Group': 'Event Group 2',
      'Drop List': 'No',
      Code: 'Code 2',
      'Tax Code': 'Tax Code 2',
      Rate: 'Rate 2',
      'Tax Rate %': 'Tax Rate % 2',
      'BillEvent.EventCode': 'Event Item 2',
      'Event Item': 'Event Item 2',
      'EventGroup.DocDescr': 'Event Item Description 2',
      'Event Item Description': 'Event Item Description 2',
      Quantity: 'Quantity 2',
      'Item Quantity': 'Item Quantity 2',
      Rate: 'Rate 2',
      'Item Charge Rate': 'Item Charge Rate 2',
      Amount: 'Amount 2',
      'Item Amount': 'Item Amount 2',
      'Government Service Charge %': 'Government Service Charge % 2',
      'Government Service Charge Amount': 'Government Service Charge Amount 2',
    },
    {
      EventGroup: 'Group 1',
      'Event Group': 'Event Group 1',
      'Drop List': 'No',
      Code: 'Code 3',
      'Tax Code': 'Tax Code 3',
      Rate: 'Rate 3',
      'Tax Rate %': 'Tax Rate % 3',
      'BillEvent.EventCode': 'Event Item 3',
      'Event Item': 'Event Item 3',
      'EventGroup.DocDescr': 'Event Item Description 3',
      'Event Item Description': 'Event Item Description 3',
      Quantity: 'Quantity 3',
      'Item Quantity': 'Item Quantity 3',
      Rate: 'Rate 3',
      'Item Charge Rate': 'Item Charge Rate 3',
      Amount: 'Amount 3',
      'Item Amount': 'Item Amount 3',
      'Government Service Charge %': 'Government Service Charge % 3',
      'Government Service Charge Amount': 'Government Service Charge Amount 3',
    },
    // Add more mock data here
  ]);

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

  const handleFieldChange = (index, key, value) => {
    const updatedEventItems = [...eventItems];
    updatedEventItems[index][key] = value;
    setEventItems(updatedEventItems);
  };

  const handleDelete = (index) => {
    const updatedEventItems = [...eventItems];
    updatedEventItems.splice(index, 1);
    setEventItems(updatedEventItems);
  };

  const handleAdd = () => {
    const newEventItem = {
      EventGroup: '',
      'Event Group': '',
      'Drop List': 'Yes',
      Code: '',
      'Tax Code': '',
      Rate: '',
      'Tax Rate %': '',
      'BillEvent.EventCode': '',
      'Event Item': '',
      'EventGroup.DocDescr': '',
      'Event Item Description': '',
      Quantity: '',
      'Item Quantity': '',
      Rate: '',
      'Item Charge Rate': '',
      Amount: '',
      'Item Amount': '',
      'Government Service Charge %': '',
      'Government Service Charge Amount': '',
    };
    setEventItems([...eventItems, newEventItem]);
  };

  const columns = [
    {
      title: 'EventGroup',
      dataIndex: 'EventGroup',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Event Group"
          value={record?.EventGroup}
          onChange={(e) =>
            handleFieldChange(index, 'EventGroup', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Event Group',
      dataIndex: 'Event Group',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Event Group"
          value={record?.['Event Group']}
          onChange={(e) =>
            handleFieldChange(index, 'Event Group', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Drop List',
      dataIndex: 'Drop List',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Select
          defaultValue={record?.['Drop List']}
          onChange={(value) => handleFieldChange(index, 'Drop List', value)}
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      ),
    },
    {
      title: 'Code',
      dataIndex: 'Code',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Code"
          value={record?.Code}
          onChange={(e) => handleFieldChange(index, 'Code', e.target.value)}
        />
      ),
    },
    {
      title: 'Tax Code',
      dataIndex: 'Tax Code',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Tax Code"
          value={record?.['Tax Code']}
          onChange={(e) => handleFieldChange(index, 'Tax Code', e.target.value)}
        />
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'Rate',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Rate"
          value={record?.Rate}
          onChange={(e) => handleFieldChange(index, 'Rate', e.target.value)}
        />
      ),
    },
    {
      title: 'Tax Rate %',
      dataIndex: 'Tax Rate %',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Tax Rate %"
          value={record?.['Tax Rate %']}
          onChange={(e) =>
            handleFieldChange(index, 'Tax Rate %', e.target.value)
          }
        />
      ),
    },
    {
      title: 'BillEvent.EventCode',
      dataIndex: 'BillEvent.EventCode',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Event Item"
          value={record?.['BillEvent.EventCode']}
          onChange={(e) =>
            handleFieldChange(index, 'BillEvent.EventCode', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Event Item',
      dataIndex: 'Event Item',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Event Item"
          value={record?.['Event Item']}
          onChange={(e) =>
            handleFieldChange(index, 'Event Item', e.target.value)
          }
        />
      ),
    },
    {
      title: 'EventGroup.DocDescr',
      dataIndex: 'EventGroup.DocDescr',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Event Item Description"
          value={record?.['EventGroup.DocDescr']}
          onChange={(e) =>
            handleFieldChange(index, 'EventGroup.DocDescr', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Event Item Description',
      dataIndex: 'Event Item Description',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Event Item Description"
          value={record?.['Event Item Description']}
          onChange={(e) =>
            handleFieldChange(index, 'Event Item Description', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Quantity"
          value={record?.Quantity}
          onChange={(e) => handleFieldChange(index, 'Quantity', e.target.value)}
        />
      ),
    },
    {
      title: 'Item Quantity',
      dataIndex: 'Item Quantity',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Item Quantity"
          value={record?.['Item Quantity']}
          onChange={(e) =>
            handleFieldChange(index, 'Item Quantity', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'Rate',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Rate"
          value={record?.Rate}
          onChange={(e) => handleFieldChange(index, 'Rate', e.target.value)}
        />
      ),
    },
    {
      title: 'Item Charge Rate',
      dataIndex: 'Item Charge Rate',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Item Charge Rate"
          value={record?.['Item Charge Rate']}
          onChange={(e) =>
            handleFieldChange(index, 'Item Charge Rate', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Amount"
          value={record?.Amount}
          onChange={(e) => handleFieldChange(index, 'Amount', e.target.value)}
        />
      ),
    },
    {
      title: 'Item Amount',
      dataIndex: 'Item Amount',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Item Amount"
          value={record?.['Item Amount']}
          onChange={(e) =>
            handleFieldChange(index, 'Item Amount', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Government Service Charge %',
      dataIndex: 'Government Service Charge %',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Government Service Charge %"
          value={record?.['Government Service Charge %']}
          onChange={(e) =>
            handleFieldChange(
              index,
              'Government Service Charge %',
              e.target.value,
            )
          }
        />
      ),
    },
    {
      title: 'Government Service Charge Amount',
      dataIndex: 'Government Service Charge Amount',
      valueType: 'text',
      renderFormItem: (_, { record, index }) => (
        <Input
          placeholder="Government Service Charge Amount"
          value={record?.['Government Service Charge Amount']}
          onChange={(e) =>
            handleFieldChange(
              index,
              'Government Service Charge Amount',
              e.target.value,
            )
          }
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      valueType: 'option',
      render: (_, record, index) => {
        return (
          <Space>
            <a onClick={() => handleDelete(index)}>Delete</a>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          workOrderType,
          selectedWorkOrder,
          workOrderDescription,
          accountNumber,
          sendViaEmailSMS,
          printForm,
          selectedWorkOrderType,
        }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="workOrderType"
              label="Work Order Type"
              rules={[
                {
                  required: true,
                  message: 'Please select Work Order Type',
                },
              ]}
            >
              <Select
                placeholder="Select Work Order Type"
                onChange={(value) => setWorkOrderType(value)}
              >
                <Option value="type1">Type 1</Option>
                <Option value="type2">Type 2</Option>
                <Option value="type3">Type 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="selectedWorkOrder"
              label="Work Order"
              rules={[
                {
                  required: true,
                  message: 'Please select Work Order',
                },
              ]}
            >
              <Select
                placeholder="Select Work Order"
                onChange={(value) => setSelectedWorkOrder(value)}
              >
                <Option value="order1">Order 1</Option>
                <Option value="order2">Order 2</Option>
                <Option value="order3">Order 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="workOrderDescription"
              label="Work Order Description"
              rules={[
                {
                  required: true,
                  message: 'Please enter Work Order Description',
                },
              ]}
            >
              <Input
                placeholder="Enter Work Order Description"
                onChange={(e) => setWorkOrderDescription(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[
                {
                  required: true,
                  message: 'Please enter Account Number',
                },
              ]}
            >
              <Input
                placeholder="Enter Account Number"
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="sendViaEmailSMS"
              label="Send Via Email/SMS"
              valuePropName="checked"
            >
              <Checkbox
                onChange={(e) => handleEmailCheckboxChange(e.target.checked)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="printForm"
              label="Print Form"
              valuePropName="checked"
            >
              <Checkbox
                onChange={(e) => handlePrintCheckboxChange(e.target.checked)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="selectedWorkOrderType"
              label="Work Order Type"
              rules={[
                {
                  required: true,
                  message: 'Please select Work Order Type',
                },
              ]}
            >
              <Select
                placeholder="Select Work Order Type"
                onChange={(value) => setSelectedWorkOrderType(value)}
              >
                <Option value="type1">Type 1</Option>
                <Option value="type2">Type 2</Option>
                <Option value="type3">Type 3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <EditableProTable
          rowKey="key"
          headerTitle="Event Items"
          columns={columns}
          value={eventItems}
          onChange={(newEventItems) => setEventItems(newEventItems)}
          toolBarRender={() => [
            <Button key="add" type="primary" onClick={handleAdd}>
              <PlusCircleTwoTone />
              Add Event Item
            </Button>,
          ]}
        />
      </Form>
    </div>
  );
};

export default StationBill;
