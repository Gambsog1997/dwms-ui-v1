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

const RegistrationFormReferee = () => {
  const [form] = Form.useForm();
  // const history = useHistory();
  const [submitText, setsubmitText] = useState("");
  const location = useLocation();

  if (location.state) {
    var {
      id,
      firstname,
      middlename,
      lastname,
      gender,
      birthdate,
      password,
      phone,
      email,
      DomesticworkerDomId,
      locationId: ward,
      occupationId,
    } = location.state.selectedRef;
    birthdate = moment(birthdate);
  }

  const [wardQ, setward] = useState([]);
  const [occupation, setoccupation] = useState([]);
  const [domWorkers, setdomWorkers] = useState([]);
  const [formData, setformData] = useState({});
  const [value, setvalue] = useState("");
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

  const onSearchDom = (searchText) => {
    if (searchText !== "") {
      setdomWorkers(domWorkers);
    }
    if (searchText === "") {
      setdomWorkers([]);
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

  const onChangeDom = (value) => {
    axios
      .get(
        `https://dwms-server.herokuapp.com/domestic-workers/get-all-workers?firstname=${value}`
      )
      .then((result) => {
        setdomWorkers(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setvalue(value);
    if (value !== "") {
      setdomWorkers(domWorkers);
    }
    if (value === "") {
      setward([]);
    }
  };

  const onChangeOccupation = (value) => {
    axios
      .get(
        `https://dwms-server.herokuapp.com/occupation/list?occupation=${value}`
      )
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

  const Dom = domWorkers.map((domworker) => (
    <Option key={domWorkers.indexOf(domworker)} value={domworker.domId}>
      {domworker.firstname +
        " " +
        domworker.middlename +
        " " +
        domworker.lastname}
    </Option>
  ));

  const wards = wardQ.map((wardSingle) => (
    <Option key={wardQ.indexOf(wardSingle)} value={wardSingle.id}>
      {wardSingle.ward}
    </Option>
  ));

  const OccArr = [];
  OccArr.push(occupation);
  console.log(OccArr);
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
    console.log(formData);
    const bdate = values.birthdate.format("L");
    const date = `${bdate.substring(6)}-${bdate.substring(
      0,
      2
    )}-${bdate.substring(3, 5)}`;
    values.birthdate = date;
    console.log(values);

    // if (location.state) {
    //   axios
    //     .post("https://dwms-server.herokuapp.com/registration/referee", values)
    //     .then((res) => {
    //       console.log(res);
    //       notification.info({
    //         message: `Success`,
    //         description: "Added new referee",
    //       });
    //       history.replace("/homedashboard/refereepage");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   axios
    //     .post("https://dwms-server.herokuapp.com/registration/referee", values)
    //     .then((res) => {
    //       console.log(res);
    //       notification.info({
    //         message: `Success`,
    //         description: "Added new referee",
    //       });
    //       history.replace("/homedashboard/refereepage");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    switch (submitText) {
      case "Register":
        axios
          .post(
            "https://dwms-server.herokuapp.com/registration/referee",
            values
          )
          .then((res) => {
            console.log(res);
            message.success("Added new");
            // history.replace("/homedashboard/refereepage");
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Edit":
        axios
          .put(
            `https://dwms-server.herokuapp.com/customer/update?id=${id}`,
            values
          )
          .then((res) => {
            console.log(res);
            message.success("updated");
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      default:
        message.warning("unknown values");
        break;
    }
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
        <h2>{location.state ? "Edit" : "Register"} Referee</h2>
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={
          location.state
            ? {
                id,
                firstname,
                middlename,
                lastname,
                gender,
                birthdate,
                password,
                phone,
                email,
                DomesticworkerDomId,
                ward,
                occupationId,
              }
            : null
        }
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
          <Input />
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
          <Input.Password />
        </Form.Item>
        {location.state ? null : (
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}
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
          name="ward"
          label="ward"
          rules={[
            {
              // type: "integer",
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
            {wards}
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="DomesticworkerDomId"
          label="domesticworker name"
          rules={[
            {
              // type: "string",
              required: true,
              message: "Please select workers",
            },
          ]}
        >
          <AutoComplete
            onSelect={onSelect}
            onChange={onChangeDom}
            onSearch={onSearchDom}
            placeholder="Input here"
          >
            {Dom}
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
          >
            {Occupation}
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

export default RegistrationFormReferee;
