import React from "react";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Avatar, Dropdown, Input, Menu, Button, Badge } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  LogoutOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import defaultProps from "./_defaultProps";
import { FloatButton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./App.css";


const { Item } = Menu;

const App: React.FC = () => {
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
            colorBgMenuItemSelected: "rgba(0,0,0,0.15)",
            colorTextMenuSelected: "#fff",
            colorTextMenuItemHover: "rgba(255,255,255,0.75)",
            colorTextMenu: "rgba(255,255,255,0.75)",
            colorTextMenuSecondary: "rgba(255,255,255,0.65)",
            colorTextMenuTitle: "rgba(255,255,255,0.95)",
            colorTextMenuActive: "rgba(255,255,255,0.95)",
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
            <span>Good Morning 🌞John Huang. Usaha Tangga Kejayaan 🎉</span>
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
          style={{ top: 20 }}
          header={{
            title: "Page Title",
            breadcrumb: {},
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
