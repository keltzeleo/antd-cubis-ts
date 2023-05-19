import {
  BellOutlined,
  GlobalOutlined,
  GoldOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProLayout,
} from "@ant-design/pro-components";
import { ProForm, ProFormText } from "@ant-design/pro-form";
import {
  Avatar,
  Badge,
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  FloatButton,
  Input,
  Menu,
  Segmented,
  Space,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import "./App.css";
import defaultProps from "./_defaultProps";
import "./styling/breadcrumb.css";

const { Item } = Menu;
const { Title } = Typography;

const App: React.FC = () => {
  const [tagColor, setTagColor] = useState("cyan"); // Dynamic tag color
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00a991",
          colorWarning: "#ffaa64",
          colorSuccess: "#7fb86d",
          colorError: "#ea7480",
          colorInfo: "#326BC8",
          colorTextBase: "#0d0c0d",
          borderRadius: 8,
          colorBgLayout: "#f3f0f3",
          colorBgContainer: "#fff",
          blue1: "#e9ebf8",
          blue2: "#cedbf2",
          blue3: "#a7bfe7",
          blue4: "#7ea2dc",
          blue5: "#5786d2",
          blue6: "#326bc8",
          blue7: "#2b5baa",
          blue8: "#244c8e",
          blue9: "#1d3d72",
          blue10: "#16305a",
          purple1: "#f9f0ff",
          purple2: "#efdbff",
          purple3: "#d3adf7",
          purple4: "#b391d5",
          purple5: "#9d70c9",
          purple6: "#7a5da2",
          purple7: "#7345a1",
          purple8: "#603a86",
          purple9: "#4d2e6c",
          purple10: "#3d2455",
          cyan1: "#e6f6f4",
          cyan2: "#c2eae5",
          cyan3: "#91dad0",
          cyan4: "#5ec9ba",
          cyan5: "#2eb8a5",
          cyan6: "#00a991",
          cyan7: "#00907b",
          cyan8: "#007867",
          cyan9: "#006053",
          cyan10: "#004c41",
          green1: "#f2f8f0",
          green2: "#e0eedc",
          green3: "#c8e0c0",
          green4: "#aed2a3",
          green5: "#96c587",
          green6: "#7fb86d",
          green7: "#6c9c5d",
          green8: "#5a834d",
          green9: "#48693e",
          green10: "#395331",
          magenta1: "#f5eef2",
          magenta2: "#e7d7e0",
          magenta3: "#d5b7c7",
          magenta4: "#c196ad",
          magenta5: "#af7694",
          magenta6: "#9d587d",
          magenta7: "#854b6a",
          magenta8: "#6f3e59",
          magenta9: "#593247",
          magenta10: "#472838",
          red1: "#feeff1",
          red2: "#fdd9dd",
          red3: "#fbbbc2",
          red4: "#f99ba5",
          red5: "#f77d8a",
          red6: "#f56170",
          red7: "#d0525f",
          red8: "#ae4550",
          red9: "#8c3740",
          red10: "#6e2c32",
          orange1: "#fff7f0",
          orange2: "#ffebda",
          orange3: "#ffdabc",
          orange4: "#ffc99d",
          orange5: "#ffb980",
          orange6: "#ffaa64",
          orange7: "#d99155",
          orange8: "#b57947",
          orange9: "#916139",
          orange10: "#734c2d",
          yellow1: "#fcf9f3",
          yellow2: "#f9f1e1",
          yellow3: "#f4e6ca",
          yellow4: "#efdbb2",
          yellow5: "#ead09a",
          yellow6: "#e5c684",
          yellow7: "#c3a870",
          yellow8: "#a38d5e",
          yellow9: "#83714b",
          yellow10: "#67593b",
          volcano1: "#fef2f0",
          volcano2: "#fde0da",
          volcano3: "#fcc8bd",
          volcano4: "#faae9f",
          volcano5: "#f89582",
          volcano6: "#f77e66",
          volcano7: "#d26b57",
          volcano8: "#af5948",
          volcano9: "#8d483a",
          volcano10: "#6f392e",
          geekblue1: "#e9f3f6",
          geekblue2: "#cbe2e9",
          geekblue3: "#a2cbd8",
          geekblue4: "#76b2c6",
          geekblue5: "#4d9bb5",
          geekblue6: "#2685a5",
          geekblue7: "#20718c",
          geekblue8: "#1b5e75",
          geekblue9: "#164c5e",
          geekblue10: "#113c4a",
          lime1: "#ebfaf0",
          lime2: "#cef2db",
          lime3: "#a7e7bf",
          lime4: "#7edca2",
          lime5: "#57d286",
          lime6: "#32c86b",
          lime7: "#2baa5b",
          lime8: "#248e4c",
          lime9: "#1d723d",
          lime10: "#165a30",
          gold1: "#fffbe6",
          gold2: "#fff1b8",
          gold3: "#ffe58f",
          gold4: "#f2dc6f",
          gold5: "#ffd666",
          gold6: "#e0c126",
          gold7: "#9e860c",
          gold8: "#99810b",
          gold9: "#6b5b0c",
          gold10: "#574904",
        },
      }}
    >
      <div>
        <ProLayout
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
            <>
              <div className="component-wrapper">
                <div className="label font-Mulish">New Request Type:</div>
                <div className="segmented-wrapper">
                  <Space
                    direction="vertical"
                    className="font-Mulish space-wrapper"
                  >
                    <Segmented
                      className="font-Mulish"
                      options={[
                        {
                          label: (
                            <div style={{ padding: 4 }}>
                              <Avatar
                                style={{ backgroundColor: "#76b2c6" }}
                                src="./icons/icon_IndividualApplication.png"
                                /*Kel:- the icon folder is placed under public folder as I was having error while placing icons folder under src folder*/
                              >
                                NW
                              </Avatar>
                              <div>New Water Supply</div>
                            </div>
                          ),
                          value: "newWaterSupply",
                        },
                        {
                          label: (
                            <div
                              style={{ padding: 4 }}
                              className="space-wrapper"
                            >
                              <Avatar
                                style={{ backgroundColor: "#5ec9ba" }}
                                src="./icons/icon_accountTransfer.png"
                              >
                                AT
                              </Avatar>
                              <div>Account Transfer</div>
                            </div>
                          ),
                          value: "accountTransfer",
                        },
                        {
                          label: (
                            <div
                              style={{ padding: "4px 4px" }}
                              className="space-wrapper"
                            >
                              <Avatar
                                style={{ backgroundColor: "#d5b7c7" }}
                                icon={<UserOutlined />}
                              />
                              <div>Temporary Supply</div>
                            </div>
                          ),
                          value: "tempSup",
                        },
                        {
                          label: (
                            <div
                              style={{ padding: 4 }}
                              className="space-wrapper"
                            >
                              <Avatar
                                style={{ backgroundColor: "#ffc99d" }}
                                src="./icons/icon_changeOfTenancy.png"
                              >
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
                </div>
              </div>
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
            <ProCard
              className="font-Mulish"
              style={{ background: "#00a991", color: "#fff" }}
            >
              This is ProCard: For Customer who wants to apply water supply in
              new location, document and plumber enquiries.
            </ProCard>
            <Card style={{}}>
              <ProForm
                submitter={{
                  render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                }}
                onFinish={async (values) => console.log(values)}
              >
                <ProForm layout="vertical">
                  <ProCard split="vertical">
                    <ProCard colSpan="50%">
                      <ProCard title="Personal Information">
                        <ProForm.Item label="Name" name="name">
                          <ProFormText />
                        </ProForm.Item>
                        <ProForm.Item label="ID Number" name="idNumber">
                          <ProFormText />
                        </ProForm.Item>
                        <ProForm.Item label="Mobile Number" name="mobileNumber">
                          <ProFormText />
                        </ProForm.Item>
                      </ProCard>
                    </ProCard>
                    <ProCard colSpan="50%">
                      <ProCard title="Address">
                        <ProForm.Item label="Postcode" name="postcode">
                          <ProFormText />
                        </ProForm.Item>
                        <ProForm.Item label="City" name="city">
                          <ProFormText />
                        </ProForm.Item>
                        <ProForm.Item label="State" name="state">
                          <ProFormText />
                        </ProForm.Item>
                      </ProCard>
                    </ProCard>
                  </ProCard>
                </ProForm>
              </ProForm>
            </Card>
            <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost>
              <ProCard bordered layout="center">
                Auto
              </ProCard>
              <ProCard colSpan="50%" bordered>
                colSpan - 50%
              </ProCard>
            </ProCard>
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
    </ConfigProvider>
  );
};

export default App;
