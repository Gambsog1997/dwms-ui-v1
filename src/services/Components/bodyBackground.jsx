import { Button, Typography, Drawer } from "antd";
import { useState } from "react";
import "../../App.css";
import LoginForm from "../../dashboardComponents/login";

const Background = () => {
  const [visible, setvisible] = useState(false);

  const onClose = () => {
    setvisible(false);
  };

  const login = (params) => {
    setvisible(true);
  };

  return (
    <div id="home">
      <Drawer
        title="LOGIN"
        width="50%"
        visible={visible}
        onClose={onClose}
        className="fonts"
      >
        <LoginForm />
      </Drawer>
      <div
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            position: "relative",
            left: 80,
            padding: 10,
          }}
        >
          <Typography.Title type="blueviolet">
            Get
            <br /> Your worker of Choice <br />
            Today 😃!
          </Typography.Title>
        </div>

        <div
          style={{
            flex: 1,
            alignSelf: "flex-start",
            position: "absolute",
            right: 10,
          }}
        >
          <Button
            style={{
              margin: 5,
              padding: 3,
              width: 100,
            }}
            type="primary"
            size="large"
            onClick={login}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Background;
