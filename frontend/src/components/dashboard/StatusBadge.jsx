import React from 'react';

const StatusBadge = ({ status }) => {
  let bg = 'bg-gray-100';
  let text = 'text-gray-600';
  let border = 'border-gray-200';

  const normalizedStatus = status?.toLowerCase() || '';

  if (normalizedStatus.includes('pending')) {
    bg = 'bg-amber-100';
    text = 'text-amber-700';
    border = 'border-amber-200';
  } else if (normalizedStatus.includes('approved') || normalizedStatus.includes('success') || normalizedStatus.includes('completed')) {
    bg = 'bg-emerald-100';
    text = 'text-emerald-700';
    border = 'border-emerald-200';
  } else if (normalizedStatus.includes('rejected') || normalizedStatus.includes('failed') || normalizedStatus.includes('cancelled')) {
    bg = 'bg-red-100';
    text = 'text-red-700';
    border = 'border-red-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${bg} ${text} ${border}`}>
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
