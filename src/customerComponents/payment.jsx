import { Form, Input, Button, Select, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BackToLogin from "../services/redirect";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 12,
    span: 8,
  },
};

const Payment = () => {
  const location = useLocation();
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  // const user = useContext(userContext);

  BackToLogin();

  const onFinish = (values) => {
    console.log("Success:", { ...values });
    const payData = {
      domId: values.domId,
      Cust_Id: user.id,
    };
    axios
      .post(
        "https://dwms-server.herokuapp.com/customer/payment/create-payment",
        payData
      )
      .then((results) => {
        // console.log(payData);
        notification["success"]({
          description: "Transaction Complete",
        });
        
        console.log(results);
      })
      .catch((err) => {
        notification["error"]({
          description: "Transaction failed",
        });
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          backgroundColor: "grey",
          padding: 10,
          margin: 5,
          borderRadius: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        <h3>Payment form</h3>
      </div>
      <div>
        <Form
          {...layout}
          name="payment"
          initialValues={{
            remember: true,
            username: user.email, //acquired from the local storages
            password: "gagagaga",
            domId: location.state
              ? location.state.id
              : user.DomWorkerHistories.length !== 0
              ? user.DomWorkerHistories[user.DomWorkerHistories.length - 1]
                  .DomesticworkerDomId
              : null,
            customerId: user.id,
            //acquired from the local storage
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="domWorker id"
            name="domId"
            rules={[
              {
                required: true,
                message: "Please input domestic worker name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="amount"
            name="amount"
            rules={[
              {
                // type: "integer",
                required: true,
                message: "Please input amount",
              },
            ]}
          >
            <Select placeholder="Amount">
              <Option value={30000}>30000</Option>
              <Option value={50000}>50000</Option>
              <Option value={70000}>70000</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Payment;
