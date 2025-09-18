
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL

const headers = {
  "Content-Type": "application/json",
};

//For handle API errors
const handleErrorResponse = async (res, defaultMessage) => {
  let errorData;
  try {
    errorData = await res.json();
  } catch {
    const err = new Error(defaultMessage);
    err.handled = true;
    toast.error(defaultMessage);
    throw err;
  }

  let message = errorData.message || defaultMessage;

  // If backend sends validation errors, take the first one
  if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
    message = errorData.errors[0].msg || message;
  }

  toast.error(message);

  const err = new Error(message);
  err.handled = true; 
  throw err;
};


//Fetch companies
export const getCompanies = async ({
  page = 1,
  limit = 10,
  search = "",
  industry = "",
  location = "",
  foundedYear = "",
  sortBy = "name",
  sortOrder = "asc",
}) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    params.append("sortBy", sortBy);
    params.append("sortOrder", sortOrder);

    if (search) params.append("search", search);
    if (industry) params.append("industry", industry);
    if (location) params.append("location", location);
    if (foundedYear) params.append("foundedYear", foundedYear);

    const res = await fetch(`${API_URL}?${params.toString()}`, { headers });

    if (!res.ok) {
      await handleErrorResponse(res, "Failed to fetch companies");
    }

    return await res.json();
  } catch (err) {
    if (!err.handled) toast.error(err.message || "Error fetching companies");
    throw err;
  }
};

//Create company
export const createCompany = async (companyData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(companyData),
    });

    if (!res.ok) {
      await handleErrorResponse(res, "Failed to create company");
    }

    toast.success("Company successfully created!");
    return await res.json();
  } catch (err) {
    if (!err.handled) toast.error(err.message || "Error creating company");
    throw err;
  }
};

//Update company
export const updateCompany = async (id, companyData) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(companyData),
    });

    if (!res.ok) {
      await handleErrorResponse(res, "Failed to update company");
    }

    toast.success("Company successfully updated!");
    return await res.json();
  } catch (err) {
    if (!err.handled) toast.error(err.message || "Error updating company");
    throw err;
  }
};

//Delete company
export const deleteCompany = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) {
      await handleErrorResponse(res, "Failed to delete company");
    }

    toast.success("Company successfully deleted!");
    return await res.json();
  } catch (err) {
    if (!err.handled) toast.error(err.message || "Error deleting company");
    throw err;
  }
};
