import {
  ClockCircleOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  Checkbox,
  Collapse,
  Input,
  Layout,
  Menu,
  Pagination,
  Radio,
  Segmented,
  Select,
  Space,
  Steps,
  Switch,
  Typography,
  theme,
} from "antd";
import { ClickParam } from "antd/lib/menu";
import React from "react";

import ThemeProvider, { useToken } from '../../theme/ThemeProvider';


const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;
const { Panel } = Collapse;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);

const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

const ThemeTest: React.FC = () => {
    const theme = useToken();


  const handleMenuClick = (param: ClickParam) => {
    console.log("Clicked:", param);
  };

  return (
    <ThemeProvider>
    <Menu onClick={handleMenuClick} theme={theme} mode="vertical">
      <Menu.Item key="1">Menu Item 1</Menu.Item>
      <Menu.Item key="2">Menu Item 2</Menu.Item>
      <Menu.Item key="3">Menu Item 3</Menu.Item>
    </Menu>
    <Button type="primary">Primary Button</Button>
  </ThemeProvider>
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          onClick={handleMenuClick}
        >
          {items1.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            onClick={handleMenuClick}
          >
            {items2.map((item) => (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>{child.label}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Space direction="vertical" size="large">
              <Space>
                <Button type="primary" size="large">
                  Primary Button
                </Button>
                <Button size="large">Default Button</Button>
                <Button type="dashed" size="large">
                  Dashed Button
                </Button>
                <Button type="text" size="large">
                  Text Button
                </Button>
                <Button type="link" size="large">
                  Link Button
                </Button>
              </Space>
              <Space>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
              </Space>
              <Space>
                <Button type="primary" size="small">
                  Primary Button
                </Button>
                <Button size="small">Default Button</Button>
                <Button type="dashed" size="small">
                  Dashed Button
                </Button>
                <Button type="text" size="small">
                  Text Button
                </Button>
                <Button type="link" size="small">
                  Link Button
                </Button>
              </Space>
              <div>
                <Typography>
                  <Title>Introduction</Title>
                  <Paragraph>
                    In the process of internal desktop applications development,
                    many different design specs and implementations would be
                    involved, which might cause designers and developers
                    difficulties and duplication and reduce the efficiency of
                    development.
                  </Paragraph>
                  <Paragraph>
                    After massive project practice and summaries, Ant Design, a
                    design language for background applications, is refined by
                    Ant UED Team, which aims to{" "}
                    <Text strong>
                      uniform the user interface specs for internal background
                      projects, lower the unnecessary cost of design differences
                      and implementation and liberate the resources of design
                      and front-end development
                    </Text>
                    .
                  </Paragraph>
                  <Title level={2}>Guidelines and Resources</Title>
                  <Paragraph>
                    We supply a series of design principles, to help people
                    create their product prototypes beautifully and efficiently.
                  </Paragraph>
                </Typography>
              </div>
              <div>
                <Pagination defaultCurrent={1} total={50} />
              </div>
              <div>
                <Steps current={1}>
                  <Step title="Finished" description="This is a description." />
                  <Step
                    title="In Progress"
                    description="This is a description."
                  />
                  <Step title="Waiting" description="This is a description." />
                </Steps>
              </div>
              <div>
                <Space>
                  <Checkbox>Checkbox</Checkbox>
                  <Radio>Radio</Radio>
                  <Space size="large">
                    <Switch defaultChecked />
                    <Switch size="small" defaultChecked />
                  </Space>
                </Space>
              </div>
              <div>
                <Segmented
                  options={[
                    "Daily",
                    "Weekly",
                    "Monthly",
                    "Quarterly",
                    "Yearly",
                  ]}
                />
              </div>
              <div>
                <Space direction="vertical">
                  <Input
                    size="large"
                    placeholder="large size"
                    prefix={<UserOutlined />}
                  />
                  <Input placeholder="default size" prefix={<UserOutlined />} />
                  <Input
                    size="small"
                    placeholder="small size"
                    prefix={<UserOutlined />}
                  />
                  <Input
                    addonBefore="http://"
                    addonAfter=".com"
                    defaultValue="mysite"
                  />
                  <Input
                    addonBefore={selectBefore}
                    addonAfter={selectAfter}
                    defaultValue="mysite"
                  />
                  <Input
                    addonAfter={<SettingOutlined />}
                    defaultValue="mysite"
                  />
                  <Input
                    addonBefore="http://"
                    suffix=".com"
                    defaultValue="mysite"
                  />
                  <Input status="error" placeholder="Error" />
                  <Input status="warning" placeholder="Warning" />
                  <Input
                    status="error"
                    prefix={<ClockCircleOutlined />}
                    placeholder="Error with prefix"
                  />
                  <Input
                    status="warning"
                    prefix={<ClockCircleOutlined />}
                    placeholder="Warning with prefix"
                  />
                </Space>
              </div>
              <div>
                <Space direction="vertical">
                  <Alert message="Success Tips" type="success" showIcon />
                  <Alert message="Informational Notes" type="info" showIcon />
                  <Alert message="Warning" type="warning" showIcon closable />
                  <Alert message="Error" type="error" showIcon />
                  <Alert
                    message="Success Tips"
                    description="Detailed description and advice about successful copywriting."
                    type="success"
                    showIcon
                  />
                  <Alert
                    message="Informational Notes"
                    description="Additional description and information about copywriting."
                    type="info"
                    showIcon
                  />
                  <Alert
                    message="Warning"
                    description="This is a warning notice about copywriting."
                    type="warning"
                    showIcon
                    closable
                  />
                  <Alert
                    message="Error"
                    description="This is an error message about copywriting."
                    type="error"
                    showIcon
                  />
                </Space>
              </div>
              <div>
                <Collapse defaultActiveKey={["1"]}>
                  <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                  </Panel>
                  <Panel header="This is panel header 2" key="2">
                    <p>{text}</p>
                  </Panel>
                  <Panel header="This is panel header 3" key="3">
                    <p>{text}</p>
                  </Panel>
                </Collapse>
              </div>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ThemeTest;
