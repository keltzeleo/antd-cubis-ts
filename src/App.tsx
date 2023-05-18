import {
  BellOutlined,
  GlobalOutlined,
  GoldOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  FloatButton,
  Input,
  Menu,
  Segmented,
  Space,
  Tag,
} from "antd";
import { useState } from "react";
import "./App.css";
import defaultProps from "./_defaultProps";
import "./styling/breadcrumb.css";

const { Item } = Menu;

const App: React.FC = () => {
  const [tagColor, setTagColor] = useState("blue"); // Dynamic tag color
  const [tagIndication, setTagIndication] = useState(
    "indicator for requester group"
  ); // Dynamic tag indication

  // Function to handle an event and update the tag color and indication
  const handleEvent = () => {
    // Example: On event occurrence, update the tag color and indication
    setTagColor("red");
    setTagIndication("New Indication");
  };

  return (
    <div>
      <ProLayout
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
        <div className="header-essentials">
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
                <span className="font-play-header">NEW APPLICATION SYSTEM</span>

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
            src: "https://xsgames.co/randomusers/avatar.php?g=pixel",
            alt: "Avatar",
          }}
          extraContent={[]}
          footer={[
            <Button key="3">Clear</Button>,
            <Button key="2" type="primary">
              Submit
            </Button>,
          ]}
        >
          <>
            <Space direction="vertical">
              This is Space
              <Segmented
                className="font-Mulish"
                options={[
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                        <div>New Water Supply</div>
                      </div>
                    ),
                    value: "newWaterSupply",
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar style={{ backgroundColor: "#f99ba5" }}>
                          AT
                        </Avatar>
                        <div>Account Transfer</div>
                      </div>
                    ),
                    value: "accountTransfer",
                  },
                  {
                    label: (
                      <div style={{ padding: "4px 4px" }}>
                        <Avatar
                          style={{ backgroundColor: "#76b2c6" }}
                          icon={<UserOutlined />}
                        />
                        <div>Temporary Supply</div>
                      </div>
                    ),
                    value: "tempSup",
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar style={{ backgroundColor: "#ffc99d" }}>
                          CT
                        </Avatar>
                        <div>Change of Tenancy</div>
                      </div>
                    ),
                    value: "cof",
                  },
                ]}
              />
            </Space>
          </>
          <>
            <FloatButton.Group
              shape="circle"
              style={{ right: 24, bottom: 100 }}
            >
              <FloatButton icon={<QuestionCircleOutlined />} />
              <FloatButton icon={<SearchOutlined />} />
              <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>
          </>
          <ProCard style={{ background: "#00a991" }}>This is ProCard</ProCard>
          <ProCard direction="column" ghost gutter={[0, 16]}>
            <ProCard style={{ height: 200 }} />
            <ProCard gutter={16} ghost>
              <ProCard colSpan={16} style={{ height: 800 }} />
              <ProCard colSpan={8} style={{ height: 200 }} />
            </ProCard>
            <ProCard gutter={16} ghost>
              <ProCard colSpan={8} style={{ height: 200 }} />
              <ProCard colSpan={16} style={{ height: 200 }} />
            </ProCard>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default App;
