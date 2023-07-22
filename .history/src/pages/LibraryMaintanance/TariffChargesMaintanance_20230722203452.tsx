import { DeleteOutlined } from "@ant-design/icons";
import {
  ProColumns,
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
  ProTable,
} from "@ant-design/pro-components";
import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Space,
  notification,
} from "antd";
import moment from "moment";
import React, { ReactNode, useRef, useState } from "react";
import "../LibraryMaintanance/tableStyle.css";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block?: [number, number] | null;
  rate?: number;
  effectiveDate?: string;
  isEditing?: boolean;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface TariffChargesDataType {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges?: number;
  blockConsumption1?: [number, number] | null;
  rate1?: number;
  blockConsumption2?: [number, number] | null;
  rate2?: number;
  blockConsumption3?: [number, number] | null;
  rate3?: number;
  blockConsumption4?: [number, number] | null;
  rate4?: number;
  blockConsumption5?: [number, number] | null;
  rate5?: number;
  blockConsumption6?: [number, number] | null;
  rate6?: number;
  effectiveDate?: string;
  isEditing?: boolean;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);
  const [showBlockConsumptionsRates, setShowBlockConsumptionsRates] =
    useState(true);

  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([
    {
      key: "1",
      tariffCode: "TAR-001",
      tariffAbbreviation: "TA",
      monthlyMinimumCharges: 100,
      effectiveDate: "07-07-2023",
      createdBy: "John Doe",
      createDate: "07-07-2023",
      modifiedBy: "John Doe",
      modifiedDate: "07-07-2023",
      blockConsumption1: [0, 15],
      rate1: 1.23,
      blockConsumption2: [15, 25],
      rate2: 1.28,
      blockConsumption3: [25, 45],
      rate3: 1.33,
      blockConsumption4: [45, 85],
      rate4: 1.38,
      blockConsumption5: [85, 150],
      rate5: 1.4,
      blockConsumption6: [150, 99999999],
      rate6: 1.48,
      nestedData: [
        {
          key: "1-1",
          status: "Applied",
          block: [0, 10],
          rate: 2,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
        {
          key: "1-2",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
        {
          key: "1-3",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
      ],
    },
    {
      key: "2",
      tariffCode: "TAR-002",
      tariffAbbreviation: "TB",
      monthlyMinimumCharges: 150,
      effectiveDate: "07-07-2023",
      createdBy: "Jane Smith",
      createDate: "07-07-2023",
      modifiedBy: "Jane Smith",
      modifiedDate: "07-07-2023",
      blockConsumption1: [0, 10],
      rate1: 1.13,
      blockConsumption2: [10, 25],
      rate2: 1.18,
      blockConsumption3: [25, 55],
      rate3: 1.23,
      blockConsumption4: [55, 105],
      rate4: 1.28,
      blockConsumption5: [105, 200],
      rate5: 1.23,
      blockConsumption6: [200, 99999999],
      rate6: 1.28,
      nestedData: [
        {
          key: "2-1",
          status: "Applied",
          block: [0, 20],
          rate: 0.05,
          effectiveDate: "07-07-2023",
          createdBy: "Jane Smith",
          createDate: "07-07-2023",
          modifiedBy: "Jane Smith",
          modifiedDate: "07-07-2023",
        },
        {
          key: "2-2",
          status: "Applied",
          block: [21, 30],
          rate: 0.18,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
        {
          key: "2-3",
          status: "Pending",
          block: [31, 100],
          rate: 0.23,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
      ],
    },
  ]);

  const [editingRecordKey, setEditingRecordKey] = useState<React.Key | null>(
    null
  );
  const [nestedEditingRecordKey, setNestedEditingRecordKey] =
    useState<React.Key | null>(null);

  const [nestedExpandedRowKeys, setNestedExpandedRowKeys] = useState<
    React.Key[]
  >([]);

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const formRef = useRef<FormInstance<any>>(Form.useForm()[0]);
  const nestedFormRef = useRef<FormInstance<any>>(Form.useForm()[0]);
  const [newRowValues, setNewRowValues] = useState<Partial<NestedDataType>>({});

  const handleChangeNewRow = (fieldName: string, value: any) => {
    setNewRowValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleNestedTableChange = (
    recordKey: React.Key,
    nestedData: NestedDataType[]
  ) => {
    setDataSource((prevDataSource) => {
      const updatedDataSource = prevDataSource.map((record) => {
        if (record.key === recordKey) {
          return {
            ...record,
            nestedData: [...nestedData],
          };
        }
        return record;
      });
      return updatedDataSource;
    });
  };

  const handleToggleColumns = (checked: boolean, columnType: string) => {
    if (columnType === "additionalColumns") {
      setShowAdditionalColumns(checked);
    } else if (columnType === "blockConsumptionsRates") {
      setShowBlockConsumptionsRates(checked);
    }
  };

  const handleEdit = (
    recordKey: React.Key | null,
    mainRecord: TariffChargesDataType
  ) => {
    setNestedEditingRecordKey(recordKey);
    console.log(
      "main record" + (mainRecord.nestedData && mainRecord.nestedData[0].rate)
    );
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => ({
        ...item,
        isEditing: item.key === mainRecord.key,
        nestedData:
          item.key === mainRecord.key
            ? item.nestedData?.map((nestedItem) => ({
                ...nestedItem,
                isEditing: true,
              }))
            : item.nestedData,
      }))
    );

    setExpandedRowKeys((prevExpandedRowKeys) => [
      ...prevExpandedRowKeys,
      mainRecord.key,
    ]);

    setNestedExpandedRowKeys([mainRecord.key]);
  };

  const handleSave = async (key: React.Key) => {
    try {
      await formRef.current?.validateFields();

      const updatedNestedData = nestedFormRef.current?.getFieldsValue();

      const updatedDataSource = dataSource.map((record) => {
        if (record.key === key) {
          const formValues = formRef.current?.getFieldsValue();

          // Convert the effectiveDate to the desired format
          const effectiveDate = formValues?.[record.key]?.effectiveDate;
          const effectiveDateString = effectiveDate
            ? effectiveDate.format("DD-MM-YYYY")
            : undefined;

          const updatedRecord = {
            ...record,
            ...formValues?.[record.key],
            nestedData: record.nestedData?.map((nestedItem) => {
              const matchingItem =
                updatedNestedData?.[`${record.key}-${nestedItem.key}`];
              return {
                ...nestedItem,
                ...(matchingItem || {}),
                isEditing: false,
                rate:
                  matchingItem?.rate !== undefined
                    ? Number(matchingItem.rate)
                    : nestedItem.rate,
                block: matchingItem?.block || nestedItem.block, // This line updates the block consumption value
              };
            }),
            effectiveDate: effectiveDateString, // Use the string date
            isEditing: false,
          };

          return updatedRecord;
        }
        return record;
      });

      setDataSource(updatedDataSource);
      setEditingRecordKey(null);
      setExpandedRowKeys([key]);
      setExpandedRowKeys([key]);
      setNestedExpandedRowKeys([key]);

      const savedItems = [];
      const mainRecord = updatedDataSource.find((item) => item.key === key);
      if (mainRecord) {
        savedItems.push(`Main Record ${mainRecord.key}`);

        if (mainRecord.nestedData) {
          mainRecord.nestedData.forEach((nestedItem: { key: any }) => {
            savedItems.push(
              `Nested Record ${nestedItem.key} (Main Record ${mainRecord.key})`
            );
          });
        }
      }

      notification.success({
        message: "Data saved successfully.",
        description: `Saved items: ${savedItems.join(", ")}`,
      });
    } catch (error) {
      console.error("Save error:", error);
      notification.error({
        message: "Failed to save data. Please try again.",
        description: (error as Error).message,
      });
    }
  };

  const handleCancel = (key: React.Key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record.key === key) {
          const originalRecord = dataSource.find((item) => item.key === key);
          return {
            ...originalRecord!,
            isEditing: false,
            nestedData: originalRecord!.nestedData?.map((nestedItem) => ({
              ...nestedItem,
              isEditing: false,
            })),
          };
        }
        return record;
      })
    );

    setExpandedRowKeys((prevExpandedRowKeys) => {
      if (prevExpandedRowKeys.includes(key)) {
        return prevExpandedRowKeys;
      } else {
        return [...prevExpandedRowKeys, key];
      }
    });
  };

  const handleDelete = (
    nestedRecord: NestedDataType | undefined,
    mainRecord: TariffChargesDataType | undefined
  ) => {
    if (nestedRecord && mainRecord) {
      const updatedDataSource = dataSource.map((record) => {
        if (record.key === mainRecord.key) {
          const updatedNestedData = record.nestedData?.filter(
            (item) => item.key !== nestedRecord.key
          );
          return {
            ...record,
            nestedData: updatedNestedData,
          };
        }
        return record;
      });
      setDataSource(updatedDataSource);
    } else if (mainRecord) {
      const updatedDataSource = dataSource.filter(
        (record) => record.key !== mainRecord.key
      );
      setDataSource(updatedDataSource);
    }
  };

  const handleAddAdditionalRow = (recordKey: React.Key) => {
    const currentDate = new Date();
    const currentDateString = `${("0" + currentDate.getDate()).slice(-2)}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${currentDate.getFullYear()}`;

    const newData: NestedDataType = {
      key: generateUniqueKey(),
      status: "",
      block: null,
      rate: undefined,
      effectiveDate: "",
      isEditing: true,
      createdBy: "",
      createDate: currentDateString,
      modifiedBy: "",
      modifiedDate: "",
    };

    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.key === recordKey) {
          const updatedItem = {
            ...item,
            nestedData: item.nestedData
              ? [...item.nestedData, newData]
              : [newData],
          };
          return updatedItem;
        }
        return item;
      })
    );

    setExpandedRowKeys((prevExpandedRowKeys) => [
      ...prevExpandedRowKeys,
      recordKey,
    ]);
  };

  const generateUniqueKey = (): string => {
    const timestamp = new Date().getTime();
    return `new-row-${timestamp.toString()}`;
  };

  const renderText = (text: ReactNode) => {
    if (typeof text === "object" && text !== null) {
      if (text.hasOwnProperty("value") && text.hasOwnProperty("offset")) {
        const { value, offset } = text as unknown as {
          value: string;
          offset: number;
        };

        // Check if value is a string before calling split function
        if (typeof value === "string") {
          const dateArray = value.split("-");
          const date = new Date(
            +dateArray[0],
            +dateArray[1] - 1,
            +dateArray[2]
          );
          date.setMinutes(date.getMinutes() - offset);
          const adjustedDate = `${("0" + date.getDate()).slice(-2)}-${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)}-${date.getFullYear()}`;
          return adjustedDate;
        } else if (moment.isMoment(value)) {
          // If value is a moment object, return its string representation
          return (value as moment.Moment).format("DD-MM-YYYY");
        } else {
          // Return a default value or handle the non-string case
          return JSON.stringify(value);
        }
      }
      return JSON.stringify(text);
    }
    return <span style={{ color: theme.colorText }}>{text}</span>;
  };

  const columns: ProColumns<TariffChargesDataType>[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      valueType: "indexBorder",
    },
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
      width: "150",
      render: renderText,
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      width: "150",
      key: "tariffAbbreviation",
      render: renderText,
    },
    {
      title: "Effective Date (from)",
      dataIndex: "effectiveDate",
      width: "auto",

      key: "effectiveDate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "effectiveDate"]}
              initialValue={
                typeof text === "string" ? moment(text, "DD-MM-YYYY") : null
              }
              rules={[{ required: true }]}
            >
              <ProFormDatePicker disabled={!record.isEditing} />
            </Form.Item>
          );
        }
        return (
          <span style={{ color: theme.colorText }}>
            {text ? renderText(text) : ""}
          </span>
        );
      },
    },
    {
      title: "Minimum Monthly Charges",
      dataIndex: "monthlyMinimumCharges",
      width: "auto",
      key: "monthlyMinimumCharges",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "monthlyMinimumCharges"]}
              initialValue={text}
              rules={[{ required: true }]}
            >
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        }

        return <span style={{ color: theme.colorText }}>RM {text}</span>;
      },
    },
    {
      title: "Block Consumption 1",
      dataIndex: "blockConsumption1",
      valueType: "digitRange", // use 'digitRange' to enter two numbers
      width: "auto",
      render: (text: any, record: any) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "blockConsumption1"]}
              initialValue={record.blockConsumption1}
              rules={[
                { required: true },
                () => ({
                  validator(_, value) {
                    if (!value || value[0] < value[1]) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The start of the block must be less than the end!"
                      )
                    );
                  },
                }),
              ]}
            >
              <ProFormDigitRange
                fieldProps={{ precision: 0 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        } else {
          return (
            <span style={{ color: theme.colorText }}>
              {record.blockConsumption1 &&
                `${record.blockConsumption1[0]} - ${record.blockConsumption1[1]}m³`}
            </span>
          );
        }
      },
    },
    {
      title: "Rate 1",
      dataIndex: "rate1",
      key: "rate1",
      width: "auto",

      render: (text: any, record: any) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "rate1"]}
              initialValue={text}
              rules={[{ required: true }]}
            >
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        }

        return <span style={{ color: theme.colorText }}>RM {text}</span>;
      },
    },
    ...(showBlockConsumptionsRates
      ? [
          {
            title: "Block Consumption 2",
            dataIndex: "blockConsumption2",
            // valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "blockConsumption2"]}
                    initialValue={record.blockConsumption2}
                    rules={[
                      { required: true },
                      () => ({
                        validator(_, value) {
                          if (!value || value[0] < value[1]) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The start of the block must be less than the end!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <ProFormDigitRange
                      fieldProps={{ precision: 0 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              } else {
                return (
                  <span style={{ color: theme.colorText }}>
                    {record.blockConsumption2 &&
                      `${record.blockConsumption2[0]} - ${record.blockConsumption2[1]}m³`}
                  </span>
                );
              }
            },
          },
          {
            title: "Rate 2",
            dataIndex: "rate2",
            key: "rate2",
            width: "auto",

            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "rate2"]}
                    initialValue={text}
                    rules={[{ required: true }]}
                  >
                    <ProFormDigit
                      fieldProps={{ precision: 2 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              }

              return <span style={{ color: theme.colorText }}>RM {text}</span>;
            },
          },
          {
            title: "Block Consumption 3",
            dataIndex: "blockConsumption3",
            // valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "blockConsumption3"]}
                    initialValue={record.blockConsumption3}
                    rules={[
                      { required: true },
                      () => ({
                        validator(_, value) {
                          if (!value || value[0] < value[1]) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The start of the block must be less than the end!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <ProFormDigitRange
                      fieldProps={{ precision: 0 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              } else {
                return (
                  <span style={{ color: theme.colorText }}>
                    {record.blockConsumption3 &&
                      `${record.blockConsumption3[0]} - ${record.blockConsumption3[1]}m³`}
                  </span>
                );
              }
            },
          },
          {
            title: "Rate 3",
            dataIndex: "rate3",
            width: "auto",
            key: "rate3",
            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "rate3"]}
                    initialValue={text}
                    rules={[{ required: true }]}
                  >
                    <ProFormDigit
                      fieldProps={{ precision: 2 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              }

              return <span style={{ color: theme.colorText }}>RM {text}</span>;
            },
          },
          {
            title: "Block Consumption 4",
            dataIndex: "blockConsumption4",
            // valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "blockConsumption4"]}
                    initialValue={record.blockConsumption4}
                    rules={[
                      { required: true },
                      () => ({
                        validator(_, value) {
                          if (!value || value[0] < value[1]) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The start of the block must be less than the end!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <ProFormDigitRange
                      fieldProps={{ precision: 0 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              } else {
                return (
                  <span style={{ color: theme.colorText }}>
                    {record.blockConsumption4 &&
                      `${record.blockConsumption4[0]} - ${record.blockConsumption4[1]}m³`}
                  </span>
                );
              }
            },
          },
          {
            title: "Rate 4",
            dataIndex: "rate4",
            key: "rate4",
            width: "auto",

            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "rate4"]}
                    initialValue={text}
                    rules={[{ required: true }]}
                  >
                    <ProFormDigit
                      fieldProps={{ precision: 2 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              }

              return <span style={{ color: theme.colorText }}>RM {text}</span>;
            },
          },
          {
            title: "Block Consumption 5",
            dataIndex: "blockConsumption5",
            // valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "blockConsumption5"]}
                    initialValue={record.blockConsumption5}
                    rules={[
                      { required: true },
                      () => ({
                        validator(_, value) {
                          if (!value || value[0] < value[1]) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The start of the block must be less than the end!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <ProFormDigitRange
                      fieldProps={{ precision: 0 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              } else {
                return (
                  <span style={{ color: theme.colorText }}>
                    {record.blockConsumption5 &&
                      `${record.blockConsumption5[0]} - ${record.blockConsumption5[1]}m³`}
                  </span>
                );
              }
            },
          },
          {
            title: "Rate 5",
            dataIndex: "rate5",
            key: "rate5",
            width: "auto",

            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "rate5"]}
                    initialValue={text}
                    rules={[{ required: true }]}
                  >
                    <ProFormDigit
                      fieldProps={{ precision: 2 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              }

              return <span style={{ color: theme.colorText }}>RM {text}</span>;
            },
          },
          {
            title: "Block Consumption 6",
            dataIndex: "blockConsumption6",
            // valueType: "digitRange", // use 'digitRange' to enter two numbers
            width: "auto",
            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "blockConsumption6"]}
                    initialValue={record.blockConsumption6}
                    rules={[
                      { required: true },
                      () => ({
                        validator(_, value) {
                          if (!value || value[0] < value[1]) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The start of the block must be less than the end!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <ProFormDigitRange
                      fieldProps={{ precision: 0 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              } else {
                return (
                  <span style={{ color: theme.colorText }}>
                    {record.blockConsumption6 &&
                      `${record.blockConsumption6[0]} - ${record.blockConsumption6[1]}m³`}
                  </span>
                );
              }
            },
          },
          {
            title: "Rate 6",
            dataIndex: "rate6",
            width: "auto",

            key: "rate6",
            render: (text: any, record: any) => {
              if (record.isEditing) {
                return (
                  <Form.Item
                    name={[record.key, "rate6"]}
                    initialValue={text}
                    rules={[{ required: true }]}
                  >
                    <ProFormDigit
                      fieldProps={{ precision: 2 }}
                      disabled={!record.isEditing}
                    />
                  </Form.Item>
                );
              }

              return <span style={{ color: theme.colorText }}>RM {text}</span>;
            },
          },
        ]
      : []),

    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            width: "150",
            key: "createdBy",
            render: renderText,
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            width: "150",
            key: "createDate",
            render: renderText,
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            width: "150",
            key: "modifiedBy",
            render: renderText,
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            width: "150",
            key: "modifiedDate",
            render: renderText,
          },
        ]
      : []),
    {
      title: (
        <div
          style={{
            fontWeight: "bold",
            height: "100%",
            width: "89%",
            background: "rgba(30, 30, 37, 0.2)", // Semi-transparent overlay color for the blur effect
            zIndex: 1,
            borderRadius: 0,
            padding: "16 16",
            right: 0,
            margin: -7, // Ensure the overlay is behind the content
            backdropFilter: "blur(15px)", // Use backdrop-filter for modern browsers that support it
          }}
        >
          &nbsp; Actions &nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </div>
      ),
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        const hasNestedRecords =
          record.nestedData && record.nestedData.length > 0;

        if (record.isEditing) {
          return (
            <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
              <Button type="primary" onClick={() => handleSave(record.key)}>
                Save
              </Button>
              <Button onClick={() => handleCancel(record.key)}>Cancel</Button>
              {hasNestedRecords && (
                <Button
                  type="primary"
                  onClick={() => handleAddAdditionalRow(record.key)}
                >
                  Add Additional Row
                </Button>
              )}
            </Space>
          );
        }

        return (
          <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
            {hasNestedRecords && (
              <Button
                type="primary"
                onClick={() =>
                  handleEdit(record.key, record as TariffChargesDataType)
                }
              >
                Edit
              </Button>
            )}
            {hasNestedRecords && (
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  handleDelete(undefined, record as TariffChargesDataType)
                }
              >
                Delete
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      valueType: "indexBorder",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderText,
    },
    // Block column
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[`${record.key}`, "block"]} // corrected here
              initialValue={record.block}
              rules={[
                { required: true },
                () => ({
                  validator(_, value) {
                    if (!value || value[0] < value[1]) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "reminder: the start of the block must be less than the end."
                      )
                    );
                  },
                }),
              ]}
            >
              <ProFormDigitRange
                fieldProps={{ precision: 0 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        } else {
          return (
            <span style={{ color: theme.colorText }}>
              {record.block ? `${record.block[0]} - ${record.block[1]}m³` : ""}
            </span>
          );
        }
      },
    },
    {
      title: "Rate",
      dataIndex: "rate5",
      key: "rate5",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "rate5"]}
              initialValue={text}
              rules={[{ required: true }]}
            >
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        }

        return <span style={{ color: theme.colorText }}>RM {text}</span>;
      },
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            render: renderText,
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: renderText,
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            render: renderText,
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            render: renderText,
          },
        ]
      : []),
  ];

  return (
    <>
      <Form form={formRef.current}>
        <ProTable<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          rowKey="key"
          search={false}
          scroll={{ x: "max-content" }}
          headerTitle={
            <span
              style={{
                fontFamily: theme.fontFamily,
              }}
            >
              Tariff Charges Maintenance
            </span>
          }
          toolbar={{
            actions: [
              <Checkbox
                key="toggleBlockConsumptionsRates"
                checked={showBlockConsumptionsRates}
                onChange={(e) =>
                  handleToggleColumns(
                    e.target.checked,
                    "blockConsumptionsRates"
                  )
                }
              >
                Show Block Consumptions and Rates
              </Checkbox>,
              <Checkbox
                key="toggleAdditionalColumns"
                checked={showAdditionalColumns}
                onChange={(e) =>
                  handleToggleColumns(e.target.checked, "additionalColumns")
                }
              >
                Show Additional Columns
              </Checkbox>,
            ],
          }}
          expandable={{
            expandedRowKeys,
            onExpandedRowsChange: (expandedRows) => {
              setExpandedRowKeys(expandedRows as React.Key[]);
            },
            expandedRowRender: (record) => {
              const nestedData = record.nestedData || [];

              return (
                <Form form={nestedFormRef.current}>
                  <ProTable<NestedDataType>
                    columns={[
                      {
                        title: "No.",
                        dataIndex: "no",
                        key: "no",
                        valueType: "indexBorder",
                      },
                      {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: renderText,
                      },
                      // Block column
                      {
                        title: "Block",
                        dataIndex: "block",
                        key: "block",
                        render: (text, nestedRecord) => {
                          if (nestedRecord.isEditing) {
                            return (
                              <Form.Item
                                name={[
                                  `${record.key}-${nestedRecord.key}`,
                                  "block",
                                ]}
                                initialValue={nestedRecord.block}
                                rules={[
                                  { required: true },
                                  () => ({
                                    validator(_, value) {
                                      if (!value || value[0] < value[1]) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(
                                        new Error(
                                          "The start of the block must be less than the end!"
                                        )
                                      );
                                    },
                                  }),
                                ]}
                              >
                                <ProFormDigitRange
                                  fieldProps={{ precision: 0 }}
                                  disabled={!nestedRecord.isEditing}
                                />
                              </Form.Item>
                            );
                          } else {
                            return (
                              <span style={{ color: theme.colorText }}>
                                {nestedRecord.block
                                  ? `${nestedRecord.block[0]} - ${nestedRecord.block[1]}m³`
                                  : ""}
                              </span>
                            );
                          }
                        },
                      },
                      // Rate column
                      {
                        title: "Rate",
                        dataIndex: "rate5",
                        key: "rate5",
                        render: (text, record) => {
                          if (record.isEditing) {
                            return (
                              <Form.Item
                                name={[record.key, "rate5"]}
                                initialValue={text}
                                rules={[{ required: true }]}
                              >
                                <ProFormDigit
                                  fieldProps={{ precision: 2 }}
                                  disabled={!record.isEditing}
                                />
                              </Form.Item>
                            );
                          }

                          return (
                            console.log(record),
                            (
                              <span style={{ color: theme.colorText }}>
                                RM {record.rate}
                              </span>
                            )
                          );
                        },
                      },

                      {
                        title: "Effective Date (from)",
                        dataIndex: "effectiveDate",
                        key: "effectiveDate",
                        render: renderText,
                      },
                      {
                        title: "Created By",
                        dataIndex: "createdBy",
                        key: "createdBy",
                        render: renderText,
                      },
                      {
                        title: "Create Date",
                        dataIndex: "createDate",
                        key: "createDate",
                        render: renderText,
                      },
                      {
                        title: "Modified By",
                        dataIndex: "modifiedBy",
                        key: "modifiedBy",
                        render: renderText,
                      },
                      {
                        title: "Modified Date",
                        dataIndex: "modifiedDate",
                        key: "modifiedDate",
                        render: renderText,
                      },
                    ]}
                    dataSource={nestedData}
                    rowKey="key"
                    search={false}
                    pagination={false}
                    editable={{
                      type: "multiple",
                    }}
                  />
                </Form>
              );
            },
            rowExpandable: () => true,
          }}
          bordered={true}
        />
      </Form>
    </>
  );
};

export default TariffChargesMaintenance;
