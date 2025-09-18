import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import UploadImage from "../../helpers/UploadImage";
import CompanyFormFields from "./CompanyFormFields";
import ImageUpload from "./ImageUpload";

const CompanyModal = ({ isOpen, onClose, onSubmit, company, mode = "add" }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    industry: "",
    email: "",
    employeeCount: "",
    foundedYear: "",
    description: "",
    location: "",
    totalBranches: "",
    totalClients: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef();

  const MAX_FILE_SIZE_MB = 1;

  useEffect(() => {
    if (company && mode === "edit") {
      setFormData(company);
    } else {
      setFormData({
        name: "",
        address: "",
        industry: "",
        email: "",
        employeeCount: "",
        foundedYear: "",
        description: "",
        location: "",
        totalBranches: "",
        totalClients: "",
        imageUrl: "",
      });
    }
    setErrors({});
  }, [company, mode, isOpen]);

  
  //Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    if (formData.email && !formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must be a @gmail.com address";
    }

    const numericFields = ["employeeCount", "foundedYear", "totalBranches", "totalClients"];
    numericFields.forEach((field) => {
      const value = formData[field];
      if (!value) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      } else if (isNaN(value) || parseInt(value) <= 0) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").toLowerCase()} must be a positive integer`;
      }
    });

    if (formData.foundedYear) {
      const year = parseInt(formData.foundedYear);
      const currentYear = new Date().getFullYear();
      if (year > currentYear) newErrors.foundedYear = "Founded year cannot be in the future";
      if (year < 1800) newErrors.foundedYear = "Founded year must be after 1800";
    }

    if (!formData.imageUrl) newErrors.imageUrl = "Company image is required";

    setErrors(newErrors);

    const firstError = Object.values(newErrors)[0];
    return { isValid: Object.keys(newErrors).length === 0, firstError };
  };

  
  //ModalSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, firstError } = validateForm();

    if (!isValid) {
      if (firstError) toast.error(firstError);
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : 0,
        foundedYear: formData.foundedYear ? parseInt(formData.foundedYear) : new Date().getFullYear(),
        totalBranches: formData.totalBranches ? parseInt(formData.totalBranches) : 1,
        totalClients: formData.totalClients ? parseInt(formData.totalClients) : 0,
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  //Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  
  
  //Image Upload logic
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageError("");
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setImageError(`File size should not exceed ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    try {
      setUploading(true);
      const options = { maxSizeMB: MAX_FILE_SIZE_MB, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      const response = await UploadImage(compressedFile);
      if (response.secure_url) {
        setFormData((prev) => ({ ...prev, imageUrl: response.secure_url }));
        setErrors((prev) => ({ ...prev, imageUrl: "" }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      setImageError("Image upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => setFormData((prev) => ({ ...prev, imageUrl: "" }));
  const triggerFileInput = () => fileInputRef.current?.click();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {mode === "edit" ? "Edit Company" : "Add New Company"}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 p-1 rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CompanyFormFields
                formData={formData}
                errors={errors}
                handleChange={handleChange}
              />

              {/*Image Upload Component */}
              <ImageUpload
                fileInputRef={fileInputRef}
                uploading={uploading}
                formData={formData}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
                triggerFileInput={triggerFileInput}
                errors={errors}
                imageError={imageError}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Brief description of the company..."
              />
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : mode === "edit" ? "Update Company" : "Add Company"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
