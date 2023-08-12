import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import "./LoginPage.css";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Received values of form: ", values);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="blur-border"></div> {/* Blurred border behind the form */}
      <div className="form-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/tyappreg/image/upload/v1682262051/logoCUBIS_r1dbxm.svg"
            alt="cUBIS Logo"
            className="logo"
          />{" "}
          {/* Logo Image */}
          <h1 className="brand-name">cUBIS</h1> {/* Brand Name */}
        </div>
        <div>
          <Title
            style={{
              border: "2px solid #00a991", // Added width (2px) and style (solid)
              height: 32,
              borderRadius: 16,
              paddingLeft: 16,
              width: 150,
              backgroundColor: "#00a991",
              color: "#f3f6f9",
            }}
            level={5}
          >
            .:: Login ::.
          </Title>
        </div>
        <Form name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              href="#"
              style={{ float: "right", textDecoration: "none", fontSize: 11 }}
            >
              {" "}
              <span
                style={{
                  borderBottom: "1px dotted #00a991",
                  transition: "borderColor 0.3s",
                }}
              >
                forgot password
              </span>
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
          <div>
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
