// StatusBadge.js
import React from 'react';

const StatusBadge = ({ status }) => (
  <div className={`badge border p-1 ${getBadgeClasses(status)}`}>
    {status}
  </div>
);

const getBadgeClasses = (status) => {
  switch (status) {
    case 'cancelled':
      return 'border-danger bg-danger-subtle text-danger';
    case 'order':
      return 'border-primary bg-primary-subtle text-primary';
    case 'production':
      return 'border-warning bg-warning-subtle text-warning';
    case 'delivered':
      return 'border-success bg-success-subtle text-success';
    default:
      return 'border-secondary bg-secondary-subtle text-secondary';
  }
};

export default StatusBadge;
