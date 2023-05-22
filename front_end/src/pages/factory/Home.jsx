import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import httpRequest, { category } from "~/api/httpRequest";
import Datatable from "~/components/datable/Datatable";
import { statisticalFatoryColumns } from "~/data/datatablesource";
const cx = classNames.bind(styles);

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `/factory/statistical/product`;
        const data = await httpRequest.getStatistical(url);
        const myData = data.map((item, index) => {
          return {
            ...item,
            id: index + 1,
            _id: index + 1,
            Error: item.errorQuantity,
            Sales: item.totalSales,
          };
        });
        setData(myData);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);
  console.log(data);
  return (
    <>
      <div className={cx("wrapper")}>
        <h3>Statistical chart</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="productCode" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
            <Bar dataKey="Error" fill="#82ca9d" />
            <Bar dataKey="Sales" fill="#fdc16a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={cx("table")}>
        <Datatable
          columns={statisticalFatoryColumns}
          type={category.statisticalStore}
          mydata={data}
          detail
          page="warranty"
          hideAction
        />
      </div>
    </>
  );
}