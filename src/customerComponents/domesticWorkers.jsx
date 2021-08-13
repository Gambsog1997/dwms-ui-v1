import {
  Table,
  Button,
  Popover,
  Typography,
  Drawer,
  Image,
  Descriptions,
} from "antd";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../dashboardComponents/search";
import { message } from "antd";

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const DomesticWorkersView = () => {
  // const [visible, setvisible] = useState(false);
  const user = useRef(JSON.parse(localStorage.getItem("user")));
  const [actualLocation, setactualLocation] = useState({});
  const [domWorkers, setdomWorkers] = useState([]);
  const [onSeachDom, setonSeachDom] = useState([]);
  const [random] = useState();
  const [searchValue, setsearchValue] = useState("");
  const [visible, setvisible] = useState(false);
  const [selected, setselected] = useState({});

  const showDrawer = () => {
    setvisible(!visible);
  };

  const drawer = () => {
    console.log(selected);
    return (
      <div>
        <Drawer
          visible={visible}
          placement="right"
          title="DWMS"
          className="fonts"
          zIndex={0.7}
          headerStyle={{
            textAlign: "center",
          }}
          width={640}
          onClose={() => {
            setvisible(false);
          }}
        >
          <Descriptions
            bordered
            title={
              Object.keys(selected).length === 0
                ? null
                : `Domestic Worker Id: ${selected.domId}`
            }
            size="default"
            extra={
              <Button
                type="primary"
                onClick={async () => {
                  const domLocation = await axios.get(
                    `https://dwms-server.herokuapp.com/location/get?id=${selected.homeLocationId}`
                  );

                  console.log(domLocation);
                  axios
                    .post(
                      "https://dwms-server.herokuapp.com/dom-history/create",
                      {
                        customerId: user.current.id,
                        DomesticworkerDomId: selected.domId,
                      }
                    )
                    .then(async (result) => {
                      try {
                        const user = await axios.get(
                          `https://dwms-server.herokuapp.com/customer/list?id=${result.data.customerId}`
                        );
                        const isAuthenticated = JSON.parse(
                          localStorage.getItem("user")
                        ).isAuthenticated;
                        localStorage.setItem(
                          "user",
                          JSON.stringify({ ...user.data, isAuthenticated })
                        );
                        message.success("successfully allocated house help");
                        console.log(user);
                      } catch (error) {
                        console.log(error);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Select
              </Button>
            }
            layout="vertical"
            width={720}
          >
            <Descriptions.Item label="HouseHelp Name">
              {Object.keys(selected) === 0 ? null : selected.firstname}
            </Descriptions.Item>
            <Descriptions.Item label="Image ">
              {Object.keys(selected).length === 0 ? null : (
                <Image
                  width={160}
                  src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="birthdate">
              {Object.keys(selected).length === 0
                ? null
                : selected.birthdate.substring(0, 10)}
            </Descriptions.Item>
            <Descriptions.Item label="HouseHelp Home Location">
              {Object.keys(selected).length === 0 ? null : (
                <strong
                  onMouseOver={() => {
                    axios
                      .get(
                        `https://dwms-server.herokuapp.com/location/get?id=${selected.homeLocationId}`
                      )
                      .then((results) => {
                        setactualLocation(results.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  {actualLocation.ward}
                </strong>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {Object.keys(selected).length === 0 ? null : 30000}
            </Descriptions.Item>
          </Descriptions>
        </Drawer>
      </div>
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
      title: "Home Location",
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
              <Button type="primary">{location}</Button>
            </strong>
          </Popover>
        </div>
      ),
    },
    {
      title: "Details",
      render: () => (
        <Button
          type="primary"
          onClick={(e) => {
            showDrawer();
          }}
        >
          View
        </Button>
      ),
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
        console.log(filtered);
        setdomWorkers(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selected]);

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

          if (!Number.parseInt(onSearchValue).isNaN) {
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
          } else {
            setsearchValue(onSearchValue);
            const searching = domWorkers.filter((domWorker) => {
              if (domWorker.birthdate.toLowerCase().includes(onSearchValue)) {
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
      {drawer()}
    </div>
  );
};

export default DomesticWorkersView;
