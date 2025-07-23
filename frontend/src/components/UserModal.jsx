import React from 'react';
import { X, Mail, MapPin, Calendar, UserCheck, CreditCard, Award } from 'lucide-react';

const UserModal = ({ user, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'banned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">User Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Header */}
          <div className="flex items-center mb-6">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                {user.isVerified && (
                  <UserCheck className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            </div>
          </div>

          {/* User Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{user.age} years old, {user.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Joined:</span>
                  <span className="text-sm text-gray-900">{user.joinDate}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Account Status</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Verification:</span>
                  <span className={`text-sm font-medium ${user.isVerified ? 'text-green-600' : 'text-gray-600'}`}>
                    {user.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Referral Status:</span>
                  <span className="text-sm text-gray-900">{user.referralStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Activity Overview</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-lg font-semibold text-gray-900">{user.completedTasks}</div>
                <div className="text-xs text-gray-500">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-lg font-semibold text-gray-900">${user.walletBalance.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Wallet Balance</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-lg font-semibold text-gray-900">{user.referrals || 0}</div>
                <div className="text-xs text-gray-500">Referrals</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Last login</span>
                <span className="text-sm text-gray-900">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Last task completed</span>
                <span className="text-sm text-gray-900">1 day ago</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Profile updated</span>
                <span className="text-sm text-gray-900">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;