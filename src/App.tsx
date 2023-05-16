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
  Dropdown,
  FloatButton,
  Input,
  Menu,
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
            colorTextMenuItemHover: "rgba(255,255,255,0.75)",
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
          style={{ top: 20, zIndex: 1 }}
          header={{
            title: (
              <>
                <span className="font-play">NEW APPLICATION REQUEST</span>
                <Tag
                  className="font-Mulish"
                  style={{ marginLeft: "8px" }}
                  color={tagColor}
                >
                  {tagIndication}
                </Tag>
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
            src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
            alt: "Avatar",
          }}
          tabList={[
            {
              tab: "已选择",
              key: "1",
            },
            {
              tab: "可点击",
              key: "2",
            },
            {
              tab: "禁用",
              key: "3",
              disabled: true,
            },
          ]}
          footer={[
            <Button key="3">Clear</Button>,
            <Button key="2" type="primary">
              Submit
            </Button>,
          ]}
        >
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
