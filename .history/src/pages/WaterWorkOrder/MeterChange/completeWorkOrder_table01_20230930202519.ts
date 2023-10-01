const columns = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      width: "250",
    },
    {
      title: "Old Meter Information",
      dataIndex: "old",
      key: "old",
      width: "auto",
    },
    {
      title: "New Meter Information",
      dataIndex: "new",
      key: "new",
      width: "auto",
    },
  ];

  const dataSource = [
    {
      key: "1",
      label: "Meter Number",
      old: meterData.oldMeter.meterNumber,
      new: meterData.newMeter.meterNumber,
    },
    {
      key: "2",
      label: "Meter Status",
      old: meterData.oldMeter.meterStatus,
      new: meterData.newMeter.meterStatus,
    },
    {
      key: "3",
      label: "Reading",
      old: meterData.oldMeter.reading,
      new: meterData.newMeter.reading,
    },
    {
      key: "4",
      label: "Read Code",
      old: meterData.oldMeter.readCode,
      new: "N/A",
    },
    {
      key: "5",
      label: "Consumption",
      old: meterData.oldMeter.consumption,
      new: "N/A",
    },
    {
      key: "6",
      label: "Meter Faulty",
      old: meterData.oldMeter.meterFaulty,
      new: "N/A",
    },
    {
      key: "7",
      label: "Location",
      old: "N/A",
      new: meterData.newMeter.location,
    },
    {
      key: "8",
      label: "Brand",
      old: "N/A",
      new: meterData.newMeter.brand,
    },
    {
      key: "9",
      label: "Purchase Date",
      old: "N/A",
      new: meterData.newMeter.purchaseDate,
    },
    {
      key: "10",
      label: "Digit Dial Length",
      old: "N/A",
      new: meterData.newMeter.digitDialLength,
    },
    {
      key: "11",
      label: "Unit of Measurement",
      old: "N/A",
      new: meterData.newMeter.uom,
    },
  ];

