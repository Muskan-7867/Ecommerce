import React, { useEffect, useState } from "react";
import ProductCategory from "./ProductCategory";
import { useQueryState } from "nuqs";
import { createProduct } from "../../../../services/fetchers";
import { fields } from "./data";
import UploadProdImage from "./UploadProdImage";

const AddProductForm = () => {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all"
  });
  const [disabled, setDisabled] = useState(false);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: "",
    price: "",
    originalPrice: "",
    category: ""
  });

  const getInputType = (label: string): string => {
    const lower = label.toLowerCase();
    if (lower.includes("price") || lower.includes("originalPrice"))
      return "number";
    return "text";
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    if (target.type === "file" && target.files) {
      console.log("from form", target);
      setFormData((prev) => ({ ...prev, images: target?.files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    console.log("from useffectr", productImages);
    if (productImages.length >= 4) {
      setDisabled(true);
    }
  }, [productImages]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("features", formData.features);
      data.append("originalPrice", formData.originalPrice);
      data.append("price", formData.price);
      data.append("category", category);
      productImages.forEach((file) => data.append("images", file));

      const response = await createProduct(data);
      console.log(response);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        description: "",
        features: "",
        price: "",
        originalPrice: "",
        category: ""
      });
      setProductImages([]);
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-6 px-4">
      <h1 className="text-3xl font-bold font-serif text-primary mb-6">
        Create Product
      </h1>

      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          {submitSuccess && (
            <div className="bg-green-100 text-green-700 p-2 rounded">
              Product added successfully!
            </div>
          )}
          {fields.map((field, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-800">
                {field.label}
              </label>

              {field.label === "Category" ? (
                <ProductCategory
                  category={category}
                  setCategory={setCategory}
                />
              ) : (
                <input
                  type={getInputType(field.label)}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="py-2 border-b-2 border-primary focus:outline-none"
                />
              )}
            </div>
          ))}

          {/* Image Upload Field */}
          <UploadProdImage
            productImages={productImages}
            setProductImages={setProductImages}
            disabled={disabled}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
