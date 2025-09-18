import React from 'react';
import { Filter, ArrowUpDown, X, Plus } from 'lucide-react';


const Sidebar = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onAddCompany,
  isMobile,
  isTablet
}) => {
  const sortOptions = [
    { value: 'name', label: 'Company Name' },
    { value: 'foundedYear', label: 'Founded Year' },
    { value: 'totalBranches', label: 'Total Branches' },
    { value: 'totalClients', label: 'Total Clients' },
    { value: 'employeeCount', label: 'Employee Count' }
  ];

  const industryOptions = ["IT", "Energy", "Healthcare", "Finance", "Manufacturing", "Education"];
  const locationOptions = ["Hyderabad", "Mumbai", "Chennai", "Noida", "Bengaluru"];


  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      industry: '',
      location: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
  ${isMobile || isTablet ? 'fixed' : 'sticky'} 
  ${isMobile || isTablet ? '' : 'left-0 top-16'} 
  ${isMobile || isTablet ? 'h-screen w-80' : 'h-[calc(100vh-4.8rem)] w-80'} 
        top-0 left-0 lg:z-0 z-50 h-screen w-80 bg-white border-r border-gray-200 shadow-lg
        transform transition-transform duration-300 ease-in-out
  ${isMobile || isTablet ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
`}>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Filters & Actions</h2>
            </div>
            {(isMobile || isTablet) && (
              <button
                onClick={onClose}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Add Company Button */}
          <button
            onClick={onAddCompany}
            className="w-full mb-4 md:mb-6 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Company</span>
          </button>

          {/* Filters Section */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={filters.industry || ''}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">All Industries</option>
                {industryOptions.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">All Locations</option>
                {locationOptions.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sorting Section */}
            <div className="border-t border-gray-200 pt-md-6 pt-3">
              <div className="flex items-center space-x-2 mb-4">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-700">Sort By</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field
                  </label>
                  <select
                    value={filters.sortBy || 'name'}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFilterChange('sortOrder', 'asc')}
                      className={`
        flex-1 px-3 py-2 text-sm font-medium rounded-md border
        transition-colors duration-200
        ${filters.sortOrder === 'asc'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
      `}
                    >
                      Asc
                    </button>
                    <button
                      onClick={() => handleFilterChange('sortOrder', 'desc')}
                      className={`
        flex-1 px-3 py-2 text-sm font-medium rounded-md border
        transition-colors duration-200
        ${filters.sortOrder === 'desc'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
      `}
                    >
                      Dsc
                    </button>
                  </div>
                </div>



              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="w-full  px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;