import { Layout, Menu, Dropdown, Button, Spin } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  WhatsAppOutlined,
  TwitterOutlined,
  InstagramOutlined,
  EyeOutlined,
  MoneyCollectOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import DomesticWorkersView from "./domesticWorkers";
import Payment from "./payment";
import Introductory from "./introductory";
import Reports from "./reportProblems";
import userContext from "../Contexts/userContext";
// import BackToLogin from "../services/redirect";
import { useState, useEffect } from "react";
import CustomerProfile from "../dashboardComponents/Customer/profile/customerProfile";

const { Sider, Content, Header, Footer } = Layout;

const HomePage = () => {
  const [collapse, setcollapse] = useState(false);
  const [selectedKey, setselectedKey] = useState(1);
  const [user, setUser] = useState({});
  const [spin, setspin] = useState(true);
  const [visible, setvisible] = useState(false);
  const history = useHistory();

  const showDrawer = () => {
    setvisible(!visible);
  };

  const CollapseHandler = (collapse) => {
    if (collapse) {
      return (
        <MenuUnfoldOutlined
          style={{
            color: "white",
          }}
          onClick={() => {
            setcollapse(!collapse);
            console.log(collapse);
          }}
        ></MenuUnfoldOutlined>
      );
    } else {
      return (
        <MenuFoldOutlined
          style={{
            color: "white",
          }}
          title=""
          onClick={() => {
            setcollapse(!collapse);
            console.log(collapse);
          }}
        ></MenuFoldOutlined>
      );
    }
  };

  const BackToLogin = (user) => {
    if (!user) {
      // setTimeout(() => {
      //   history.replace("/");
      // }, 2000);
      history.replace("/");
    }
    // return null;
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    // BackToLogin(user);
  }, []);

  useEffect(() => {
    setspin(false);
  }, [user]);

  const menu = () => {
    return (
      <Menu>
        <Menu.Item>
          <Button
            type="link"
            onClick={() => {
              showDrawer();
            }}
          >
            View Profile
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            type="link"
            onClick={() => {
              setspin(true);
              localStorage.removeItem("user");
            }}
          >
            <Link to="/">Logout</Link>
          </Button>
          <CustomerProfile
            visible={visible}
            setvisible={() => {
              setvisible(visible);
            }}
            onClose={() => {
              setvisible(false);
            }}
            heading="Profile"
            userId={user.id}
          />
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <userContext.Provider value={user}>
      {/* {BackToLogin(user)} */}
      <Spin size="large" tip="loading...." spinning={spin}>
        <div className="titleHeads">
          <Layout className="nav-background">
            <Header
              style={{
                backgroundColor: "teal",
              }}
            >
              <div
                style={{
                  color: "white",
                }}
              >
                {CollapseHandler(collapse)}
                <div
                  style={{
                    float: "right",
                  }}
                >
                  Contact Us
                  <span>
                    {
                      <WhatsAppOutlined
                        style={{
                          marginLeft: 15,
                          marginRight: 15,
                        }}
                      />
                    }
                    {
                      <TwitterOutlined
                        style={{
                          marginRight: 15,
                        }}
                      />
                    }
                    {
                      <InstagramOutlined
                        style={{
                          marginRight: 25,
                        }}
                      />
                    }
                    {
                      <Dropdown
                        overlay={menu}
                        trigger={["click"]}
                        overlayStyle={{
                          width: "20%",
                        }}
                      >
                        <Button
                          type="default"
                          style={{
                            marginLeft: 25,
                          }}
                        >
                          <UserOutlined />
                        </Button>
                      </Dropdown>
                    }
                  </span>
                </div>
              </div>
            </Header>
            <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={collapse}
                theme="light"
                style={{
                  position: "sticky",
                  top: "0px",
                  backgroundColor: "blackI",
                }}
              >
                <Menu selectedKeys={[selectedKey]} mode="inline">
                  {/* <Menu.Item
                    key={0}
                    icon={<HomeOutlined />}
                    onClick={({ key }) => {
                      // this.setState({ selectedKey: `"${key}"` });
                      setselectedKey(key);
                      console.log(selectedKey);
                    }}
                  >
                    <Link to={"/home/introductory"}>Home</Link>
                  </Menu.Item> */}
                  <Menu.Item key={1} icon={<EyeOutlined />}>
                    <Link to={"/home/dom-view"}>View Domestic Workers</Link>
                  </Menu.Item>
                  <Menu.Item
                    key={2}
                    icon={<MoneyCollectOutlined />}
                    onClick={() => {
                      setselectedKey(setselectedKey);
                    }}
                  >
                    <Link to={"/home/payment"}>Payment</Link>
                  </Menu.Item>
                  <Menu.Item key={3} icon={<WarningOutlined />}>
                    <Link to={"/home/report"}>Report Problem</Link>
                  </Menu.Item>
                </Menu>
              </Sider>

              <Content>
                <div
                  style={{
                    margin: 20,
                    // backgroundColor: "lightblue",
                  }}
                >
                  <Switch>
                    {/* <Route
                      path={"/home/introductory"}
                      component={Introductory}
                    /> */}
                    <Route path={"/home/payment"}>
                      <Payment user={user} />
                    </Route>
                    <Route path={`/home/dom-view`}>
                      <DomesticWorkersView />
                    </Route>
                    <Route path={`/home/report`}>
                      <Reports />
                    </Route>
                    <Route path={`/home`} exact>
                      <Introductory />
                    </Route>
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
          {/* <Footer
            style={{
              textAlign: "center",
              backgroundColor: "teal",
              position: "static",
              bottom: 0,
            }}
          >
            Panic @2021
          </Footer> */}
        </div>
      </Spin>
    </userContext.Provider>
  );
};

export default HomePage;
