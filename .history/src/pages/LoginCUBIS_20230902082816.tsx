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
            src="https://res.cloudinary.com/tyappreg/image/upload/v1693614448/logoCUBIS06_umw0zx.png"
            //src="https://res.cloudinary.com/tyappreg/image/upload/v1693442076/logoCUBIS05_jxwhds.png"
            //src="https://res.cloudinary.com/tyappreg/image/upload/v1692191404/logoCUBIS04_joezug.png"
            // src="https://res.cloudinary.com/tyappreg/image/upload/v1692092892/logoCUBIS02_gnu3od.png"
            alt="cUBIS Logo"
            className="logo"
          />{" "}
          {/* Logo Image */}
          <h1 className="brand-name">cUBIS</h1> {/* Brand Name */}
        </div>
        <div>
          <Title level={4}>.:: Login ::.</Title>
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
        <div className="powered-by">Powered by Powercomp</div>{" "}
        {/* Added this line */}
      </div>
    </div>
  );
};

export default LoginPage;
