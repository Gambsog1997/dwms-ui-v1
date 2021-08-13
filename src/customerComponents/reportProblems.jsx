import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
// import userContext from "../Contexts/userContext";

const { useForm } = Form;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};

const tailLayout = {
  offset: 16,
  wrapperCol: {
    span: 18,
  },
};

const Reports = () => {
  const [data, setdata] = useState({});

  useEffect(() => {
    setdata(JSON.parse(localStorage.getItem("user")));
  }, []);

  const onFinish = (values) => {
    // const domHistory = data.dataValues.DomWorkerHistories;
    console.log(data);
    console.log({
      ...values,
      customerId: data.id,
      timeCreated: moment().format().substring(0, 10),
      DomesticworkersDomId:
        data.DomWorkerHistories[data.DomWorkerHistories.length - 1].id,
    });

    const value = {
      ...values,
      customerId: data.id,
      DomesticworkersDomId:
        data.DomWorkerHistories.length !== 0
          ? data.DomWorkerHistories[data.DomWorkerHistories.length - 1].id
          : null,
    };

    axios
      .post("https://dwms-server.herokuapp.com/report/create-report", value)
      .then((result) => {
        message.success("reported");
      })
      .catch((err) => {
        message.warning(err);
      });
  };

  const [form] = useForm();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
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
        <h3>Create report</h3>
      </div>
      <div
        style={{
          margin: 10,
        }}
      >
        <Form {...layout} form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Category">
              <Select.Option value="service">Service</Select.Option>
              <Select.Option value="behaviour">Behaviour</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="level"
            label="Level"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="level">
              <Select.Option value="critical">critical</Select.Option>
              <Select.Option value="medium">medium</Select.Option>
              <Select.Option value="low">low</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="report"
            label="Report"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={2} placeholder="Enter text here" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Reports;
