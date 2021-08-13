import { Button, Drawer, Table, Typography, Descriptions } from "antd";
// import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./dashboardComponents/search";

const ReportPage = () => {
  const [reports, setreports] = useState([]);
  // const [cust, setcust] = useState({});
  const [visibility, setvisibility] = useState(false);
  const [selected, setselected] = useState({});
  const [onSeachCust, setonSeachCust] = useState([]);
  const [searchValue, setsearchValue] = useState("");

  // const { Title } = Typography;
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      defaultSortOrder: "ascend",
    },
    {
      title: "CustomerId",
      dataIndex: "customerId",
      defaultSortOrder: "ascend",
    },
    {
      title: "Details",
      render: () => {
        return (
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {
              setvisibility(!visibility);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    axios.get("https://dwms-server.herokuapp.com/report/get").then((result) => {
      console.log(result.data);
      setreports(result.data);
    });
  }, []);

  return (
    <div>
      <Typography.Title level={4} type="secondary">
        Problem Reports
      </Typography.Title>
      <SearchBar
        placeholder="search by name"
        onChange={(e) => {
          const onSearchValue = e.target.value.toLowerCase();

          if (onSearchValue === "") {
            setsearchValue("");
          } else {
            setsearchValue(onSearchValue);
            const searching = reports.filter((report) => {
              if (
                report.customer.firstname.toLowerCase().includes(onSearchValue)
              ) {
                return report;
              }
            });
            setonSeachCust(searching);
          }
        }}
      />
      <Table
        columns={columns}
        dataSource={searchValue === "" ? reports : onSeachCust}
        // onChange={onChange}
        pagination={{ defaultPageSize: 5 }}
        rowKey={reports.id}
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: () => {
              setselected(record);
            },
          };
        }}
        scroll={{ y: 1500 }}
        // onCell={(row, col) => {}}
      />
      <Drawer
        title="Report Details"
        visible={visibility}
        placement="left"
        onClose={() => {
          console.log(selected);
          setvisibility(!visibility);
        }}
        width={640}
      >
        <Descriptions
          bordered
          title={
            Object.keys(selected).length === 0
              ? null
              : `Report Id: ${selected.id}`
          }
          size="default"
          extra={<Button type="primary">Edit</Button>}
          layout="vertical"
          width={720}
        >
          <Descriptions.Item label="Customer Name">
            {Object.keys(selected).length === 0
              ? null
              : selected.customer.firstname}
          </Descriptions.Item>
          <Descriptions.Item label="category">
            {Object.keys(selected).length === 0 ? null : selected.category}
          </Descriptions.Item>
          <Descriptions.Item label="level">
            {Object.keys(selected).length === 0 ? null : selected.level}
          </Descriptions.Item>
          <Descriptions.Item label="report">
            {Object.keys(selected).length === 0 ? null : selected.report}
          </Descriptions.Item>
          <Descriptions.Item label="HouseHelp ">
            {Object.keys(selected).length === 0
              ? null
              : selected.DomesticworkerDomId}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </div>
  );
};

export default ReportPage;
