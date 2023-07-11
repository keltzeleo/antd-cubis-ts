import { SearchOutlined } from "@ant-design/icons";
import ProForm, { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Button, Divider, Input, Table } from "antd";
import React, { useState } from "react";

interface Tariff {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  effectiveDateFrom: string;
  monthlyMinimumCharge: number;
}

interface Theme {
  [key: string]: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [data, setData] = useState<Tariff[]>([
    {
      key: "1",
      tariffCode: "T1",
      tariffAbbreviation: "Tariff 1",
      monthlyMinimumCharge: 30,
      effectiveDateFrom: "20/09/2020",
    },
    {
      key: "2",
      tariffCode: "T2",
      tariffAbbreviation: "Tariff 2",
      monthlyMinimumCharge: 20,
      effectiveDateFrom: "20/09/2020",
    },
    // Add more tariffs as needed
  ]);

  const columns = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
    },
    {
      title: "Monthly Minimum Charge",
      dataIndex: "monthlyMinimumCharge",
      key: "monthlyMinimumCharge",
    },
    {
      title: "Effective Date From",
      dataIndex: "effectiveDateFrom",
      key: "effectiveDateFrom",
    },
  ];

  const handleSearch = (value: string) => {
    // Perform search logic here
    const filteredResults = data.filter((tariff) =>
      tariff.description.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredResults);
  };

  const handleFormSubmit = async (values: any) => {
    // Handle form submission
    console.log(values);
  };

  const expandedRowRender = (record: Tariff) => {
    return (
      <p style={{ margin: 0 }}>
        <b>Tariff Code: </b> {record.code} <br />
        <b>Tariff Description: </b> {record.description} <br />
        <b>Tariff Type: </b> {record.type} <br />
        <b>Tariff Amount: </b> {record.amount}
      </p>
    );
  };

  return (
    <div>
      <div style={{ background: "", margin: "10px 10px" }}>
        <>
          <Input
            style={{ marginTop: 24, width: "350px" }}
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Tariff Description for Quick Search"
            prefix={<SearchOutlined />}
          />
        </>
      </div>
      <div>
        <Table
          style={{ margin: 10 }}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10, // Set the page size to 10
          }}
          onChange={() => {}}
          size="small"
          expandable={{ expandedRowRender }}
        />
      </div>
      <Divider />
      <div style={{ margin: "10px" }}>
        <ProForm
          layout="horizontal"
          onFinish={handleFormSubmit}
          submitter={{
            render: (_, defaultDoms) => {
              return [
                <Button key="submit" type="primary" htmlType="submit">
                  Submit
                </Button>,
                <Button key="reset" onClick={() => {}}>
                  Reset
                </Button>,
              ];
            },
          }}
        >
          <ProFormText
            label="Tariff Code"
            name="code"
            placeholder="Enter Tariff Code"
            rules={[
              {
                required: true,
                message: "Please enter the tariff code!",
              },
            ]}
          />
          <ProFormText
            label="Tariff Description"
            name="description"
            placeholder="Enter Tariff Description"
            rules={[
              {
                required: true,
                message: "Please enter the tariff description!",
              },
            ]}
          />
          <ProFormSelect
            label="Tariff Type"
            name="type"
            placeholder="Select Tariff Type"
            options={[
              { label: "Electricity", value: "Electricity" },
              { label: "Water", value: "Water" },
            ]}
            rules={[
              {
                required: true,
                message: "Please select the tariff type!",
              },import { ProTable, ProForm } from '@ant-design/pro-table';
              import { useState } from 'react';
              
              const data = [
                {
                  key: '1',
                  no: 1,
                  tariffCode: 'T001',
                  effectiveDate: '2023-07-01',
                  monthlyMinimumCharge: '$50.00',
                  tariffAbbreviation: 'Tariff A',
                  createdBy: 'John Doe',
                  createdDate: '2023-06-30',
                  modifiedBy: 'Jane Smith',
                  modifiedDate: '2023-07-01',
                  blocks: [
                    {
                      key: '01',
                      block: '0-10m³',
                      rate: 'RM 0.03/m³',
                      startingEffectiveDate: '04/07/2020',
                      createdBy: 'John Doe',
                      createdDate: '2023-06-30',
                      modifiedBy: 'Jane Smith',
                      modifiedDate: '2023-07-01',
                    },
                    {
                      key: '02',
                      block: '11-20m³',
                      rate: 'RM 0.08/m³',
                      startingEffectiveDate: '04/07/2020',
                    },
                    {
                      key: '03',
                      block: '21-100m³',
                      rate: 'RM 0.13/m³',
                      startingEffectiveDate: '04/07/2020',
                    },                  ],
                },
                // Other data entries
              ];
              
              const columns = [
                {
                  title: 'No',
                  dataIndex: 'no',
                  key: 'no',
                },
                {
                  title: 'Tariff Code',
                  dataIndex: 'tariffCode',
                  key: 'tariffCode',
                },
                {
                  title: 'Effective Date',
                  dataIndex: 'effectiveDate',
                  key: 'effectiveDate',
                },
                {
                  title: 'Monthly Minimum Charge',
                  dataIndex: 'monthlyMinimumCharge',
                  key: 'monthlyMinimumCharge',
                },
                {
                  title: 'Tariff Abbreviation',
                  dataIndex: 'tariffAbbreviation',
                  key: 'tariffAbbreviation',
                },
                {
                  title: 'Action',
                  key: 'action',
                  dataIndex: 'action',
                  valueType: 'option',
                  render: (_, record) => (
                    <>
                      <a>Edit</a> / <a>Delete</a>
                    </>
                  ),
                },
              ];
              
              const nestedTableColumns = [
                {
                  title: '',
                  dataIndex: 'index',
                  key: 'index',
                  render: (_, subRecord, index) => index + 1,
                },
                {
                  title: 'Block',
                  dataIndex: 'block',
                  key: 'block',
                  valueType: 'text',
                },
                {
                  title: 'Rate',
                  dataIndex: 'rate',
                  key: 'rate',
                  valueType: 'text',
                },
                {
                  title: 'Starting Effective Date',
                  dataIndex: 'startingEffectiveDate',
                  key: 'startingEffectiveDate',
                  valueType: 'text',
                },
                {
                  title: 'Action',
                  key: 'action',
                  dataIndex: 'action',
                  valueType: 'option',
                  render: (_, record) => (
                    <>
                      <a>Edit</a> / <a>Delete</a>
                    </>
                  ),
                },
                {
                  title: 'Created By',
                  dataIndex: 'createdBy',
                  key: 'createdBy',
                  valueType: 'text',
                  hideInTable: true,
                },
                {
                  title: 'Created Date',
                  dataIndex: 'createdDate',
                  key: 'createdDate',
                  valueType: 'date',
                  hideInTable: true,
                },
                {
                  title: 'Modified By',
                  dataIndex: 'modifiedBy',
                  key: 'modifiedBy',
                  valueType: 'text',
                  hideInTable: true,
                },
                {
                  title: 'Modified Date',
                  dataIndex: 'modifiedDate',
                  key: 'modifiedDate',
                  valueType: 'date',
                  hideInTable: true,
                },
              ];
              
              const expandedRowRender = (record) => {
                const [expanded, setExpanded] = useState(false);
              
                return (
                  <>
                    <ProTable
                      columns={nestedTableColumns}
                      dataSource={record.blocks}
                      rowKey="key"
                      search={false}
                      pagination={false}
                      headerTitle={false}
                      expandable={{
                        expandedRowRender: (_, subRecord) =>
                          expanded && (
                            <ProForm.Group>
                              <ProForm.Item label="Created By" name="createdBy">
                                {subRecord.createdBy}
                              </ProForm.Item>
                              <ProForm.Item label="Created Date" name="createdDate">
                                {subRecord.createdDate}
                              </ProForm.Item>
                              <ProForm.Item label="Modified By" name="modifiedBy">
                                {subRecord.modifiedBy}
                              </ProForm.Item>
                              <ProForm.Item label="Modified Date" name="modifiedDate">
                                {subRecord.modifiedDate}
                              </ProForm.Item>
                            </ProForm.Group>
                          ),
                        onExpand: (_, expandedRows) => {
                          setExpanded(expandedRows.includes(record.key));
                        },
                        expandRowByClick: true,
                      }}
                    />
                    {expanded && (
                      <div style={{ textAlign: 'right', marginTop: 16 }}>
                        <a onClick={() => setExpanded(false)}>Collapse</a>
                      </div>
                    )}
                  </>
                );
              };
              
              const TableWithExpandableRows = () => {
                return (
                  <ProTable
                    columns={columns}
                    dataSource={data}
                    rowKey="key"
                    search={false}
                    pagination={false}
                    expandable={{
                      expandedRowRender,
                      expandRowByClick: true,
                      defaultExpandAllRows: false,
                    }}
                    expandableRowKeys={data.map((item) => item.key)}
                  />
                );
              };
              
              export default TableWithExpandableRows;
              
            ]}
          />
          <ProFormText
            label="Tariff Amount"
            name="amount"
            placeholder="Enter Tariff Amount"
            rules={[
              {
                required: true,
                message: "Please enter the tariff amount!",
              },
              {
                pattern: /^(?:\d*\.\d{1,2}|\d+)$/,
                message: "Invalid amount format. (e.g., 10 or 10.00)",
              },
            ]}
          />
        </ProForm>
      </div>
    </div>
  );
};

export default TariffChargesMaintenance;
