import { Col, Row, Typography, Image, Divider } from "antd";
import React from "react";
import Background from "./services/Components/bodyBackground";
import NavBar from "./services/Components/navbar";
import workflow from "./assets/download.jpeg";
import worker from "./assets/couch.jpg";
import worker2 from "./assets/download (2).jpeg";
import jacket from "./assets/download (1).jpeg";
import "./App.css";

function LandingPage(props) {
  return (
    <div
      id="wrapper"
      className="fonts"
      style={{
        backgroundColor: "",
    overflow:"hidden"
      }}
    >
      <NavBar />
      <Background />
      <Divider
        style={{
          color: "blue",
        }}
      />
      <Row>
        <Col span={8} offset={1}>
          <Typography.Title level={3}>House Maids</Typography.Title>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam in
            hic est, obcaecati eius vel iusto voluptas vero sint saepe! Modi
            molestiae molestias doloremque corrupti consequatur itaque tempore
            delectus tempora.
          </p>
        </Col>
        <Col span={3} />
        <Col span={8}>
          <Image src={workflow} width={200} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={8}>
        <Col span={8} offset={1}>
          <Image src={worker} width={200} />
        </Col>
        <Col span={3}></Col>
        <Col span={8} offset={1}>
          <Typography.Title level={3}>Residential Cleaning</Typography.Title>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            facere culpa quod. Natus blanditiis inventore quasi iure perferendis
            dolores, fugit aspernatur consequuntur, aliquid fugiat voluptatem
            quo alias atque animi quod.
          </p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8} offset={1}>
          <Typography.Title level={3}>Hotel Cleaning</Typography.Title>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
            harum enim quae debitis accusamus facere dignissimos amet quis
            aliquam qui dolorem unde doloremque facilis cumque, alias impedit
            saepe mollitia sint.
          </p>
        </Col>
        <Col span={3} />
        <Col span={8}>
          <Image src={jacket} width={200} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={8}>
        <Col span={1} />
        <Col span={8}>
          <Image src={worker2} width={200} />
        </Col>
        <Col span={3}></Col>
        <Col span={8} offset={1}>
          <Typography.Title level={3}>Commercial Cleaning</Typography.Title>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            facere culpa quod. Natus blanditiis inventore quasi iure perferendis
            dolores, fugit aspernatur consequuntur, aliquid fugiat voluptatem
            quo alias atque animi quod.
          </p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12} offset={6}>
          <div
            style={{
              textAlign: "justify",
            }}
          >
            <Typography.Title level={4} id="about">
              About us
            </Typography.Title>
            <Typography.Paragraph copyable={true}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              officiis praesentium quo quam voluptates. Alias, quasi? Omnis
              eveniet, quae perferendis doloremque ea deserunt tempora? Ratione
              ipsa vel perferendis maxime repellendus.
            </Typography.Paragraph>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12} offset={6}>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              officiis praesentium quo quam voluptates. Alias, quasi? Omnis
              eveniet, quae perferendis doloremque ea deserunt tempora? Ratione
              ipsa vel perferendis maxime repellendus.
            </p>
            <strong>
              <em
                style={{
                  color: "blue",
                }}
              >
                <code>copyright@2021</code>
              </em>
            </strong>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
