import { Statistic, Row, Col, Card, Badge, Typography, Divider } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";

const UpperPart = () => {
  const [customerCount, setcustomerCount] = useState(0);
  const [domWorkerCount, setdomWorkerCount] = useState(0);
  const [reports, setreports] = useState(0);
  const history = useHistory();
  // const path = useLocation();

  useEffect(() => {
    axios
      .get("https://dwms-server.herokuapp.com/customer/get-count")
      .then((results) => {
        console.log(results.data[0].Customers);
        setcustomerCount(results.data[0].Customers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://dwms-server.herokuapp.com/domestic-workers/all-workers")
      .then((results) => {
        console.log(results.data[0].Househelps);
        setdomWorkerCount(results.data[0].Househelps);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://dwms-server.herokuapp.com/report/get-all-count")
      .then((results) => {
        console.log(results.data[0].Reports);
        setreports(results.data[0].Reports);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Row
        gutter={16}
        style={{
          color: "blue",
        }}
      >
        <Col
          span={24}
          style={{
            textAlign: "center",
          }}
          className="titleHeads"
        >
          Overview
        </Col>
        <Divider />
        <Col span={6}>
          <Badge count={customerCount} showZero={true}>
            <Card
              className="fonts"
              bodyStyle={{
                backgroundImage:
                  "linear-gradient(to right bottom, #cbdaf0, #c3e3f0, #c6eae8, #d4eedf, #e8f0d9)",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                textAlign: "center",
                color: "blue",
                maxHeight: "auto",
              }}
              onClick={() => {
                history.push(`/homedashboard/customerpage`);
                // console.log(path);
              }}
            >
              <Typography>Customer Count</Typography>
            </Card>
          </Badge>
        </Col>
        <Col span={6}>
          <Badge count={domWorkerCount}>
            <Card
              className="fonts"
              bodyStyle={{
                backgroundImage:
                  "linear-gradient(to right bottom, #cbdaf0, #c3e3f0, #c6eae8, #d4eedf, #e8f0d9)",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                textAlign: "center",
                color: "blue",
                maxHeight: "auto",
              }}
              onClick={() => {
                history.push(`/homedashboard/domesticworkerspage`);
                // console.log(path);
              }}
            >
              <Typography>Domestic workers Count</Typography>
            </Card>
          </Badge>
        </Col>
        <Col span={6}>
          <Badge count={reports}>
            <Card
              className="fonts"
              bodyStyle={{
                backgroundImage:
                  "linear-gradient(to right bottom, #cbdaf0, #c3e3f0, #c6eae8, #d4eedf, #e8f0d9)",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                textAlign: "center",
                color: "blue",
                maxHeight: "auto",
              }}
            >
              {/* <Statistic prefix={<PieChartOutlined />} value={reports} /> */}
              <Typography>Problem Reports</Typography>
            </Card>
          </Badge>
        </Col>

        <Col span={6}>
          <Badge
            count={document.cookie.match(`(^|;)\\s*count\\s*=\\s*([^;]+)`)}
            showZero={true}
          >
            <Card
              className="fonts"
              bodyStyle={{
                backgroundImage:
                  "linear-gradient(to right bottom, #cbdaf0, #c3e3f0, #c6eae8, #d4eedf, #e8f0d9)",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                textAlign: "center",
                color: "blue",
                maxHeight: "auto",
              }}
            >
              {/* <Statistic prefix={<PieChartOutlined />} value={reports} /> */}
              <Typography>Logged in Devices</Typography>
            </Card>
          </Badge>
        </Col>
      </Row>
    </div>
  );
};

export default UpperPart;
