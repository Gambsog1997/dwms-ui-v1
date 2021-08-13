import {
  Form,
  Input,
  Button,
  // notification,
  Avatar,
  Drawer,
  message,
  Card,
} from "antd";
import background from "../assets/pexels-pixabay-531880.jpg";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import config from "../config";
import React, { useState } from "react";
import RegistrationFormCustomer from "./Customer/registration";
import auth from "../services/auth";

const LoginForm = () => {
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const [visible, setvisible] = useState(false);
  const [registerHeader, setregisterHeader] = useState("Customer");

  const showDrawer = () => {
    setvisible(!visible);
  };

  const drawer = () => {
    return (
      <Drawer
        visible={visible}
        placement="right"
        title="DWMS"
        className="fonts"
        zIndex={0.7}
        headerStyle={{
          textAlign: "center",
        }}
        bodyStyle={{
          backgroundImage:
            "linear-gradient(to right bottom, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9)",
        }}
        width={720}
        onClose={() => {
          setvisible(false);
        }}
      >
        <RegistrationFormCustomer heading={registerHeader} />
      </Drawer>
    );
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const token = config.token;

    axios
      .post(
        "https://dwms-server.herokuapp.com/customer/authentication",
        values,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((status) => {
        if (status.data.dataValues && status.data.dataValues.role === "admin") {
          axios
            .get(
              `https://dwms-server.herokuapp.com/customer/list?id=${status.data.dataValues.id}`
            )
            .then((res) => {
              auth.login(res, status, history, values);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (
          status.data.dataValues &&
          status.data.dataValues.role === "guest"
        ) {
          axios
            .get(
              `https://dwms-server.herokuapp.com/customer/list?id=${status.data.dataValues.id}`
            )
            .then((res) => {
              auth.login(res, status, history, values);
            });
        } else {
          message.error(`Wrong credentials`);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed to login");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        alignContent: "center",
        paddingTop: 115,
        paddingBottom: 85,
        // marginTop: 100,#bdc3c7 → #2c3e50
        width: "100%",
        backgroundImage:
          "linear-gradient(to right bottom, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9)",
      }}
    >
      <Card
        hoverable={true}
        className="fonts"
        style={{
          textAlign: "center",
          borderRadius: 7,
        }}
        bodyStyle={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            justifySelf: "center",
            zIndex: 1,
          }}
        >
          <Avatar
            size={100}
            icon={<UserOutlined />}
            style={{
              textAlign: "center",
              opacity: 0.5,
            }}
          />
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            style={{
              margin: 20,
              padding: 10,
            }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <div
              style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    {/* <Link to="/homedashboard">Log in</Link> */}
                    Log in
                  </Button>
                  Or
                  <Button
                    type="link"
                    htmlType="button"
                    className="login-form-button"
                    style={{
                      marginRight: "10px",
                      color: "white",
                    }}
                    onClick={() => {
                      if (routeMatch.path === "/") {
                        setregisterHeader("Now");
                      }

                      showDrawer();
                    }}
                  >
                    {/* <Link to="/homedashboard">Log in</Link> */}
                    Register now!
                  </Button>
                </Form.Item>
                {drawer()}
              </div>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
