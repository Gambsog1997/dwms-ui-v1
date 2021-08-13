import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import urlConfig from "../config";
import axios from "axios";

const HomeLocation = () => {
  const [location, setlocation] = useState([]);

  useEffect(() => {
    axios
      .get(`${urlConfig.socket}${urlConfig.url.homeLocation}`)
      .then((location) => {
        setlocation(location.data);
        console.log(location);
      });
  }, []);

  const data = [...location];
  const config = {
    data,
    height: 200,
    width: 200,
    yField: "district",
    xField: "district_no",
    seriesField: "district",
    legend: {
      position: "top-left",
    },
  };
  if (location.length === 0) {
    return <div></div>;
  } else {
    return <Bar {...config} />;
  }
};
export default HomeLocation;
