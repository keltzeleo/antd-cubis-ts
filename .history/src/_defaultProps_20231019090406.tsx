import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";

const defaultProps = {
  title: "cUBIS by Powercomp",
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
      desc: "Water supply in new location, plumber enquiries, e.t.c.",
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
      icon: "./icons/icon_WorkOrderManagement.png",
      title: "Work Order Management",
      desc: "Assigning Work Order to Respective Department",
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
};

export default defaultProps;
