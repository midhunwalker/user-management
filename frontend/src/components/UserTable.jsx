import React from 'react';
import {
  Eye,
  Plus,
  UserCheck,
  UserX,
  CreditCard,
  MapPin,
  Calendar,
} from 'lucide-react';

const UserTable = ({ users, onUserAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'banned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getReferralColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'none':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (users.length === 0) {
    return (
      <div className="bg-transparent rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p className="text-gray-600">No users found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="bg-gray-200">
              <th className="rounded-tl-lg px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Wallet
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Referral
              </th>
              <th className="rounded-tr-lg px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-transparent divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover border border-gray-500"
                    src={user.avatar}
            
                  />

                    <div className="ml-4">
                      <div className="font-medium text-gray-900 flex items-center gap-1">
                        {user.name}
                        {user.isVerified && (
                          <UserCheck className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {user.age} years, {user.gender}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    ₹{user.walletBalance.toFixed(2)}
                  </div>
                  <div className="text-gray-500">
                    {user.completedTasks} tasks completed
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReferralColor(
                      user.referralStatus
                    )}`}
                  >
                    {user.referralStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUserAction('view', user)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUserAction('tasks', user)}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                      title="Assign Tasks"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUserAction('verify', user)}
                      className={`p-1 rounded transition-colors ${
                        user.isVerified
                          ? 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50'
                          : 'text-blue-600 hover:text-blue-900 hover:bg-blue-50'
                      }`}
                      title={
                        user.isVerified
                          ? 'Remove Verification'
                          : 'Verify User'
                      }
                    >
                      <UserCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUserAction('ban', user)}
                      className={`p-1 rounded transition-colors ${
                        user.status === 'banned'
                          ? 'text-green-600 hover:text-green-900 hover:bg-green-50'
                          : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                      }`}
                      title={
                        user.status === 'banned' ? 'Unban User' : 'Ban User'
                      }
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUserAction('wallet', user)}
                      className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50 transition-colors"
                      title="Adjust Wallet"
                    >
                      <CreditCard className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
