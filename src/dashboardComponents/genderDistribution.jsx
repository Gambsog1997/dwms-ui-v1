import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";
import axios from "axios";
import urlConfig from "../config";

const Gender = () => {
  const [gender, setgender] = useState([]);
  useEffect(() => {
    axios.get(`${urlConfig.socket}${urlConfig.url.gender}`).then((gender) => {
      console.log(gender);
      setgender(gender.data);
    });
  }, []);

  const data = [...gender];
  const config = {
    appendPadding: 35,
    data,
    angleField: "count",
    colorField: "gender",
    height: 200,
    radius: 1,
    label: { type: "outer" },
    interactions: [{ type: "element-active" }],
  };
  if (gender.length === 0) {
    return <div></div>;
  } else {
    return <Pie {...config} />;
  }
};

export default Gender;
