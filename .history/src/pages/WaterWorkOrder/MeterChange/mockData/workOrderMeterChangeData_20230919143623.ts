// mock_data/workOrderData.ts

export const workOrderMeterChangeData = {
  issueWorkOrder: {
    accounts: [
      {
        accountNo: "ACC123",
        accountStatus: "Active",
        tariff: "T1",
        consumerType: "Residential",
        name: "John Doe",
        bookNo: "BK001",
        accountType: "Standard",
        arrears: 0,
        address: "123 Main St, City, State",
        meterNo: "MTR123",
        meterStatus: "Active",
        lastControlReading: "50",
        lastActualReading: "55",
        lastReadCode: "R1",
        replacedMeterConsumption: "5",
        meterFaulty: false,
        workOrderType: "Type1",
        workOrderDate: "2023-09-15",
        workOrderIssueBy: "Admin",
        workOrderNo: "WO123",
        printWorkOrder: false,
        workOrderStatus: "New",
        scheduleStartDate: "2023-09-16",
        scheduleEndDate: "2023-09-17",
        scheduleStartTime: "09:00",
        workOrderRemark: "Initial issue",
        departmentInCharge: "Dept1",
        assignTo: "Team1",
        meterRemark: "Working",
      },
    ],
    workOrderTypes: ["Type1", "Type2", "Type3"],
  },
  completeWorkOrder: {
    accounts: [
      {
        accountNo: "ACC123",
        completionDate: "2023-09-17",
        completionRemark: "Job done",
        completionStatus: "Completed",
        // ...other fields from issueWorkOrder can also be here
      },
    ],
    workOrderTypes: ["Type1", "Type2", "Type3"],
  },
  cancelWorkOrder: {
    accounts: [
      {
        accountNo: "ACC123",
        cancelDate: "2023-09-16",
        cancelReason: "Customer request",
        // ...other fields from issueWorkOrder can also be here
      },
    ],
    workOrderTypes: ["Type1", "Type2", "Type3"],
  },
};
