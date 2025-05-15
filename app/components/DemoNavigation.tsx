'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DemoNavigation: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm mb-6">
      <div className="mx-auto px-4">
        <div className="flex space-x-4 py-3">
          <Link
            href="/task-management-demo"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/task-management-demo')
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            Task Management
          </Link>
          <Link
            href="/datagrid-demo"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/datagrid-demo')
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            User Management
          </Link>

        </div>
      </div>
    </div>
  );
};

export default DemoNavigation;
