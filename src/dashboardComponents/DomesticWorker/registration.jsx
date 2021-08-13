import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  AutoComplete,
  message,
} from "antd";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const [submitText, setsubmitText] = useState("");

  if (location.state) {
    var {
      firstname,
      middlename,
      lastname,
      gender,
      birthdate,
      password,
      domId,
      phone,
      homeLocationId: ward,
    } = location.state.selectedDom;
    birthdate = moment(birthdate);
  }

  const [wardQ, setward] = useState([]);
  const [formData, setformData] = useState({});
  const [value, setvalue] = useState("");
  // const [date, setdate] = useState("");

  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  const onSearch = (searchText) => {
    if (searchText !== "") {
      setward(wardQ);
    }
    if (searchText === "") {
      setward([]);
    }
  };

  const onChange = (value) => {
    axios
      .get(`https://dwms-server.herokuapp.com/location/get-all?ward=${value}`)
      .then((result) => {
        setward(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setvalue(value);
    if (value !== "") {
      setward(wardQ);
    }
    if (value === "") {
      setward([]);
    }
    console.log(value);
  };

  const children = wardQ.map((wardSingle) => (
    <Option key={wardQ.indexOf(wardSingle)} value={wardSingle.id}>
      {wardSingle.ward}
    </Option>
  ));

  const onFinish = (values) => {
    setformData(values);
    console.log(formData);
    const bdate = values.birthdate.format("L");
    const date = `${bdate.substring(6)}-${bdate.substring(
      0,
      2
    )}-${bdate.substring(3, 5)}`;
    values.birthdate = date;
    console.log(values);

    switch (submitText) {
      case "Register":
        axios
          .post(
            "https://dwms-server.herokuapp.com/registration/domestic-worker",
            values
          )
          .then((res) => {
            console.log(res);
            // history.replace("/homedashboard/domesticworkerspage");
            message.success("added new");
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Edit":
        axios
          .put(
            `https://dwms-server.herokuapp.com/domestic-workers/update?id=${domId}`,
            values
          )
          .then((res) => {
            console.log(res);
            message.success("updated");
          })
          .catch((err) => {
            console.log(values);
            console.log(err);
          });
        break;

      default:
        message.warning("unknown values");
        break;
    }
  };

  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    console.log(formData);
  };

  return (
    <div
      style={{
        margin: "10px",
        padding: "25px",
        // float: "left",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>{location.state ? "Edit" : "Register"} Domestic Worker</h2>
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={
          location.state
            ? {
                domId,
                firstname,
                middlename,
                lastname,
                gender,
                birthdate,
                password,
                phone,
                ward,
              }
            : null
        }
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Form.Item
          name="firstname"
          label="Firstname"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="middlename" label="Middle name">
          <Input />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Last name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          tooltip="What is your gender"
          rules={[
            {
              required: true,
              message: "Please select your gender!",
            },
          ]}
        >
          <Select placeholder="Select gender">
            <Option value="F">Female</Option>
            <Option value="M">Male</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="birthdate"
          label="Birthdate"
          rules={[
            {
              type: "date",
              required: true,
              message: "Please input your birth!",
            },
          ]}
        >
          <DatePicker format={"YYYY-MM-DD"} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              type: "string",
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="ward"
          label="Ward"
          rules={[
            {
              type: "integer",
              required: true,
              message: "Please select ward",
            },
          ]}
        >
          <AutoComplete
            onSelect={onSelect}
            onChange={onChange}
            onSearch={onSearch}
            placeholder="input here"
          >
            {children}
          </AutoComplete>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={(e) => {
              console.log(e.target.innerHTML);
              setsubmitText(e.target.innerHTML);
            }}
          >
            {location.state ? "Edit" : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
