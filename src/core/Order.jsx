import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, fetchOrders} from "../features/OrderReducer";
import { HashLoader } from "react-spinners";
import {Plus} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { config } from "../config/config";
import Layout from "./layout/Layout";
import Actions from "./admin/components/Action";
import StatusBadge from "./admin/components/Status";

import ServiceBadge from "./admin/components/ServiceBadge";

const Order = () => {
  const dispatch = useDispatch();

  const { orders, loading} = useSelector((state) => state.order_list);
  
  useEffect(()=>{
    if(orders.length === 0){
      dispatch(fetchOrders())
    }
  },[dispatch,orders])
 
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${config.ordersApi}/orders/${orderId}`);
      dispatch(deleteOrder(orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  const reversedOrders = useMemo(
    () => (orders ? [...orders].reverse() : []),
    [orders]
  );
  const columns = useMemo(
    () => [
      {
        accessorKey: 'orderId',
        header: 'Order Id',
      },
      {
        accessorKey: 'orderNumber',
        header: 'Order Number',
      },
      {
        accessorKey: 'item',
        header: 'Item',
      },
      {
        accessorKey: 'customerName',
        header: 'Customer Name',
      },
      {
        accessorKey: 'trackingCode',
        header: 'Tracking Code',
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row }) =>( <StatusBadge status={row.original.status} />),
      },
      {
        accessorKey: "shippingService",
        header: "Service",
        Cell: ({ row }) => (<ServiceBadge shippingService={row.original.shippingService} />),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (<Actions row={row}  />),
      },
    ],
    [handleDeleteOrder]
  );

  return (
    <Layout>
      <hgroup className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Orders</h1>
        <Link
          to={"/create-order"}
          className="p-0 px-2 py-1 m-0 btn bg-orange text-white shadow-sm"
        >
          {" "}
          <Plus className="fs-5 p-0 m-0" />
          create order
        </Link>
      </hgroup>
      <article className="card shadow mb-4">
        <header className="card-header py-3 mb-1">
          <h6 className="m-0 font-weight-bold text-orange text-center">
            DataTables Example
          </h6>
        </header>
        <main className="d-flex justify-content-center">
          {orders.length === 0 && loading ? (
            <HashLoader color="#DB551B" className="text-center" />
          ) : (
            <MaterialReactTable
            columns={columns}
              data={reversedOrders}
              enableGlobalFilterModes
              enableRowNumbers={true}
              initialState={{
                density: "compact",
                showGlobalFilter: true,
              }}
              
              muiSearchTextFieldProps={{
                placeholder: `Search ${orders.length} rows`,
                sx: { minWidth: "300px" },
                variant: "outlined",
              }}
              muiPaginationProps={{
                showRowsPerPage: true,
                shape: "rounded",
              }}
              paginationDisplayMode="pages"
              defaultColumn={{
                minSize: 20,
                maxSize: 9,
                size: 180,
              }}
            />
          )}
        </main>
      </article>
    </Layout>
  );
};

export default Order;
