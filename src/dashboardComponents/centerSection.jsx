import { Card, Col, Divider, Row } from "antd";
import Reports from "./reports";
import React from "react";
import Gender from "../dashboardComponents/genderDistribution";
import Location from "./location";
import HomeLocation from "./homeLocation";

const MiddleSection = () => {
  return (
    <React.Fragment>
      <Divider />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <Card
            title="Problem reports"
            className="fonts"
            headStyle={{
              textAlign: "center",
              color: "blue",
              fontWeight: "bolder",
              backgroundImage:
                "linear-gradient(to right bottom, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9)",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
            bodyStyle={{
              backgroundImage:
                "linear-gradient(to right bottom, #cbdaf0, #c3e3f0, #c6eae8, #d4eedf, #e8f0d9)",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            <Reports />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Gender Distribution"
            className="fonts"
            headStyle={{
              textAlign: "center",
              color: "blue",
              fontWeight: "bolder",
              backgroundImage:
                "linear-gradient(to right bottom, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9)",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
            bodyStyle={{
              backgroundImage:
                "linear-gradient(to right bottom, #cbdaf0, #c3e3f0, #c6eae8, #d4eedf, #e8f0d9)",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            <Gender />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row
        gutter={16}
        style={{
          margin: 20,
          padding: 10,
        }}
      >
        <Col span={12}>
          <Card
            title="Domestic Worker Current Location"
            className="fonts"
            headStyle={{
              textAlign: "center",
              color: "blue",
              fontWeight: "bolder",
              backgroundImage:
                "linear-gradient(to right bottom, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9)",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
            bodyStyle={{
              backgroundImage:
                "linear-gradient(to right bottom, #cbdaf0, #c3e3f0, #c6eae8, #d4eedf, #e8f0d9)",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            <Location />
            <div>
              <Divider />
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="Domestic Workers Home Location"
            className="fonts"
            headStyle={{
              textAlign: "center",
              color: "blue",
              fontWeight: "bolder",
              backgroundImage:
                "linear-gradient(to right bottom, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9, #e8f0d9)",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
            bodyStyle={{
              backgroundImage:
                "linear-gradient(to right bottom, #cbdaf0, #c3e3f0, #c6eae8, #d4eedf, #e8f0d9)",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            <HomeLocation />
            <div>
              <Divider />
            </div>
          </Card>
        </Col>
      </Row>
      <Divider />
    </React.Fragment>
  );
};

export default MiddleSection;
