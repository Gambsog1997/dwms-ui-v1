/* eslint-disable no-unreachable */
import "./../App.css";
import "./../assets/dashboard.css";
import React from "react";

import Contents from "./content";
import { Drawer, Layout, Menu, Typography } from "antd";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  // useLocation,
} from "react-router-dom";
import DomListPage from "./DomesticWorker/listPage";
import RegistrationForm from "./DomesticWorker/registration";
// import CredentialsContext from "../contexts";
import RefListPage from "./Referee/listPage";
import RegistrationFormReferee from "./Referee/registration";
import CustListPage from "./Customer/listPage";
import RegistrationFormCustomer from "./Customer/registration";
import ReportPage from "../reportpage";
import { useHistory } from "react-router-dom";
import NavBar from "./navBar";

// const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const DashboardHome = (props) => {
  const history = useHistory();
  const path = useRouteMatch().path;

  return (
    <React.Fragment>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: "0px",
            zIndex: 1,
          }}
        >
          <NavBar />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ padding: "24px 0" }}>
            <Sider width={200} theme="dark">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["1"]}
                style={{ height: "100%" }}
                className="fonts"
              >
                {/* <div
                  style={{
                    // height: 100,
                    textAlign: "center",
                    padding: 20,
                    marginTop: 5,
                    marginBottom: 5,
                    backgroundColor: "darkgrey",
                  }}
                >
                  <Menu.Item key="0">
                    {/* <Avatar size={80} icon={<UserOutlined />} /> */}
                {/* 
                    <Typography.Title
                      style={{
                        // height: 100,
                        textAlign: "center",
                        padding: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      level={4}
                    >
                      Admin
                    </Typography.Title>
                  </Menu.Item>
                </div> */}
                <Menu.Item key="1">
                  <Link to={`${path}/charts`}>Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={`${path}/domesticworkerspage`}>
                    Domestic Workers
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={`${path}/refereepage`}>Referee</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to={`${path}/customerpage`}>Customer</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to={`${path}/problemreports`}>Problem reports</Link>
                </Menu.Item>
                <Menu.Item
                  key="7"
                  onClick={() => {
                    localStorage.removeItem("user");
                    history.replace("/");
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 480,
              }}
              className="container"
            >
              <div
                style={{
                  margin: 5,
                  padding: 10,
                  fontsize: 25,
                }}
                className="fonts"
              >
                <div
                  style={{
                    paddingLeft: 8,
                  }}
                ></div>
                <Switch>
                  <Route exact path={`${path}/charts`} component={Contents} />
                  <Route
                    exact
                    path={`${path}/domesticworkerspage`}
                    component={DomListPage}
                  />
                  <Route
                    exact
                    path={`${path}/refereepage`}
                    component={RefListPage}
                  />
                  <Route
                    exact
                    path={`${path}/refereeregistration`}
                    component={RegistrationFormReferee}
                  />
                  <Route
                    exact
                    path={`${path}/customerregistration`}
                    component={RegistrationFormCustomer}
                  />
                  <Route
                    exact
                    path={`${path}/registration`}
                    component={RegistrationForm}
                  />
                  <Route
                    path={`${path}/customerpage`}
                    component={CustListPage}
                  />
                  <Route
                    exact
                    path={`${path}/problemreports`}
                    component={ReportPage}
                  />

                  <Route exact path={`${path}`} component={Contents} />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
          }}
          className="fonts"
        >
          <strong>@2021</strong>
        </Footer>
      </Layout>
    </React.Fragment>
  );
};

export default DashboardHome;
