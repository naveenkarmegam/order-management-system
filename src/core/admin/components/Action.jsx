
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EyeFill, PencilSquare, TrashFill } from 'react-bootstrap-icons';

const Actions = ({ row, handleDeleteOrder }) => {
  const location = useLocation()
  return(
  <div className="d-flex justify-content-around">
    <Link to={`/view-order/${row.original.id}`} className="btn p-0 m-0">
      <EyeFill className="fs-5 text-orange" />
    </Link>
    <Link to={`/edit-order/${row.original.id}`} className="btn p-0 m-0">
      <PencilSquare className="fs-5 text-primary" />
    </Link>
    {
      location.pathname === '/admin' && (
        <button
      className="btn p-0 m-0"
      onClick={() => handleDeleteOrder(row.original.id)}
    >
      <TrashFill className="fs-5 text-danger" />
    </button>
      )
    }
  </div>
)
  }

export default Actions;
