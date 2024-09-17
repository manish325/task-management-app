import React from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import './EmptyState.scss';

export const EmptyState = () => {
  return (
    <div className="empty-state">
      <FaRegSadCry className="empty-state-icon" />
      <h3 className="empty-state-title">No Data Available</h3>
      <p className="empty-state-message">There is no content to display here.</p>
    </div>
  );
};

