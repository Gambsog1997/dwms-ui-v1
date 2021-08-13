import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Popover, Typography, Drawer } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RegistrationForm from "./registration";
import SearchBar from "../search";

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const DomListPage = () => {
  // const [visible, setvisible] = useState(false);
  const history = useHistory();
  const [actualLocation, setactualLocation] = useState({});
  const [domWorkers, setdomWorkers] = useState([]);
  const [onSeachDom, setonSeachDom] = useState([]);
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
        <RegistrationForm />
      </Drawer>
    );
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "domId",
      defaultSortOrder: "ascend",
      width: 50,
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "firstname",
      width: 200,
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
    },
    {
      title: "Location",
      dataIndex: "homeLocationId",
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
                  pathname: "/homedashboard/registration",
                  state: {
                    selectedDom: { ...selected },
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
      render: () => {
        return (
          <div
            onClick={() => {
              handleDelete();
            }}
          >
            <DeleteOutlined
              style={{
                color: "blueviolet",
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get("https://dwms-server.herokuapp.com/domestic-workers/list")
      .then((results) => {
        //console.log(results.data[0].homeLocation);
        const domWorkers = results.data.map((domWorker) => {
          domWorker.birthdate = domWorker.birthdate.substring(0, 10);
          return domWorker;
        });
        const filtered = domWorkers.filter((domWorker) => {
          if (domWorker.customerId === null) {
            return domWorker;
          }
        });
        setdomWorkers(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = () => {
    const filtered = domWorkers.filter((domWorker) => {
      return domWorker.domId !== selected.domId ? domWorker : null;
    });
    setdomWorkers(filtered);
    console.log(selected);
    axios
      .post(
        `https://dwms-server.herokuapp.com/domestic-workers/delete?domId=${selected.domId}`
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
        Domestic Workers
      </Typography.Title>
      <SearchBar
        placeholder="search by name"
        onChange={(e) => {
          const onSearchValue = e.target.value.toLowerCase();

          if (onSearchValue === "") {
            setsearchValue("");
          } else {
            setsearchValue(onSearchValue);
            const searching = domWorkers.filter((domWorker) => {
              if (domWorker.firstname.toLowerCase().includes(onSearchValue)) {
                return domWorker;
              }
            });
            setonSeachDom(searching);
          }
        }}
        // onSearch={(value, e) => {
        //   console.log(e.target.value);
        // }}
      />
      <Table
        columns={columns}
        dataSource={searchValue === "" ? domWorkers : onSeachDom}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        rowKey={domWorkers.domId}
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: () => {
              setselected(record);
            },
          };
        }}
        // onCell={(row, col) => {}}
        scroll={{ x: 1000, y: 500 }}
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

export default DomListPage;
