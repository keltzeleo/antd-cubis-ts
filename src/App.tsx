import {
  BellOutlined,
  GlobalOutlined,
  GoldOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import {
  Avatar,
  Badge,
  Button,
  ConfigProvider,
  Dropdown,
  FloatButton,
  Input,
  Menu,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import "./App.css";
import defaultProps from "./_defaultProps";
import "./styling/breadcrumb.css";

import MyForm from "./pages/MyForm";
import light from "./tokens/light.json";

const { Item } = Menu;
const { Title } = Typography;

const App: React.FC = () => {
  const [tagColor, setTagColor] = useState("green"); // Dynamic tag color
  const [tagIndication, setTagIndication] = useState("for Residential"); // Dynamic tag indication

  // Function to handle an event and update the tag color and indication
  const handleEvent = () => {
    // Example: On event occurrence, update the tag color and indication
    setTagColor("light.red");
    setTagIndication("for Commercial");
  };

  return (
    <ConfigProvider theme={{ token: light }}>
      <div>
        <ProLayout
          siderWidth={264}
          hasSider
          token={{
            colorBgAppListIconHover: "#00a991",
            colorTextAppListIconHover: "rgba(255,255,255,0.95)",
            colorTextAppListIcon: "rgba(255,255,255,0.85)",

            sider: {
              colorBgCollapsedButton: "#fff",
              colorTextCollapsedButtonHover: "#00a991",
              colorTextCollapsedButton: "rgba(0,0,0,0.45)",
              colorMenuBackground: "#43474f",
              colorBgMenuItemCollapsedElevated: "rgba(0,0,0,0.85)",
              colorMenuItemDivider: "rgba(255,255,255,0.15)",
              colorBgMenuItemHover: "#00a991",
              colorBgMenuItemSelected: "#00a991",
              colorTextMenuSelected: "#fff",
              colorTextMenuItemHover: "#00a991",
              colorTextMenu: "rgba(255,255,255,0.75)",
              colorTextMenuSecondary: "rgba(255,255,255,0.65)",
              colorTextMenuTitle: "rgba(255,255,255,0.95)",
              colorTextMenuActive: "#00a991",
              colorTextSubMenuSelected: "#fff",
            },
          }}
          {...defaultProps}
        >
          <div style={{ background: "#fff" }} className="header-essentials">
            <div className="steady-alignment">
              <Avatar
                size={32}
                src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
              />
              <span style={{ paddingLeft: 10 }} className="font-Mulish">
                Good Morning 🌞John Huang. Usaha Tangga Kejayaan 🎉
              </span>
            </div>
            <Menu
              className="steady-alignment"
              mode="horizontal"
              selectedKeys={["search"]}
            >
              <Item key="search">
                <Input.Search
                  placeholder="Search within the web application"
                  bordered={true}
                />
              </Item>
              <Item key="locale">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="my">Bahasa</Menu.Item>
                      <Menu.Item key="en">English</Menu.Item>
                      <Menu.Item key="zh">中文</Menu.Item>
                    </Menu>
                  }
                >
                  <span>
                    <GlobalOutlined style={{ marginRight: 4 }} /> Bahasa
                  </span>
                </Dropdown>
              </Item>
              <Item key="notification">
                <Badge dot>
                  <BellOutlined />
                </Badge>
              </Item>
              <Item key="logout">
                <Button icon={<LogoutOutlined />} size="small">
                  Logout
                </Button>
              </Item>
            </Menu>
          </div>

          <PageContainer
            fixedHeader
            style={{ top: 20, zIndex: 1, background: "" }}
            header={{
              title: (
                <>
                  <span className="font-play-header">
                    NEW APPLICATION SYSTEM
                  </span>

                  <Tag
                    className="font-Mulish"
                    style={{ marginLeft: "8px" }}
                    color={tagColor}
                  >
                    {tagIndication}
                  </Tag>
                  <br />
                  <span
                    className="font-play-header02"
                    style={{
                      background: "#d1e8e1",
                      padding: "4px 16px",
                      borderRadius: "4px",
                    }}
                  >
                    New Request • NEW WATER SUPPLY
                  </span>
                </>
              ),
              breadcrumb: {
                items: [
                  {
                    path: "",
                    title: <GoldOutlined />,
                    className: "breadcrumb-item",
                  },
                  {
                    path: "",
                    title: " New Request ",
                    className: "breadcrumb-item",
                  },
                  {
                    path: "",
                    title: " Appointments Updates ",
                    className: "breadcrumb-item",
                  },
                  {
                    path: "",
                    title: " Appointments Updates ",
                    className: "breadcrumb-item",
                  },
                ],
              },
            }}
            avatar={{
              style: {
                backgroundColor: "#00a991",
                width: "48px",
                height: "48px",
                padding: "4px",
              },
              src: "./icons/icon_NewSupplyManagement.png",
              alt: "Avatar",
            }}
            extraContent={[]}
            /* Kel:- the below footer is being disabled because of component ProForm below has already used
          FooterToolbar to replace it*/
            /*  footer={[
            <Button key="3">Clear</Button>,
            <Button key="2" type="primary">
              Submit
            </Button>,
          ]}*/
          >
            <FloatButton.Group
              shape="circle"
              style={{ right: 24, bottom: 100 }}
            >
              <FloatButton icon={<QuestionCircleOutlined />} />
              <FloatButton icon={<SearchOutlined />} />
              <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>

            <ProCard
              className="font-Mulish"
              style={{ background: "#00a991", color: "#fff" }}
            >
              This is ProCard: For Customer who wants to apply water supply in
              new location, document and plumber enquiries.
            </ProCard>
            <div style={{ marginTop: "32px" }} />
            <MyForm />
          </PageContainer>
        </ProLayout>
      </div>
    </ConfigProvider>
  );
};

export default App;
