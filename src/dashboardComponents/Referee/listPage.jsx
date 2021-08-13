/* eslint-disable array-callback-return */
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { Table, Button, Popover, Typography, Drawer } from "antd";
import axios from "axios";
// import moment from "moment";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RegistrationFormReferee from "./registration";
import SearchBar from "../search";

const { Title } = Typography;

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const RefListPage = () => {
  // const [visible, setvisible] = useState(false);
  const history = useHistory();
  const [actualLocation, setactualLocation] = useState({});
  const [refs, setrefs] = useState([]);
  const [occupation, setoccupation] = useState("");
  const [domName, setdomName] = useState("");
  const [onSeachRef, setonSeachRef] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [visible, setvisible] = useState(false);
  const [selected, setselected] = useState({});

  const showDrawer = () => {
    setvisible(!visible);
  };

  const drawer = () => {
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
        onClose={() => {
          setvisible(false);
        }}
      >
        <RegistrationFormReferee />
      </Drawer>
    );
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      defaultSortOrder: "ascend",
      fixed: "left",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "firstname",
      width: 180,
      fixed: "left",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        {
          text: "Female",
          value: "F",
        },
        {
          text: "Male",
          value: "M",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      width: 100,
      fixed: "left",
    },
    {
      title: "Date of birth",
      dataIndex: "birthdate",
    },
    {
      title: "Location",
      dataIndex: "locationId",
      sorter: (a, b) => {
        return a.location - b.location;
      },
      sortDirections: ["ascend"],
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (location) => (
        <div>
          <Popover
            content={
              <strong>
                {`${actualLocation.ward}/${actualLocation.district}/${actualLocation.region}`}{" "}
              </strong>
            }
            title="Location"
          >
            <strong
              style={{
                color: "blueviolet",
              }}
              onMouseOver={() => {
                axios
                  .get(
                    `https://dwms-server.herokuapp.com/location/get?id=${location}`
                  )
                  .then((results) => {
                    setactualLocation(results.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {location}
            </strong>
          </Popover>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "domId",
      dataIndex: "DomesticworkerDomId",

      render: (domId) => (
        <div>
          <Popover
            content={
              <div>
                <strong>{domName}</strong>
              </div>
            }
            title="name"
          >
            <strong
              style={{
                color: "blueviolet",
              }}
              onMouseOver={() => {
                axios
                  .get(
                    `https://dwms-server.herokuapp.com/domestic-workers/list?id=${domId}`
                  )
                  .then((results) => {
                    setdomName(results.data.data.firstname);
                    console.log(domName);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {domId}
            </strong>
          </Popover>
        </div>
      ),
    },
    {
      title: "Occupation",
      dataIndex: "occupationId",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (occupationId) => (
        <div>
          <Popover
            content={<strong>{`${occupation.occupation}`}</strong>}
            title="Occupation"
          >
            <strong
              style={{
                color: "blueviolet",
              }}
              onMouseOver={() => {
                axios
                  .get(
                    `https://dwms-server.herokuapp.com/occupation/list?id=${occupationId}`
                  )
                  .then((results) => {
                    setoccupation(results.data);
                    console.log(
                      `https://dwms-server.herokuapp.com/occupation/list?id=${occupationId}`
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {occupationId}
            </strong>
          </Popover>
        </div>
      ),
    },
    {
      title: "Edit",
      render: () => {
        return (
          <div>
            <EditOutlined
              style={{
                color: "blueviolet",
              }}
              onClick={() => {
                // let { firstname } = selected;
                // firstname = firstname.substring(0, 5);
                // selected.firstname = firstname;

                history.push({
                  pathname: "/homedashboard/refereeregistration",
                  state: {
                    selectedRef: { ...selected },
                  },
                });
                console.log(selected);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Delete",
      render: () => {
        return (
          <div
            onClick={() => {
              handleDelete();
            }}
          >
            <DeleteFilled
              style={{
                color: "blueviolet",
              }}
            />
          </div>
        );
      },
      fixed: "right",
    },
  ];

  useEffect(() => {
    axios
      .get("https://dwms-server.herokuapp.com/referee/list")
      .then((results) => {
        setrefs(results.data);

        const referees = results.data.map((referee) => {
          referee.birthdate = referee.birthdate.substring(0, 10);
          return referee;
        });
        setrefs(referees);
        //console.log(results.data[0].homeLocation);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = () => {
    const filtered = refs.filter((ref) => {
      return ref.id !== selected.id ? ref : null;
    });
    setrefs(filtered);
    console.log(selected);
    axios
      .post(
        `https://dwms-server.herokuapp.com/referee/delete?id=${selected.id}`
      )
      .then((status) => {
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        padding: 10,
        margin: 10,
      }}
    >
      <Typography.Title level={4} type="secondary">
        Referees
      </Typography.Title>
      <SearchBar
        placeholder="search by name"
        onChange={(e) => {
          const onSearchValue = e.target.value.toLowerCase();

          if (onSearchValue === "") {
            setsearchValue("");
          } else {
            setsearchValue(onSearchValue);
            const searching = refs.filter((ref) => {
              if (ref.firstname.toLowerCase().includes(onSearchValue)) {
                return ref;
              }
            });
            setonSeachRef(searching);
          }
        }}
        // onSearch={(value, e) => {
        //   console.log(e.target.value);
        // }}
      />
      <Table
        columns={columns}
        dataSource={searchValue === "" ? refs : onSeachRef}
        expandRowByClick={true}
        onChange={onChange}
        pagination={{ pageSize: 50 }}
        rowKey={refs.id}
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: () => {
              setselected(record);
            },
          };
        }}
        scroll={{ x: 1300, y: 1500 }}
        // onCell={(row, col) => {}}
      />
      <div
        style={{
          float: "right",
          padding: "5px",
          margin: "2px",
        }}
        className="fonts"
      >
        <Button
          type="primary"
          htmlType="button"
          onClick={() => {
            showDrawer();
          }}
        >
          Add new
        </Button>
      </div>
      {drawer()}
    </div>
  );
};

export default RefListPage;
