import React from 'react';

const FilterPanel = ({ filters, onFilterChange, users }) => {
  const locations = [...new Set(users.map(user => user.location))];
  const genders = [...new Set(users.map(user => user.gender))];
  const statuses = [...new Set(users.map(user => user.status))];
  const referralStatuses = [...new Set(users.map(user => user.referralStatus))];

  const ageRanges = [
    { label: '18-25', value: '18-25' },
    { label: '26-35', value: '26-35' },
    { label: '36-45', value: '36-45' },
    { label: '46-55', value: '46-55' },
    { label: '56+', value: '56-100' },
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      location: '',
      ageRange: '',
      gender: '',
      referralStatus: '',
      status: ''
    });
  };

  return (
    <div className="mt-4 pt-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 border-separate">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Age Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age Range
          </label>
          <select
            value={filters.ageRange}
            onChange={(e) => handleFilterChange('ageRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Ages</option>
            {ageRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Genders</option>
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        {/* Referral Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Referral Status
          </label>
          <select
            value={filters.referralStatus}
            onChange={(e) => handleFilterChange('referralStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Referrals</option>
            {referralStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm text-gray-600 bg-slate-300 hover:text-gray-100 hover:bg-gray-800 rounded-md transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;