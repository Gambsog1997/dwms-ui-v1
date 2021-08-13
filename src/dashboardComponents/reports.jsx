import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import urlConfig from "../config";
import axios from "axios";

const Reports = () => {
  const [report, setreport] = useState([]);
  useEffect(() => {
    axios.get(`${urlConfig.socket}${urlConfig.url.report}`).then((results) => {
      console.log(results);
      setreport(results.data);
    });
  }, []);
  var config = {
    data: report.length !== 0 ? report : [],
    isGroup: true,
    xField: "level_count",
    height: 200,
    yField: "category",
    seriesField: "level",
    marginRatio: 0,
    label: {
      position: "middle",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
      ],
    },
  };
  if (report.length === 0) {
    return <div></div>;
  } else {
    return <Bar {...config} />;
  }
};

export default Reports;
