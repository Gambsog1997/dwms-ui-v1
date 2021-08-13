import { Typography, Menu, Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const menu = () => {
  return (
    <Menu>
      <Menu.Item>
        <Button type="link">View Profile</Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="link"
          onClick={(e) => {
            localStorage.removeItem("user");
          }}
        >
          <Link to="/">Logout</Link>
        </Button>
      </Menu.Item>
    </Menu>
  );
};

const NavBar = () => {
  return (
    <div>
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li
          style={{
            float: "left",
          }}
        >
          <Menu theme="dark" mode="horizontal">
            <Typography.Title
              style={{
                color: "blue",
                paddingTop: 10,
              }}
              className="fonts"
              level={4}
            >
              DWMS
            </Typography.Title>
          </Menu>
        </li>
        <li
          style={{
            float: "right",
          }}
        >
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
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
