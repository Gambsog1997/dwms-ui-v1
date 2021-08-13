import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Drawer,
  AutoComplete,
  Switch,
  message,
} from "antd";
import { useLocation } from "react-router-dom";
import moment from "moment";
// var bcrypt = require("bcryptjs");

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

const CustomerProfile = ({ heading, visible, onClose, userId }) => {
  //   const route = useRouteMatch();
  const user = useRef(JSON.parse(localStorage.getItem("user")));

  //   setTimeout(() => {
  //     BackToLogin();
  //   }, 1000);

  const [form] = Form.useForm();
  //   const location = useLocation();
  const [checked, setchecked] = useState(true);
  const [wardQ, setward] = useState([]);
  const [occupation, setoccupation] = useState([]);
  const [formData, setformData] = useState({});
  const [valueDom, setvalueDom] = useState("");
  const [valueOccupation, setvalueOccupation] = useState("");

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

  const onSearchOccupation = (searchText) => {
    if (searchText !== "") {
      setoccupation(occupation);
    }
    if (searchText === "") {
      setoccupation([]);
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

    setvalueDom(value);
    if (value !== "") {
      setward(wardQ);
    }
    if (value === "") {
      setward([]);
    }
    console.log(value);
  };

  const onChangeOccupation = (value) => {
    axios
      .get(`https://dwms-server.herokuapp.com/occupation/list?occupation=${value}`)
      .then((result) => {
        setoccupation(result.data);
        console.log(occupation);
      })
      .catch((err) => {
        console.log(err);
      });

    setvalueOccupation(value);
    if (value !== "") {
      setoccupation(occupation);
    }
    if (value === "") {
      setoccupation([]);
    }
  };

  const wards = wardQ.map((wardSingle) => (
    <Option key={wardQ.indexOf(wardSingle)} value={wardSingle.id}>
      {wardSingle.ward}
    </Option>
  ));

  const OccArr = [];
  OccArr.push(occupation);
  // console.log(OccArr);
  if (OccArr.length === 1 && OccArr[0] === null) {
  } else {
    var Occupation = OccArr.map((occ) => (
      <Option key={OccArr.indexOf(occ)} value={occ.id}>
        {occ.occupation}
      </Option>
    ));
  }

  const onFinish = (values) => {
    setformData(values);
    const bdate = values.birthdate.format("L");
    const date = `${bdate.substring(6)}-${bdate.substring(
      0,
      2
    )}-${bdate.substring(3, 5)}`;
    values.birthdate = date;
    // values.password = bcrypt.hashSync(values.password, salt);
    // console.log(salt);
    axios
      .put(`https://dwms-server.herokuapp.com/customer/update?id=${userId}`, values)
      .then((res) => {
        console.log(res);
        message.success('updated successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    console.log(formData);
  };

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
      onClose={onClose}
    >
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
          <h2>User {heading}</h2>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={
            user
              ? {
                  firstname: user.current.firstname,
                  middlename: user.current.middlename,
                  lastname: user.current.lastname,
                  gender: user.current.gender,
                  birthdate: moment(user.current.birthdate),
                  password: user.current.password,
                  phone: user.current.phone,
                  email: user.current.email,
                  DomesticworkerDomId: user.current.DomesticworkerDomId,
                  ward: user.current.locationId,
                  occupationId: user.current.occupationId,
                  role: user.current.role,
                }
              : null
          }
          onFinishFailed={onFinishFailed}
          scrollToFirstError
        >
          <Form.Item name="edit" label="Edit">
            <Switch
              onClick={() => {
                setchecked(!checked);
              }}
            />
          </Form.Item>
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
            <Input disabled={checked} />
          </Form.Item>

          <Form.Item name="middlename" label="Middle name">
            <Input disabled={checked} />
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
            <Input disabled={checked} />
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
              // addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
              disabled={checked}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input disabled={checked} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password disabled={checked} />
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
            <Select placeholder="Select gender" disabled={checked}>
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
            <DatePicker format={"YYYY-MM-DD"} disabled={checked} />
          </Form.Item>

          <Form.Item
            name="ward"
            label="Ward"
            rules={[
              {
                //type: "string",
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
              disabled={checked}
            >
              {wards}
            </AutoComplete>
          </Form.Item>

          <Form.Item
            name="occupationId"
            label="Occupation"
            rules={[
              {
                //type: "string",
                required: true,
                message: "Please choose the occupation",
              },
            ]}
          >
            <AutoComplete
              onSelect={onSelect}
              onChange={onChangeOccupation}
              onSearch={onSearchOccupation}
              placeholder="Input here"
              disabled={checked}
            >
              {Occupation}
            </AutoComplete>
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                //type: "string",
                required: true,
                message: "Please choose the occupation",
              },
            ]}
          >
            <Select placeholder="roles" disabled={checked}>
              <Option value="guest" key="2">
                customer
              </Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                console.log("clicked me");
              }}
              disabled={checked}
            >
              Edit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};

export default CustomerProfile;
