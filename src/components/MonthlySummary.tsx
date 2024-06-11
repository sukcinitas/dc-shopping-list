import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { selectMonthlyItems } from "../store/reducers/statisticsSlice";
import "../sass/MonthlySummary.scss";
import "../sass/headings.scss";

const HistoryMonth = () => {
  const items = useSelector(selectMonthlyItems);
  const renderLineChart = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={items}
        margin={{
          top: 15,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="items"
          stroke="#F9A109"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
  if (items.length < 1) {
    return (
      <div className="monthly-summary">
        <h1 className="heading">Monthly Summary</h1>
        <p className="subheading subheading--top">More data is needed!</p>
      </div>
    );
  }
  return (
    <div className="monthly-summary">
      <h1 className="heading">Monthly Summary</h1>
      <div style={{ width: "100%", height: "300px" }}>{renderLineChart}</div>
    </div>
  );
};

export default HistoryMonth;
