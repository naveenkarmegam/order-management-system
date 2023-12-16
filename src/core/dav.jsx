// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteOrder, fetchOrders, setLoading, setOrder } from "../features/OrderReducer";
// import { HashLoader } from "react-spinners";
// import {
//   CircleFill,
//   Download,
//   EyeFill,
//   PencilSquare,
//   Plus,
//   TrashFill,
// } from "react-bootstrap-icons";
// import { Link } from "react-router-dom";
// import { MaterialReactTable } from "material-react-table";
// import { mainTable } from "./vendors/Table/mainTable";
// import axios from "axios";
// import { config } from "../config/config";
// import Layout from "./layout/Layout";
// import { jsPDF } from 'jspdf'; //or use your library of choice here
// import autoTable from 'jspdf-autotable';
// import { Box, Button } from '@mui/material';

// const Admin = () => {
//   const dispatch = useDispatch();

//   const { orders, loading} = useSelector((state) => state.order_list);
  
//   useEffect(()=>{
//     if(orders.length === 0){
//       dispatch(fetchOrders())
//     }
//   },[dispatch,orders])
 
//   const handleDeleteOrder = async (orderId) => {
//     try {
//       await axios.delete(`${config.ordersApi}/orders/${orderId}`);
//       dispatch(deleteOrder(orderId));
//     } catch (error) {
//       console.error("Error deleting order:", error);
//     }
//   };
//   const actions = [
//     {
//       accessorKey: "actions",
//       header: "Actions",
//       Cell: ({ row }) => (
//         <div className="d-flex justify-content-around">
//           <Link to={`/view-order/${row.original.id}`} className="btn p-0 m-0">
//             <EyeFill className="fs-5 text-orange" />
//           </Link>
//           <Link to={`/edit-order/${row.original.id}`} className="btn p-0 m-0">
//             <PencilSquare className="fs-5 text-primary" />
//           </Link>
//           <button
//             className="btn p-0 m-0"
//             onClick={() => handleDeleteOrder(row.original.id)}
//           >
//             <TrashFill className="fs-5 text-danger" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const columns = useMemo(
//     () => [
//       ...mainTable,
//       {
//         accessorKey: "status",
//         header: "Status",
//         Cell: ({ row }) => {
//           const { status } = row.original;
//           return (
//             <div
//               className={`badge border p-1 ${
//                 status === "cancelled"
//                   ? "border-danger bg-danger-subtle text-danger"
//                   : status === "order"
//                   ? "border-primary bg-primary-subtle text-primary"
//                   : status === "production"
//                   ? "border-warning bg-warning-subtle text-warning"
//                   : status === "delivered"
//                   ? "border-success bg-success-subtle text-success"
//                   : "border-secondary bg-secondary-subtle text-secondary"
//               }`}
//             >
//               {status}
//             </div>
//           );
//         },
//       },
//       {
//         accessorKey: "shippingService",
//         header: "Service",
//         Cell: ({ row }) => {
//           const { shippingService } = row.original;

//           return (
//             <div className={`badge`}>
//               <span>
//                 {shippingService === "express" ? (
//                   <CircleFill className="text-danger small" />
//                 ) : shippingService === "priority" ? (
//                   <CircleFill className="text-info small" />
//                 ) : shippingService === "standard" ? (
//                   <CircleFill className="text-warning small" />
//                 ) : (
//                   <CircleFill className="text-secondarry small" />
//                 )}
//               </span>

//               <span className="ml-1 text-black">{shippingService}</span>
//             </div>
//           );
//         },
//       },
//       ...actions,
//     ],
//     [handleDeleteOrder]
//   );

//   const handleExportRows = (rows) => {
//     const doc = new jsPDF();
//     const tableData = rows.map((row) => Object.values(row.original));
//     const tableHeaders = columns.map((c) => c.header);

//     autoTable(doc, {
//       head: [tableHeaders],
//       body: tableData,
//     });

//     doc.save('order-info.pdf');
//   };

