import React from "react";

const ImageUpload = ({
  fileInputRef,
  uploading,
  formData,
  handleImageUpload,
  removeImage,
  triggerFileInput,
  errors,
  imageError,
}) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Company Image *</label>
      <div
        className="w-full p-3 border-2 border-dashed rounded-md text-center cursor-pointer hover:bg-gray-50"
        onClick={() => !uploading && triggerFileInput()}
      >
        {uploading ? (
          <p>Uploading...</p>
        ) : formData.imageUrl ? (
          <p>Image uploaded</p>
        ) : (
          <p>Click to upload</p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          disabled={uploading}
        />
      </div>

      {formData.imageUrl && (
        <div className="mt-2 flex items-center space-x-3">
          <img src={formData.imageUrl} alt="preview" className="h-16 w-16 rounded object-cover" />
          <button
            type="button"
            className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            onClick={removeImage}
          >
            Remove
          </button>
        </div>
      )}

      {(errors.imageUrl || imageError) && (
        <p className="text-red-500 text-xs mt-1">{errors.imageUrl || imageError}</p>
      )}
    </div>
  );
};

export default ImageUpload;
