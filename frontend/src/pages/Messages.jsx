import React, { useState } from 'react';
import { Bars3Icon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const Messages = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRightbarOpen, setRightbarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white p-4 transition-all ${isSidebarOpen ? 'w-64' : 'w-16'} lg:w-64`}>
        <button className="lg:hidden" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold">Danh sách</h2>
          <ul className="mt-4 space-y-2">
            <li>Bạn bè</li>
            <li>Nhóm</li>
          </ul>
        </div>
      </div>
      {/* Chat Section */}
      <div className="flex-1 flex flex-col p-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Nhắn tin</h2>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Tin nhắn sẽ hiển thị ở đây...</p>
        </div>
      </div>

      {/* Rightbar */}
      <div className={`bg-gray-200 p-4 transition-all ${isRightbarOpen ? 'w-64' : 'w-16'} lg:w-64`}>
        <button className="lg:hidden" onClick={() => setRightbarOpen(!isRightbarOpen)}>
          <ExclamationCircleIcon className="h-6 w-6 text-gray-600" />
        </button>
        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold">Thông tin</h2>
          <p className="mt-4 text-gray-700">Chi tiết người dùng...</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
