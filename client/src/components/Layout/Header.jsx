import React from 'react';
import { Search, Building2, Menu, Plus } from 'lucide-react';


const Header = ({ searchTerm, onSearchChange, onMenuToggle, onAddCompany, isMobile, isTablet }) => {
  const isCompact = isMobile || isTablet; 

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger if compact, else logo */}
            {isCompact ? (
              <>
                <button
                  onClick={onMenuToggle}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-8 h-8 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900">CompanyHub</h1>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-8 h-8 text-blue-600" />
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">CompanyHub</h1>
                  </div>
                </div>
                <div className="flex-1 max-w-lg mx-8">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search companies by name, description, or address..."
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={onAddCompany}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden md:inline">Add Company</span>
                  <span className="md:hidden">Add</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="h-16"></div>

      {/* Compact mode: Search & Add below header */}
      {isCompact && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                />
              </div>
            </div>
            <button
              onClick={onAddCompany}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center space-x-1 font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      )}
      {isCompact && <div className="h-9"></div>}

    </>
  );
};

export default Header;
