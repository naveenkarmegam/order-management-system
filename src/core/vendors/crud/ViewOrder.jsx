import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { viewOrder } from "../../../features/OrderReducer";
import axios from "axios";
import { config } from "../../../config/config";
import Layout from "../../layout/Layout";
import { HashLoader } from "react-spinners";

const ViewOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { viewOrderInfo, loading } = useSelector((state) => state.order_list);

  useEffect(() => {
    const getData = async () => {
      try {
        const order = await axios.get(
          `${config.ordersApi}/orders/${params.id}`
        );
        dispatch(viewOrder(order.data));
        console.log(viewOrderInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [dispatch, params.id]);
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">Order </h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow">
            <div className="card-header py-3 text-center">
              <h6 className="m-0 font-weight-bold text-orange">
                Order Overview
              </h6>
            </div>
            <div className="card-body">
              <div>
                {loading ? (

                  <HashLoader />
                ) : (
                   viewOrderInfo && (<div className="table-responsive ">
                   <table className="table table-bordered table-striped">
                     <tbody>
                       <tr>
                         <th className="text-end">Customer Name</th>
                         <td className="">{viewOrderInfo.customerName}</td>
                       </tr>
                       <tr>
                         <th className="text-end">Oder Id</th>
                         <td>{viewOrderInfo.orderId}</td>
                       </tr>
                       <tr>
                         <th className="text-end">Oder Number</th>
                         <td>{viewOrderInfo.orderNumber}</td>
                       </tr>
                       <tr>
                         <th className="text-end">Item Number</th>
                         <td>{viewOrderInfo.item}</td>
                       </tr>
                       <tr>
                         <th className="text-end">status</th>
                         <td>{viewOrderInfo.status}</td>
                       </tr>
                       <tr>
                         <th className="text-end">Shipping Service</th>
                         <td>{viewOrderInfo.shippingService}</td>
                       </tr>
                       <tr>
                         <th className="text-end">Address</th>
                         <td> <div>{`${viewOrderInfo.address?.street}, ${viewOrderInfo.address?.town}`}</div>
                         <span>{`${viewOrderInfo.address?.city}, ${viewOrderInfo.address?.country}, ${viewOrderInfo.address?.zipcode}`}</span></td>
                         
                       </tr>
                       <tr>
                         <th className="text-end">Tracking Code</th>
                         <td>{viewOrderInfo.trackingCode}</td>
                       </tr>
                       
                     </tbody>
                   </table>
                 </div>)
                  )}
              </div>
            </div>
            <div className="card-footer text-center">
                  <Link to={'/order'} className="btn bg-orange text-white"><i class="bi bi-arrow-left mr-2"></i>Back To Table</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewOrder;
