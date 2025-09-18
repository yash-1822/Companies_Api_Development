import React from "react";
import { Loader2 } from "lucide-react";

const CompanyLoading = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    <span className="ml-3 text-gray-600">Loading companies...</span>
  </div>
);

export default CompanyLoading;
