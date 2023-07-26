const renderFormContent = () => {
  switch (activeStep) {
    case 0:
      return (
        <StepsForm.StepForm
          name="base"
          title="Step 1"
          onFinish={async (values) => {
            setStepData({ ...stepData, ...values });
            await waitTime(2000);
            handleNextStep();
          }}
        >
          {/* Form content for Step 1 */}
          <ProFormText
            name="name"
            width="md"
            label="Migration Task Name"
            tooltip="Maximum 24 characters for unique identification"
            placeholder="Enter name"
            rules={[{ required: false }]}
          />
          <ProForm.Group title="Nodes" size={8}>
            <ProFormSelect
              width="sm"
              name="source"
              label="Source Node"
              placeholder="Select source node"
            />
            <ProFormSelect
              width="sm"
              name="target"
              label="Target Node"
              placeholder="Select target node"
            />
          </ProForm.Group>
        </StepsForm.StepForm>
      );
    case 1:
      return (
        <StepsForm.StepForm
          name="checkbox"
          title="Step 2"
          onFinish={async (values) => {
            setStepData({ ...stepData, ...values });
            await waitTime(2000);
            handleNextStep();
          }}
        >
          {/* Form content for Step 2 */}
          <ProFormCheckbox.Group
            name="checkbox"
            label="Migration Types"
            width="lg"
            options={[
              "Structure Migration",
              "Full Migration",
              "Incremental Migration",
              "Full Validation",
            ]}
          />
          <ProForm.Group>
            <ProFormText name="dbname" label="Business DB Username" />
            <ProFormDatePicker name="datetime" label="Record Save Time" width="sm" />
          </ProForm.Group>
          <ProFormCheckbox.Group
            name="checkbox"
            label="LOB Types"
            options={["Complete LOB", "Asynchronous LOB", "Restricted LOB"]}
          />
        </StepsForm.StepForm>
      );
    case 2:
      return (
        <StepsForm.StepForm
          name="time"
          title="Step 3"
          onFinish={async (values) => {
            setStepData({ ...stepData, ...values });
            await waitTime(2000);
            handleNextStep();
          }}
        >
          {/* Form content for Step 3 */}
          <ProFormCheckbox.Group
            name="checkbox"
            label="Deployment Units"
            rules={[
              {
                required: true,
              },
            ]}
            options={[
              "Deployment Unit 1",
              "Deployment Unit 2",
              "Deployment Unit 3",
            ]}
          />
          <ProFormSelect
            label="Deployment Group Strategy"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            initialValue="1"
            options={[
              {
                value: "1",
                label: "Strategy 1",
              },
              { value: "2", label: "Strategy 2" },
            ]}
          />
          <ProFormSelect
            label="Pod Scheduling Strategy"
            name="remark2"
            width="md"
            initialValue="2"
            options={[
              {
                value: "1",
                label: "Strategy 1",
              },
              { value: "2", label: "Strategy 2" },
            ]}
          />
        </StepsForm.StepForm>
      );
    case 3:
      return (
        <StepsForm.StepForm
          name="step4"
          title="Step 4"
          onFinish={async (values) => {
            setStepData({ ...stepData, ...values });
            await waitTime(2000);
            handleNextStep();
          }}
        >
          {/* Form content for Step 4 */}
          <ProForm.Group>
            <ProFormText
              name="step4Field1"
              label="Step 4 Field 1"
              placeholder="Enter Step 4 Field 1"
            />
            <ProFormDatePicker
              name="step4Field2"
              label="Step 4 Field 2"
              width="sm"
            />
          </ProForm.Group>
        </StepsForm.StepForm>
      );
    case 4:
      return (
        <StepsForm.StepForm
          name="step5"
          title="Step 5"
          onFinish={async (values) => {
            setStepData({ ...stepData, ...values });
            await waitTime(2000);
            message.success("All steps completed!");
          }}
        >
          {/* Form content for Step 5 */}
          <ProFormCheckbox.Group
            name="step5Checkbox"
            label="Step 5 Checkbox Group"
            options={["Option 1", "Option 2", "Option 3"]}
          />
          <ProFormSelect
            label="Step 5 Select"
            name="step5Select"
            width="md"
            initialValue="1"
            options={[
              {
                value: "1",
                label: "Option 1",
              },
              { value: "2", label: "Option 2" },
            ]}
          />
          <ProFormText
            name="step5Field"
            label="Step 5 Field"
            placeholder="Enter Step 5 Field"
          />
        </StepsForm.StepForm>
      );
    default:
      return null;