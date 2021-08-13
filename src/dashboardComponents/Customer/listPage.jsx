import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import { Table, Popover, Typography, Drawer, Button } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BackToLogin from "../../services/redirect";
import RegistrationFormCustomer from "./registration";
import SearchBar from "../search";

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const CustListPage = () => {
  BackToLogin();
  const history = useHistory();
  const [visible, setvisible] = useState(false);
  const [actualLocation, setactualLocation] = useState({});
  const [cust, setcust] = useState([]);
  const [onSeachCust, setonSeachCust] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [occupation, setoccupation] = useState("");
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
        <RegistrationFormCustomer />
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
    },
    {
      title: "Date of birth",
      dataIndex: "birthdate",
      width: 150,
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
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Occupation",
      dataIndex: "occupationId",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (occupationId) => (
        <div>
          <Popover content={`${occupation.occupation}`} title="Occupation">
            <strong
              style={{
                color: "blueviolet",
              }}
              onMouseOver={() => {
                console.log(occupationId);
                axios
                  .get(
                    `https://dwms-server.herokuapp.com/occupation/list?id=${occupationId}`
                  )
                  .then((results) => {
                    setoccupation(results.data);
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
                  pathname: "/homedashboard/customerregistration",
                  state: {
                    selectedCust: { ...selected },
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
      fixed: "right",
      width: 100,
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
      // fixed: "right",
    },
  ];

  useEffect(() => {
    axios
      .get("https://dwms-server.herokuapp.com/customer/list")
      .then((results) => {
        const customers = results.data.map((customer) => {
          customer.birthdate = customer.birthdate.substring(0, 10);
          return customer;
        });
        setcust(customers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = () => {
    const filtered = cust.filter((cust) => {
      return cust.id !== selected.id ? cust : null;
    });
    setcust(filtered);
    console.log(selected);
    axios
      .post(
        `https://dwms-server.herokuapp.com/customer/delete?id=${selected.id}`
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
        Customers
      </Typography.Title>
      <SearchBar
        placeholder="search by name"
        onChange={(e) => {
          const onSearchValue = e.target.value.toLowerCase();

          if (onSearchValue === "") {
            setsearchValue("");
          } else {
            setsearchValue(onSearchValue);
            const searching = cust.filter((customer) => {
              if (customer.firstname.toLowerCase().includes(onSearchValue)) {
                return customer;
              }
            });
            setonSeachCust(searching);
          }
        }}
        // onSearch={(value, e) => {
        //   console.log(e.target.value);
        // }}
      />
      <Table
        columns={columns}
        dataSource={searchValue === "" ? cust : onSeachCust}
        onChange={onChange}
        pagination={{ current: 1, defaultPageSize: 5 }}
        rowKey={cust.id}
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

export default CustListPage;
