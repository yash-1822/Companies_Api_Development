import React from "react";

const CompanyFormFields = ({ formData, errors, handleChange }) => {
   const industryOptions = ["IT", "Energy", "Healthcare", "Finance", "Manufacturing", "Education"];
    const locationOptions = ["Hyderabad", "Mumbai", "Chennai", "Noida", "Bengaluru"];

  return (
    <>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
      </div>

      {/* Industry */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Industry</option>
          {industryOptions.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        {errors.industry && <p className="text-red-500 text-xs">{errors.industry}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Location</option>
          {locationOptions.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Employee Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Employee Count</label>
        <input
          type="number"
          name="employeeCount"
          value={formData.employeeCount}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.employeeCount && <p className="text-red-500 text-xs">{errors.employeeCount}</p>}
      </div>

      {/* Founded Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
        <input
          type="number"
          name="foundedYear"
          value={formData.foundedYear}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.foundedYear && <p className="text-red-500 text-xs">{errors.foundedYear}</p>}
      </div>

      {/* Total Branches */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Branches</label>
        <input
          type="number"
          name="totalBranches"
          value={formData.totalBranches}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.totalBranches && <p className="text-red-500 text-xs">{errors.totalBranches}</p>}
      </div>

      {/* Total Clients */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Clients</label>
        <input
          type="number"
          name="totalClients"
          value={formData.totalClients}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.totalClients && <p className="text-red-500 text-xs">{errors.totalClients}</p>}
      </div>
    </>
  );
};

export default CompanyFormFields;
