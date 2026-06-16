import React from 'react';

const EmptyState = ({ title, description, actionText, onAction, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-cream/30 rounded-2xl border border-orange-100/50 border-dashed">
      {Icon && <Icon className="text-4xl text-orange-200 mb-4" />}
      <h3 className="text-xl font-serif font-bold text-caramel-deep mb-2">{title}</h3>
      <p className="text-caramel-dark/70 text-sm max-w-md mb-6">{description}</p>
      {actionText && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-gradient-to-r from-primary to-gold text-white font-semibold rounded-xl shadow-soft hover:shadow-md transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
