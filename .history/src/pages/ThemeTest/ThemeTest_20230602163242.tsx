import { generateTheme } from "@ant-design/dark-utils";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Layout, Menu } from "antd";
import React from "react";

const { Header, Content, Sider } = Layout;

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

const ThemeTest = () => {
  const customTheme = generateTheme({
    // Customize your theme here
    baseTheme: "dark",
    token: {
      colorBgBase: "#141c1b",
      colorTextBase: "#f3f3f3",
      colorPrimary: "#00a991",
      colorError: "#ea7480",
      colorSuccess: "#7fb86d",
      colorWarning: "#ffaa64",
      colorInfo: "#00a991",
      borderRadius: 8,
    },
  });

  return (
    <ConfigProvider theme={customTheme}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            {items1.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: customTheme.token.colorBgBase,
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
            >
              {items2.map((item) => (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>{child.label}</Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: customTheme.token.colorBgBase,
              }}
            >
              {/* Your content goes here */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ThemeTest;
