// ServiceBadge.js
import React from 'react';
import { CircleFill } from 'react-bootstrap-icons';

const ServiceBadge = ({ shippingService }) => (
  <div className={`badge`}>
    <span>{getCircleIcon(shippingService)}</span>
    <span className="ml-1 text-black">{shippingService}</span>
  </div>
);

const getCircleIcon = (shippingService) => {
  switch (shippingService) {
    case 'express':
      return <CircleFill className="text-danger small" />;
    case 'priority':
      return <CircleFill className="text-info small" />;
    case 'standard':
      return <CircleFill className="text-warning small" />;
    default:
      return <CircleFill className="text-secondarry small" />;
  }
};

export default ServiceBadge;
