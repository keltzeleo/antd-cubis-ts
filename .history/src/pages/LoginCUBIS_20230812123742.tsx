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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ width: 300 }}>
          <Title level={3}>Login</Title>
          <Form name="normal_login" onFinish={onFinish}>
            <div className="login-frame">
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a
                  href="#"
                  style={{
                    float: "right",
                    textDecoration: "none",
                    fontSize: 11,
                  }}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Log in
                </Button>
              </Form.Item>
              <div>
                Don't have an account? <a href="#">Sign up</a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