//   const t = ({ table }) => (
//     <Box
//       sx={{
//         display: 'flex',
//         gap: '16px',
//         padding: '8px',
//         flexWrap: 'wrap',
//       }}
//     >
//       <Button
//         disabled={table.getPrePaginationRowModel().rows.length === 0}
//         onClick={() =>
//           handleExportRows(table.getPrePaginationRowModel().rows)
//         }
//         startIcon={<Download />}
//       >
//         Export All Rows
//       </Button>
//       <Button
//         disabled={table.getRowModel().rows.length === 0}
//         onClick={() => handleExportRows(table.getRowModel().rows)}
//         startIcon={<FileDownloadIcon />}
//       >
//         Export Page Rows
//       </Button>
//     </Box>
//   )
//   return (
//     <Layout>
//       <hgroup className="d-sm-flex align-items-center justify-content-between mb-4">
//         <h1 className="h3 mb-0 text-gray-800">Orders</h1>
//         <Link
//           to={"/create-order"}
//           className="p-0 px-2 py-1 m-0 btn bg-orange text-white shadow-sm"
//         >
//           {" "}
//           <Plus className="fs-5 p-0 m-0" />
//           create order
//         </Link>
//       </hgroup>
//       <article className="card shadow mb-4">
//         <header className="card-header py-3 mb-1">
//           <h6 className="m-0 font-weight-bold text-orange text-center">
//             DataTables Example
//           </h6>
//         </header>
//         <main className="d-flex justify-content-center">
//           {orders.length === 0 && loading ? (
//             <HashLoader color="#DB551B" className="text-center" />
//           ) : (
//             <MaterialReactTable
//             renderTopToolbarCustomActions={t}
//               columns={columns}
//               data={orders}
//               enableGlobalFilterModes
//               enableRowNumbers={true}
//               initialState={{
//                 showGlobalFilter: true,
//               }}
//               positionGlobalFilter="left"
//               muiSearchTextFieldProps={{
//                 placeholder: `Search ${orders.length} rows`,
//                 sx: { minWidth: "300px" },
//                 variant: "outlined",
//               }}
//               muiPaginationProps={{
//                 showRowsPerPage: true,
//                 shape: "rounded",
//               }}
//               paginationDisplayMode="pages"
//               defaultColumn={{
//                 minSize: 20,
//                 maxSize: 9,
//                 size: 180,
//               }}
//             />
//           )}
//         </main>
//       </article>
//     </Layout>
//   );
// };

// export default Admin;


<form className="">
<fieldset className="form-group card shadow border">
  <legend className="text-center card-header m-0 bg-orange text-white p-0">Personal Information</legend>
  <div className="card-body d-flex flex-wrap">
  <div className="col-sm-6 mb-3">
    <label htmlFor="firstname" className="form-label ml-2">
      First Name
    </label>
    <input
      type="text"
      name="firstname"
      id="firstname"
      value={formik.values.firstname}
      className="form-control form-control-profile px-3 py-4"
      placeholder="first name"
    />
  </div>
  <div className="col-sm-6 mb-3 ">
    <label htmlFor="lastname" className="form-label ml-2">
      Last Name
    </label>
    <input
      type="text"
      name="lastname"
      id="lastname"
      className="form-control form-control-profile px-3 py-4"
      placeholder="last name"
    />
  </div>
  <div className="col-sm-6 mb-3 ">
    <label htmlFor="email" className="form-label ml-2">
      Email
    </label>
    <input
      type="text"
      name="email"
      id="email"
      className="form-control form-control-profile px-3 py-4"
      placeholder="e-mail"
    />
  </div>
  <div className="col-sm-6 mb-3 ">
    <label htmlFor="number" className="form-label ml-2">
     Mobile
    </label>
    
    <input
      type="number"
      name="number"
      id="number"
      className="form-control form-control-profile px-3 py-4"
      placeholder="number"
    />
  </div>


  </div>
</fieldset>
<fieldset className="form-group card shadow ">
  <legend className="card-header text-center m-0 bg-orange text-white p-0">
    Address
  </legend>
  <div className="card-body d-flex flex-wrap">
  <div className="col-sm-6 mb-3">
    <label htmlFor="street" className="form-label ml-2">Street/D.No</label>
    <input type="text" name="street" id="street" className="form-control form-control-profile px-3 py-4" placeholder="street" />
  </div>
  <div className="col-sm-6 mb-3">
    <label htmlFor="town" className="form-label ml-2">Town/Village</label>
    <input type="text" name="town" id="town" className="form-control form-control-profile px-3 py-4" placeholder="town" />
  </div>
  <div className="col-sm-6 mb-3">
    <label htmlFor="city" className="form-label ml-2">City</label>
    <input type="text" name="city" id="city" className="form-control form-control-profile px-3 py-4" placeholder="city" />
  </div>
  <div className="col-sm-6 mb-3">
    <label htmlFor="country" className="form-label ml-2">Country</label>
    <input type="text" name="country" id="country" className="form-control form-control-profile px-3 py-4" placeholder="country" />
  </div>
  <div className="col-sm-6 mb-3">
    <label htmlFor="zipcode" className="form-label ml-2">Pincode</label>
    <input type="number" name="zipcode" id="zipcode" className="form-control form-control-profile px-3 py-4" placeholder="zipcode" />
  </div>

  </div>

</fieldset>
<div className="d-grid gap-2 col-lg-4 mx-auto mt-4">
  <button type="submit" className="btn btn-primary ">
    save
  </button>
</div>
</form>