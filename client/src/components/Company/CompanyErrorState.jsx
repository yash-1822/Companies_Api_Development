import React from "react";
import { AlertCircle } from "lucide-react";

const CompanyErrorState = ({ error, onRetry }) => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default CompanyErrorState;
