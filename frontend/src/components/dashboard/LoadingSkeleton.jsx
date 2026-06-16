import React from 'react';

export const CardSkeleton = ({ count = 1 }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(count, 4)} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-cream p-6 rounded-2xl animate-pulse h-32 w-full border border-orange-100/50"></div>
      ))}
    </div>
  );
};

export const RowSkeleton = ({ count = 1 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-cream rounded-xl animate-pulse h-16 w-full border border-orange-100/50"></div>
      ))}
    </div>
  );
};

export const TableSkeleton = ({ cols = 4, rows = 5 }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-cream-dark/20 shadow-soft overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-cream-dark/10 border-b border-cream-dark/20">
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-6 py-4"><div className="h-4 bg-orange-100/50 rounded animate-pulse w-24"></div></th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-cream-dark/10">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: cols }).map((_, j) => (
                <td key={j} className="px-6 py-4"><div className="h-4 bg-cream-dark/20 rounded animate-pulse w-full"></div></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-cream-dark/20 p-6 md:p-8 shadow-soft h-[500px] animate-pulse">
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full bg-cream-dark/30 border-4 border-orange-100/50"></div>
          <div className="w-32 h-4 bg-orange-100/50 mt-4 rounded"></div>
        </div>
        <div className="space-y-6">
          <div className="h-12 w-full bg-cream rounded-xl border border-orange-100/50"></div>
          <div className="h-12 w-full bg-cream rounded-xl border border-orange-100/50"></div>
          <div className="h-12 w-full bg-cream rounded-xl border border-orange-100/50"></div>
        </div>
        <div className="h-12 w-full bg-orange-100/60 rounded-xl mt-8"></div>
      </div>
    </div>
  );
};
