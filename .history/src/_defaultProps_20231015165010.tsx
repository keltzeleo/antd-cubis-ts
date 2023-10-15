import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";
import { Col, Row } from "antd";

const defaultProps = {
  title: "CUBIS by Powercomp",
  // logo: "https://res.cloudinary.com/tyappreg/image/upload/v1682262063/logoCUBIS_muwyol.svg",
  logo: "https://res.cloudinary.com/tyappreg/image/upload/v1693442076/logoCUBIS05_jxwhds.png",

  route: {
    path: "/",
    routes: [
      {
        path: "/welcome",
        name: "Dashboard",
        icon: <SmileFilled />,
        component: "./Welcome",
      },
      {
        path: "/admin",
        name: "管理页",
        icon: <CrownFilled />,
        access: "canAdmin",
        component: "./Admin",
        routes: [
          {
            path: "/admin/sub-page1",
            name: "一级页面",
            icon: "https://res.cloudinary.com/tyappreg/image/upload/v1682262063/logoCUBIS_muwyol.svg",
            component: "./Welcome",
          },
          {
            path: "/admin/sub-page2",
            name: "二级页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/admin/sub-page3",
            name: "三级页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
        ],
      },
      {
        name: "列表页",
        icon: <TabletFilled />,
        path: "/list",
        component: "./ListTableList",
        routes: [
          {
            path: "/list/sub-page",
            name: "列表页面",
            icon: <CrownFilled />,
            routes: [
              {
                path: "sub-sub-page1",
                name: "一一级列表页面",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
              {
                path: "sub-sub-page2",
                name: "一二级列表页面",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
              {
                path: "sub-sub-page3",
                name: "一三级列表页面",
                icon: <CrownFilled />,
                component: "./Welcome",
              },
            ],
          },
          {
            path: "/list/sub-page2",
            name: "二级列表页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/list/sub-page3",
            name: "三级列表页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
        ],
      },
      {
        path: "https://ant.design",
        name: "Ant Design 官网外链",
        icon: <ChromeFilled />,
      },
    ],
  },
  location: {
    pathname: "/",
  },
  appList: [
    {
      icon: "./icons/icon_NewSupplyManagement.png",
      title: "New Application System (NAPS)",
      desc: "Apply water supply in new location, plumber enquiries, e.t.c.",
      url: "https://ant.design",
    },
    {
      icon: "./icons/icon_BillingManagement.png",
      title: "Bill Management",
      desc: "Module for handling various Billing Cases",
      url: "https://antv.vision/",
      target: "_blank",
    },
    {
      icon: "./icons/icon_UserManagement.png",
      title: "User Management",
      desc: "Managing user permission and administration Right",
      url: "https://procomponents.ant.design/",
    },
    {
      icon: "./icons/icon_DepositManagement.png",
      title: "Deposit Management",
      desc: "Managing progress of Deposit Module",
      url: "https://umijs.org/zh-CN/docs",
    },

    {
      icon: "https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png",
      title: "qiankun",
      desc: "可能是你见过最完善的微前端解决方案🧐",
      url: "https://qiankun.umijs.org/",
    },
    {
      icon: "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
      title: "语雀",
      desc: "知识创作与分享工具",
      url: "https://www.yuque.com/",
    },
    {
      icon: "https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg",
      title: "Kitchen ",
      desc: "Sketch 工具集",
      url: "https://kitchen.alipay.com/",
    },
    {
      icon: "https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png",
      title: "dumi",
      desc: "为组件开发场景而生的文档工具",
      url: "https://d.umijs.org/zh-CN",
    },
  ],

  // Render appList in two columns
  appListRenderer: () => {
    const { appList } = defaultProps;

    // Calculate the number of columns per row (2 columns)
    const columnsPerRow = 2;

    // Group appList items into pairs for two columns each
    const pairedItems = [];
    for (let i = 0; i < appList.length; i += columnsPerRow) {
      const pair = appList.slice(i, i + columnsPerRow);
      pairedItems.push(pair);
    }

    return (
      <div>
        {pairedItems.map((pair, rowIndex) => (
          <Row key={rowIndex} gutter={[16, 16]}>
            {pair.map((item, itemIndex) => (
              <Col key={itemIndex} span={12}>
                {/* Render your appList item here */}
                <div>
                  <img src={item.icon} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <a href={item.url} target={item.target || "_self"}>
                    Learn More
                  </a>
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  },
};

export default defaultProps;
