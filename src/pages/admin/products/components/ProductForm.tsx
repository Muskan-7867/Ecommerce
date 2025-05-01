// components/ProductForm.tsx
import React from "react";
import { ProductFormData } from "../../../../types/Product";

interface ProductFormProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Partial<Record<keyof ProductFormData, string>>;
  isSubmitting: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  errors,
  isSubmitting
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {["name", "description", "features", "price", "rating"].map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            name={field}
            type={field === "price" || field === "rating" ? "number" : "text"}
            value={formData[field as keyof ProductFormData] as string}
            onChange={handleChange}
            className="input"
          />
          {errors[field as keyof ProductFormData] && (
            <p className="text-red-500 text-sm">
              {errors[field as keyof ProductFormData]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label>In Stock</label>
        <select
          name="inStock"
          value={formData.inStock}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.inStock && (
          <p className="text-red-500 text-sm">{errors.inStock}</p>
        )}
      </div>

      <div>
        <label>Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      <div>
        <label>Product Image</label>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          className="input"
          multiple
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Product"}
      </button>
    </form>
  );
};

export default ProductForm;
