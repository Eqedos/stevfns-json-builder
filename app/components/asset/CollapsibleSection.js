// CollapsibleSection.jsx
import React, { useState } from 'react';

export default function CollapsibleSection({ title, children, defaultCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="mb-4 border rounded">
      <div
        className="cursor-pointer bg-gray-200 p-2 flex justify-between items-center"
        onClick={toggleCollapse}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-2xl">{collapsed ? '+' : '-'}</span>
      </div>
      {!collapsed && <div className="p-4">{children}</div>}
    </div>
  );
}
