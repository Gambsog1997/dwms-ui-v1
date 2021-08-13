import React from "react";
import "../../css/landingpage.css";
import { Typography } from "antd";

const nav = {
  height: 60,
  width: "100%",
  backgroundColor: "blueviolet",
};
const li = {
  display: "inline-block",
  color: "black",
  margin: 10,
  fontSize: 20,
  fontWeight: "bold",
};
const ul = {
  float: "right",
  marginRight: 50,
};

const { Title } = Typography;

function NavBar(props) {
  return (
    <div id="nav">
      <nav style={nav}>
        <Title
          style={{
            float: "left",
            marginTop: 8,
            marginLeft: 20,
            color: "black",
          }}
          level={3}
        >
          WeCare
        </Title>
        <ul style={ul}>
          <li style={li}>
            <a href="#home">Home</a>
          </li>
          <li style={li}>
            <a href="#about">About Us</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
