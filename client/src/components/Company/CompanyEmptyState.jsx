import React from "react";

const CompanyEmptyState = ({ searchTerm, filters, onAddCompany }) => (
  <div className="text-center py-12">
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {searchTerm || filters.industry || filters.location
          ? "No companies found"
          : "No companies yet"}
      </h3>
      <p className="text-gray-500 mb-6">
        {searchTerm || filters.industry || filters.location
          ? "Try adjusting your search or filters to find companies."
          : "Get started by adding your first company to the database."}
      </p>
      {!searchTerm && !filters.industry && !filters.location && (
        <button
          onClick={onAddCompany}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add First Company
        </button>
      )}
    </div>
  </div>
);

export default CompanyEmptyState;
