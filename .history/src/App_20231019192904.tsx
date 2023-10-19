import React, { useEffect, useState } from "react";

import {
  GoldOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import {
  Avatar,
  ConfigProvider,
  FloatButton,
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
  const [selectedItem, setSelectedItem] = useState("issueNewWorkOrder");
  const [actionLabel, setActionLabel] = useState("Issue New Work Order"); // For the "New Request"
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState("");

  const handleSelectedWorkOrderChange = (value: string) => {
    setSelectedWorkOrderType(value.toUpperCase());
  };

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
            style={{
              marginTop: 10,
              backgroundColor: token["colorPrimaryBg"],
              color: "",
            }}
            className="header-essentials"
          >
            <div className="steady-alignment">
              <Avatar
                size={36}
                src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
              />
              <span
                style={{
                  marginTop: 0,
                  paddingLeft: 10,
                  color: token["colorText"],
                }}
                className="font-Mulish"
              >
                Good Morning 🌞John Huang. Usaha Tangga Kejayaan 🎉
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: 32,
                marginBottom: 0,
                marginTop: 0,
              }}
            >
              {/* <span style={{ marginRight: 10 }}>Light</span> */}
              <Switch
                checked={isDarkMode}
                onChange={handleThemeChange}
                unCheckedChildren={
                  <span
                    style={{
                      color: "white",
                      borderRadius: "50%",
                      padding: 2,
                      backgroundColor: "#ffffff",
                      verticalAlign: "middle", // Adjust vertical alignment
                      lineHeight: "0", // Set line height to 0 to remove any extra spacing
                      fontSize: "18px",
                      display: "inline-block", // Display as inline block to control icon's position
                      marginTop: "-10px", // Add margin to control spacing
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/tyappreg/image/upload/v1696508807/icon_sun_i1awlx.png"
                      alt="Sun"
                      style={{ width: "29px", height: "29px" }}
                    />
                  </span>
                }
                checkedChildren={
                  <span
                    style={{
                      color: "white",
                      borderRadius: "50%",
                      backgroundColor: "#121c1c",
                      verticalAlign: "middle", // Adjust vertical alignment
                      lineHeight: "0", // Set line height to 0 to remove any extra spacing
                      fontSize: "24px",
                      display: "inline-block", // Display as inline block to control icon's position
                      marginTop: "-2px",
                      padding: "4px", // Add margin to control spacing
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/tyappreg/image/upload/v1696508808/icon_moon_f4ambw.png"
                      alt="Moon"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </span>
                }
              />

              {/* <span style={{ marginLeft: 10 }}>Dark</span> */}
            </div>
          </div>
          <PageContainer>
            <div
              style={{
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                width: "120%",
                height: 120,
                marginLeft: -48,
                marginRight: -16,
                marginBottom: -16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12 16px",
                borderRadius: 8,
                backgroundColor: `${token["backgroundColor"]}10`, // Apply transparency to the background color
                backdropFilter: "blur(20px)", // Apply the blur filter
                zIndex: 88,
              }}
            >
              <div
                className="header-container"
                style={{ marginLeft: 12, marginTop: 8 }}
              >
                {/* Breadcrumb */}
                <div
                  className="breadcrumb-container"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div className="breadcrumb-item">
                    <GoldOutlined
                      style={{ color: "#666666", paddingLeft: "8px" }}
                    />
                    <span
                      style={{
                        color: "#666666",
                        paddingLeft: "8px",
                        paddingRight: "10px",
                        fontSize: 14,
                      }}
                    >
                      Dashboard
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        color: "#666666",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: 14,
                      }}
                    >
                      /
                    </span>
                  </div>
                  <div className="breadcrumb-item">
                    <span
                      style={{
                        color: "#666666",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      breadcrumb 00
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        color: "#666666",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: 14,
                      }}
                    >
                      /
                    </span>
                  </div>
                  <div className="breadcrumb-item">
                    <span
                      style={{
                        color: "#666666",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: 14,
                      }}
                    >
                      breadcrumb 01
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        color: "#666666",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: 14,
                      }}
                    >
                      /
                    </span>
                  </div>
                  <div className="breadcrumb-item">
                    <span
                      style={{
                        color: "#666666",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: 14,
                      }}
                    >
                      breadcrumb 02
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  {/* Avatar */}
                  <div className="avatar-container">
                    <img
                      style={{
                        backgroundColor: "#00a991",
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        paddingLeft: "8px",
                        paddingTop: "4px",
                        paddingBottom: "6px",
                        paddingRight: "0px",
                      }}
                      src="./icons/icon_WorkOrderManagement.png"
                      alt="Work Order Management Icon"
                    />
                  </div>

                  {/* Title */}
                  <div
                    className="title-container"
                    style={{ marginLeft: "16px" }}
                  >
                    <span
                      className="font-play-header"
                      style={{
                        marginRight: "8px",
                        fontWeight: "bold",
                        color: token["colorText"],
                      }}
                    >
                      Water Work Order Management
                    </span>
                    <br />
                    <div style={{ height: 4 }}></div>
                    <span
                      className="font-play-header02"
                      style={{
                        background: token["colorPrimaryBg"],
                        padding: "1px 16px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        top: 8,
                        color: token["colorText"],
                      }}
                    >
                      {actionLabel} • {selectedWorkOrderType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
                top: 20,
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
              <WaterWorkOrderMeterChange theme={token} />
            )}
          </PageContainer>
        </ProLayout>
      </div>
    </ConfigProvider>
  );
};

export default App;
