import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import FilterPanel from '../components/FilterPanel';
import UserModal from '../components/UserModal';
import TaskModal from '../components/TaskModal';
import WalletModal from '../components/WalletModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    ageRange: '',
    gender: '',
    referralStatus: '',
    status: ''
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !filters.location || user.location.includes(filters.location);
      const matchesGender = !filters.gender || user.gender === filters.gender;
      const matchesReferral = !filters.referralStatus || user.referralStatus === filters.referralStatus;
      const matchesStatus = !filters.status || user.status === filters.status;
      
      let matchesAge = true;
      if (filters.ageRange) {
        const [min, max] = filters.ageRange.split('-').map(Number);
        matchesAge = user.age >= min && user.age <= max;
      }

      return matchesSearch && matchesLocation && matchesGender && matchesReferral && matchesStatus && matchesAge;
    });
  }, [users, searchQuery, filters]);

  // Handle user actions
  const handleUserAction = async (action, user) => {
    try {
      switch (action) {
        case 'view':
          setSelectedUser(user);
          setModalType('profile');
          break;
          
        case 'tasks':
          setSelectedUser(user);
          setModalType('tasks');
          break;
          
        case 'wallet':
          setSelectedUser(user);
          setModalType('wallet');
          break;
          
        case 'verify':
          await axios.patch(`http://localhost:5000/api/users/${user._id}`, {
            isVerified: !user.isVerified
          });
          setUsers(prev => prev.map(u => 
            u._id === user._id ? { ...u, isVerified: !u.isVerified } : u
          ));
          break;
          
        case 'ban':
          const newStatus = user.status === 'banned' ? 'active' : 'banned';
          await axios.patch(`http://localhost:5000/api/users/${user._id}`, {
            status: newStatus
          });
          setUsers(prev => prev.map(u => 
            u._id === user._id ? { ...u, status: newStatus } : u
          ));
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error performing user action:', error);
    }
  };

  // Update wallet balance
  const handleWalletUpdate = async (userId, newBalance) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}`, {
        walletBalance: newBalance
      });
      setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, walletBalance: newBalance } : u
      ));
    } catch (error) {
      console.error('Error updating wallet:', error);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-600">
        <Loader2 className="animate-spin h-12 w-12 text-gray-700" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-8 md:p-16 lg:p-24 pb-20 sm:pb-24 md:pb-32 bg-gradient-to-br from-white to-slate-600">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage users, assign tasks, and handle verification</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="rounded-lg shadow-sm mb-6">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-blue-50 border-gray-700 text-black' 
                  : 'bg-white border-gray-700 text-gray-700 hover:bg-gray-500'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              users={users}
            />
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        onUserAction={handleUserAction}
      />

      {/* Modals */}
      {modalType === 'profile' && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={closeModal}
        />
      )}

      {modalType === 'tasks' && selectedUser && (
        <TaskModal
          user={selectedUser}
          onClose={closeModal}
        />
      )}

      {modalType === 'wallet' && selectedUser && (
        <WalletModal
          user={selectedUser}
          onClose={closeModal}
          onWalletUpdate={handleWalletUpdate}
        />
      )}
    </div>
  );
};

export default UserManagement;