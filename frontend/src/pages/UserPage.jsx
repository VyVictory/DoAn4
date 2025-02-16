import React from 'react';

const UserPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the User Page</h1>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        <p className="text-gray-700">Name: John Doe</p>
        <p className="text-gray-700">Email: john.doe@example.com</p>
        {/* Add more user details as needed */}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
        <ul className="list-disc list-inside">
          <li className="text-gray-700">Logged in at 10:00 AM</li>
          <li className="text-gray-700">Updated profile at 10:30 AM</li>
          {/* Add more activities as needed */}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;