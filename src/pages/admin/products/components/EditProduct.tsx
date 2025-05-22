import React, { useState, useEffect } from "react";
import { EditProductData } from "../../../../types/Product";
import { useSingleProductStore } from "../../../../store/product/Table.store";
import InputField from "./InputField";
import ProductCategory from "./ProductCategory";
import { updateProduct } from "../../../../services/fetchers";

const EditProduct = () => {
  const { selectedProduct } = useSingleProductStore();

  const [formData, setFormData] = useState<EditProductData>({
    name: "",
    description: "",
    price: "",
    features: "",
    category: "",
    inStock: false,
    deliveryCharges: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price?.toString() || "",
        features: selectedProduct.features || "",
        category: selectedProduct.category || "",
        deliveryCharges: selectedProduct.deliveryCharges || 0,
        inStock: selectedProduct.inStock || false
      });
    }
  }, [selectedProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const newValue = type === "checkbox" ? target.checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateProduct(selectedProduct._id, formData);
      console.log("Product updated:", response.data);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        description: "",
        price: "",
        features: "",
        category: "",
        inStock: false,
        deliveryCharges: 0
      });
    } catch (err) {
      console.error("Error updating product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-6 px-4">
      <h1 className="text-3xl font-bold font-serif text-primary mb-6">
        Edit Product
      </h1>

      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {submitSuccess && (
            <div className="bg-green-100 text-green-700 p-2 rounded">
              Product updated successfully!
            </div>
          )}

          <InputField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <InputField
            label="Price"
            name="price"
            value={formData.price.toString()}
            onChange={handleChange}
          />
          <InputField
            label="Features"
            name="features"
            value={formData.features}
            onChange={handleChange}
          />

          {/* ProductCategory instead of plain input */}
          <ProductCategory
            category={formData.category}
            setCategory={(cat: string) =>
              setFormData((prev) => ({ ...prev, category: cat }))
            }
          />

          <InputField
            label="Delivery Charges"
            name="deliveryCharges"
            value={formData.deliveryCharges.toString()}
            onChange={handleChange}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            <label className="text-sm font-medium text-black">In Stock</label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 bg-primary text-white font-semibold py-2 rounded shadow-sm transition ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-dark"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
