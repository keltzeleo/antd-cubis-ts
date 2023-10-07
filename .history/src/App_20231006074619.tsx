import React, { useEffect, useState } from "react";

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
  Switch,
  Typography,
} from "antd";

import "./App.css";
import defaultProps from "./_defaultProps";
import "./styling/breadcrumb.css";

import MyForm from "./pages/MyForm";
// import MyFormDummy from "./pages/MyFormDummy";
import WaterWorkOrderMeterChange from "./pages/WaterWorkOrder/MeterChange/WaterWorkOrderMeterChange";
import dark from "./tokens/dark.json";
import light from "./tokens/light.json";

interface Theme {
  [key: string]: string;
}

interface AppProps {
  theme: Theme;
}

const { Item } = Menu;
const { Title } = Typography;

const App: React.FC<AppProps> = (theme) => {
  const [tagColor, setTagColor] = useState("green");
  const [tagIndication, setTagIndication] = useState("for Residential");
  const [isResidential, setIsResidential] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [token, setToken] = useState<Theme>(light);

  useEffect(() => {
    document.body.style.backgroundColor = token.colorBgBase;
  }, [token]);

  const handleEvent = () => {
    setTagColor("light.red");
    setTagIndication("for Commercial");
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsResidential(checked);
  };

  const handleThemeChange = () => {
    setToken(isDarkMode ? { ...light } : { ...dark });

    setIsDarkMode(!isDarkMode);
  };

  return (
    <ConfigProvider theme={{ token }}>
      <div>
        <ProLayout
          siderWidth={264}
          // hasSider
          token={{
            colorBgAppListIconHover: "#00a991",
            colorTextAppListIconHover: "rgba(255,255,255,0.95)",
            colorTextAppListIcon: "rgba(255,255,255,0.85)",
            sider: {
              colorBgCollapsedButton: "#fff",
              colorTextCollapsedButtonHover: "#00a991",
              colorTextCollapsedButton: "rgba(0,0,0,0.45)",
              colorMenuBackground: "#464a53",
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
          <div
            style={{ backgroundColor: "theme.colorPrimary" }}
            className="header-essentials"
          >
            <div className="steady-alignment">
              <Avatar
                size={36}
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
                  <span
                    className="font-play-header"
                    style={{ marginRight: "8px" }}
                  >
                    NEW APPLICATION SYSTEM
                  </span>
                  {/* Replace the Tag component with a customized Switch */}
                  <Switch
                    style={{
                      height: "auto",
                      padding: " 1px 10px 1px 4px",
                      margin: "0px 8px 8px 8px",
                      fontFamily: "",
                      fontWeight: "bold",
                      backgroundColor: isResidential
                        ? light["green"]
                        : light["orange"], // Increase the font size here
                    }}
                    checkedChildren={
                      <span style={{ fontSize: "52px" }}>Residential</span>
                    }
                    unCheckedChildren={
                      <span style={{ fontSize: "52px" }}>Commercial</span>
                    }
                    checked={isResidential}
                    onChange={handleSwitchChange}
                  />

                  <br />
                  <span
                    className="font-play-header02"
                    style={{
                      background: "#d1e8e1",
                      padding: "4px 16px",
                      borderRadius: "8px",
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
                    title: (
                      <>
                        <GoldOutlined />
                        <span> Dashboard </span>
                      </>
                    ),

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
              className="fontMulish"
              style={{
                background: "#00a991",
                color: "#fff",
                fontWeight: "bold",
              }}
              // eslint-disable-next-line react/jsx-no-comment-textnodes
            >
              <span>
                /// /// //// &nbsp; &nbsp;For Customer who wants to apply water
                supply in new location, document and plumber enquiries.{" "}
              </span>
            </ProCard>
            <div style={{ marginTop: "32px" }} />

            {/* Render the appropriate form based on the switch's value */}
            {isResidential ? (
              <MyForm />
            ) : (
              <WaterWorkOrderMeterChange theme={light} />
            )}
          </PageContainer>
        </ProLayout>
      </div>
    </ConfigProvider>
  );
};

export default App;
