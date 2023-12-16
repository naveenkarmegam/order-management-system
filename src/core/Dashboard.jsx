import React, { useEffect } from "react";
import LineChartOD from "./vendors/utils/LineChart";
import ReportCard from "./vendors/others/ReportCard";
import PieChartOD from "./vendors/utils/PieChart";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders} from "../features/OrderReducer";

import Layout from "./layout/Layout";
import { Archive, BoxFill, CartPlusFill, Shop, TruckFrontFill, XSquare } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const { orders, loading } = useSelector((state) => state.order_list);
  const user = JSON.parse(localStorage.getItem("user-info"));
  const dash = [
    {
      title: "total ordered",
      value: orders.length,
      icon: <TruckFrontFill className="text-gray-500 fs-1" />,
    },
    {
      title: "total delivered",
      value: orders.filter((order) => order.status === "delivered").length,
      icon: <Archive className="text-gray-500 fs-1" />,
    },
    {
      title: "new orders",
      value: orders.filter((order) => order.status === "order").length,
      icon: <CartPlusFill className="text-gray-500 fs-1" />,
    },
    {
      title: "production",
      value: orders.filter((order) => order.status === "production").length,
      icon: <Shop className="text-gray-500 fs-1" />,
    },
    {
      title: "Return",
      value: orders.filter((order) => order.status === "Return").length,
      icon: <BoxFill className="text-gray-500 fs-1" />,
    },
    {
      title: "Cancelled",
      value: orders.filter((order) => order.status === "cancelled").length,
      icon: <XSquare className="text-gray-500 fs-1" />,
    },
  ];

  const dispatch = useDispatch();

  useEffect(()=>{
    if(orders.length === 0){
      dispatch(fetchOrders())
    }
  },[dispatch,orders])
  return (
    <Layout >
      <hgroup className="d-sm-flex align-items-center justify-content-between mb-4">
        <div className="col-md-4">

        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        <div className="col-md-4 text-center">

        <h3 className="h4 ">Welcome, {`${user.firstname} ${user.lastname}`}</h3>
        </div>
        <div className="col-md-4 text-end">

        <Link to={'/create-order'} className="d-none d-sm-inline-block btn bg-orange text-white shadow-sm"><i className="bi bi-plus" /> Create Order</Link>
        </div>
      </hgroup>
      <section className="row">
        {dash.map((report, index) => (
          <ReportCard {...report} loading={loading} key={index} />
        ))}
      </section>
      <article className="row ">
        <section className="col-xl-8 col-lg-7 d-none d-md-block">
          <div className="card shadow">
            <header className="card-header py-3 text-center">
              <h6 className="m-0 font-weight-bold text-orange">
                Earnings Overview
              </h6>
            </header>
            <main className="card-body">
              <div className="chart-area">
                <LineChartOD />
              </div>
            </main>
          </div>
        </section>
        <section className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <header className="card-header py-3 text-center">
              <h6 className="m-0 font-weight-bold text-orange">
                Revenue Sources
              </h6>
            </header>
            <main className="card-body">
              <div className="chart-pie d-flex justify-content-center">
                <PieChartOD  orders={orders}/>
              </div>
              <div className="mt-4 text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-primary" /> standard
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-success" /> priority
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-info" /> Express
                </span>
              </div>
            </main>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default Dashboard;
