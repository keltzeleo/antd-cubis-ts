import Login from "ant-design-pro/lib/Login";
import { Alert, Checkbox } from "antd";
import * as React from "react";
import ReactDOM from "react-dom";

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

interface LoginCUBISState {
  notice: string;
  type: string;
  autoLogin: boolean;
}

class LoginCUBIS extends React.Component<{}, LoginCUBISState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      notice: "",
      type: "tab2",
      autoLogin: true,
    };
  }

  onSubmit = (err: any, values: any) => {
    console.log("value collected ->", {
      ...values,
      autoLogin: this.state.autoLogin,
    });
    if (this.state.type === "tab1") {
      this.setState(
        {
          notice: "",
        },
        () => {
          if (
            !err &&
            (values.username !== "admin" || values.password !== "888888")
          ) {
            setTimeout(() => {
              this.setState({
                notice:
                  "The combination of username and password is incorrect!",
              });
            }, 500);
          }
        }
      );
    }
  };

  onTabChange = (key: string) => {
    this.setState({
      type: key,
    });
  };

  changeAutoLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  render() {
    return (
      <div className="login-warp">
        <Login
          defaultActiveKey={this.state.type}
          onTabChange={this.onTabChange}
          onSubmit={this.onSubmit}
        >
          <Tab key="tab1" tab="Account">
            {this.state.notice && (
              <Alert
                style={{ marginBottom: 24 }}
                message={this.state.notice}
                type="error"
                showIcon
                closable
              />
            )}
            <UserName name="username" />
            <Password name="password" />
          </Tab>
          <Tab key="tab2" tab="Mobile">
            <Mobile name="mobile" />
            <Captcha
              onGetCaptcha={() => console.log("Get captcha!")}
              name="captcha"
            />
          </Tab>
          <div>
            <Checkbox
              checked={this.state.autoLogin}
              onChange={this.changeAutoLogin}
            >
              Keep me logged in
            </Checkbox>
            <a style={{ float: "right" }} href="">
              Forgot password
            </a>
          </div>
          <Submit>Login</Submit>
          <div>
            Other login methods
            <span className="icon icon-alipay" />
            <span className="icon icon-taobao" />
            <span className="icon icon-weibo" />
            <a style={{ float: "right" }} href="">
              Register
            </a>
          </div>
        </Login>
      </div>
    );
  }
}

const mountNode = document.getElementById("root");
ReactDOM.render(<LoginCUBIS />, mountNode);
