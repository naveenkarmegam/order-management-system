import React, { useEffect, useMemo} from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-bootstrap-icons";
// import { customerData } from "./vendors/Table/data";
import { MaterialReactTable } from "material-react-table";
import Layout from "./layout/Layout";
import StatusBadge from "./admin/components/Status";
import ServiceBadge from "./admin/components/ServiceBadge";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../features/FunctionalReducer";
import { fetchOrders } from "../features/OrderReducer";

const Listing = () => {
  const {searchInput} = useSelector(state=>state.funactionality)
  const {orders} = useSelector(state=>state.order_list)
  const dispatch = useDispatch()
  useEffect(()=>{ 
    if(orders.length === 0) {
      dispatch(fetchOrders())
    }
  },[dispatch,orders.length])
  const uniqueCities = [
    ...new Set(orders.map((item) => item.address.city)),
  ];
  

  const filteredCities = uniqueCities.filter((city) =>
    city.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearch = (e) => dispatch(setSearchInput(e.target.value)) ;

  const columns = useMemo(() => [
    {
      accessorKey: 'customerName',
      header: 'Customer Name',
    },
    {
      accessorKey: 'address.zipcode',
      header: 'Zip Code',
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ row }) => <StatusBadge status={row.original.status} />
    },
    {
      accessorKey: "shippingService",
      header: "Service",
      Cell: ({ row }) => <ServiceBadge shippingService={row.original.shippingService} />
    },
  ]);

  return (
    <Layout>
      <article className="d-sm-flex align-items-center justify-content-between mb-4">
        <section className="col-md-4">
          <h1 className="h3 mb-0 text-gray-800">Listing</h1>
        </section>
        <section className="col-md-4">
          <input
            type="search"
            className="form-control flex-fill"
            onChange={(e) => handleSearch(e)}
            placeholder="Search here"
          />
        </section>
        <section className="col-md-4 text-end">
          <Link
            to={"/create-order"}
            className="p-0 px-2 py-1 m-0  btn bg-orange text-white shadow-sm"
          >
            <Plus className="fs-5 p-0 m-0" />
            create order
          </Link>
        </section>
      </article>
      <article className="row">
        {filteredCities.map((city) => (
          <main key={city} className="col-lg-6 mb-4">
            <section className="card shadow h-100">
              <header className="card-header text-center py-3 mb-1">
                <h6 className="m-0 font-weight-bold text-orange text-center">
                  {city}
                </h6>
              </header>
              <MaterialReactTable
                columns={columns}
                data={orders.filter((item) => item.address.city === city)}
                enableRowNumbers={true}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                initialState={{
                  density: "compact",
                  showColumnFilters: false,
                  pagination: {
                    pageSize: 5,
                  },
                }}
                muiTableBodyProps={{
                  sx: {
                    textAlign: "center",
                  },
                }}
                muiSearchTextFieldProps={{
                  placeholder: `Search ${orders.filter((item) => item.address.city === city)
                      .length
                    } rows`,
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
                  maxSize: 100,
                  size: 180,
                }}
              />
            </section>
          </main>
        ))}
      </article>
    </Layout>
  );
};

export default Listing;
