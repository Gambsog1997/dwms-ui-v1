import { Layout, Menu, Avatar, Typography, Divider } from "antd";
import { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  SolutionOutlined,
  UserOutlined,
  WhatsAppOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Link, Switch, Route } from "react-router-dom";
import DomesticWorkersView from "./domesticWorkers";
import Payment from "./payment";
import Introductory from "./introductory";
import Reports from "./reportProblems";

const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapse, setcollapse] = useState(false);
  const [selectedKey, setselectedKey] = useState(0);
  const [avatarSize, setavatarSize] = useState(100);

  var user = JSON.parse(window.localStorage.getItem("user"));

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    var user = JSON.parse(window.localStorage.getItem("user"));
    setLoggedInUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (Object.keys(loggedInUser).length === 0) {
      setTimeout(() => {
        console.log(loggedInUser);
      }, 1000);
    } else {
      console.log(loggedInUser);
    }
  }, [loggedInUser]);

  const [name, setname] = useState("user");

  const onCollapse = (collapse) => {
    // setcollapse(!collapse);
    // console.log(collapse);
  };

  useEffect(() => {
    if (collapse === true) {
      setavatarSize(24);
      setname("");
    }
    if (collapse === false) {
      setavatarSize(100);
      // setname(name.dataValues.firstname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse]);

  const CollapseHandler = () => {
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
        />
      );
    } else {
      return (
        <MenuFoldOutlined
          style={{
            color: "white",
          }}
          onClick={() => {
            setcollapse(!collapse);
            console.log(collapse);
          }}
        />
      );
    }
  };
  return (
    <div className="titleHeads">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapse}
          onCollapse={(collapsed, type) => {
            onCollapse();
            console.log(collapsed, type);
          }}
          theme="light"
          style={{
            position: "sticky",
            top: "0px",
          }}
        >
          <div
            style={{
              color: "black",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            <Avatar icon={<UserOutlined />} size={avatarSize} />
            <Typography>Hive</Typography>
            <Divider></Divider>
          </div>
          <Menu selectedKeys={[selectedKey]} mode="inline">
            {/* <Menu.Item
              key={0}
              icon={<HomeOutlined />}
              onClick={({ key }) => {
                setselectedKey(`"${key}"`);
                console.log(selectedKey);
              }}
            >
              <Link to={"/home/introductory"}>Home</Link>
            </Menu.Item> */}
            <SubMenu
              title="Services"
              onTitleClick={({ key }) => {
                setselectedKey(`"${key}"`);
                console.log(selectedKey);
              }}
              icon={<SolutionOutlined />}
              key={1}
            >
              <Menu.Item key={1} icon={<UserSwitchOutlined />}>
                <Link to={"/home/dom-view"}>View Domestic Workers</Link>
              </Menu.Item>
              <Menu.Item key={2} icon={<UserSwitchOutlined />}>
                <Link to={"/home/payment"}>Payment</Link>
              </Menu.Item>
              <Menu.Item key={3} icon={<UserSwitchOutlined />}>
                <Link to={"/home/report"}>Report Problem</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
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
              {CollapseHandler()}
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
                        marginRight: 15,
                      }}
                    />
                  }
                </span>
              </div>
            </div>
          </Header>
          <Content>
            <div
              style={{
                margin: 20,
                // backgroundColor: "lightblue",
              }}
            >
              <Switch>
                {/* <Route path={"/home/introductory"} component={Introductory} /> */}
                <Route path={"/home/payment"} component={Payment} />
                <Route
                  path={`/home/dom-view`}
                  component={DomesticWorkersView}
                />
                <Route path={`/home/report`} component={Reports} />
                <Route path={`/home`} exact component={Introductory} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
      {/* <Footer
        style={{
          textAlign: "center",
          backgroundColor: "teal",
          position: "sticky",
          bottom: 0,
        }}
      >
        Panic @2021
      </Footer> */}
    </div>
  );
};

export default Home;
