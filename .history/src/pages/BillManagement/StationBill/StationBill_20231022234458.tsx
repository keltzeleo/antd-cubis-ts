import { ProColumns } from '@ant-design/pro-table';
import { Form, Input, Popconfirm, Select, message } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;
const { TextArea } = Input;

export interface DataSourceType {
  id: React.Key;
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
}

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
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);

  // Define columns for EditableProTable
  const columns: ProColumns<DataSourceType>[] = [
    // ... Define your columns based on DataSourceType ...
    {
      title: 'No.',
      dataIndex: 'key', // Assuming 'key' is unique and can serve as a key
      valueType: 'indexBorder',
      width: '20',
    },
    {
      title: 'Event Group',
      dataIndex: 'eventGroup',
    },
    {
      title: 'Tax Code',
      dataIndex: 'taxCode',
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
    {
      title: (
        <div
          style={{
            fontWeight: 'bold',
            height: '120%',
            width: 'auto',
            overflow: 'hidden',
            background: 'rgba(92, 110, 113, 0.1)', // Semi-transparent overlay color for the blur effect
            zIndex: 1,
            borderRadius: '4px',
            padding: '16px 16px',
            right: 0,
            top: 0,
            left: 0,
            margin: '-12 -8 -12 -8', // Ensure the overlay is behind the content
            backdropFilter: 'blur(14px)', // Use backdrop-filter for modern browsers that support it
          }}
        >
          &nbsp; Actions &nbsp;&nbsp;&nbsp;&nbsp;{' '}
        </div>
      ),
      valueType: 'option',
      fixed: 'right',
      width: '138',
      render: (text: any, record: DataSourceType, _, action) => (
        <span>
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            &nbsp;&nbsp;编辑 &nbsp;&nbsp;
          </a>

          <Popconfirm
            title="Are you sure you want to delete this entry?"
            onConfirm={() => {
              handleDelete(record.id);
            }}
            onCancel={() => message.info('Delete canceled')}
            okText="Yes"
            cancelText="No"
          >
            <a key="delete">&nbsp;删除 &nbsp;&nbsp;&nbsp;</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleDelete = (id: React.Key) => {
    setDataSource((prevData) => prevData.filter((item) => item.id !== id));
    message.success('Entry deleted successfully!');
  };

  const mockData: DataSourceType[] = [
    {
      id: '1',
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
      id: '2',
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

  const handleSave = async (
    rowKey: React.Key,
    data: DataSourceType,
    row: DataSourceType,
  ) => {
    // await waitTime(2000);
    console.log(rowKey, data, row);
  };

  const handleCancel = async (rowKey: React.Key, data: DataSourceType) => {
    console.log(rowKey, data);
  };

  const handleFormChange = (changedValues: any, allValues: any) => {
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
    <div style={{ marginLeft: 32 }}>{/* ... Rest of your component ... */}</div>
  );
};

export default StationBill;
