import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCategory from "./ProductCategory";
import { useQueryState } from "nuqs";

const AddProductForm = () => {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all"
  });
  const [disabled, setDisabled] = useState(false);
  const [productImages, setProductImages] = useState<File[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: "",
    price: "",
    originalPrice: "",
    category: ""
  });

  const fields = [
    {
      label: "Product Name",
      placeholder: "Enter your Product Name",
      name: "name"
    },
    {
      label: "Description",
      placeholder: "Enter short description of product",
      name: "description"
    },
    {
      label: "Features",
      placeholder: "Type features of product",
      name: "features"
    },
    { label: "Price", placeholder: "Enter price of product", name: "price" },
    {
      label: "Original Price",
      placeholder: "Original Price of product",
      name: "originalPrice"
    },
    {
      label: "Category",
      placeholder: "Add Category of product",
      name: "category"
    }
  ];

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
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (!files) return;

     files.map((file, index) => {
      if (index == 3) return;
      setProductImages((prev) => [...prev, file]);
    });
  };

  useEffect(() => {
    console.log("from useffectr", productImages);
    if (productImages.length >= 4) {
      setDisabled(true);
    }
  }, [productImages]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("features", formData.features);
      data.append("originalPrice", formData.originalPrice);

      data.append("price", formData.price);
      data.append("category", category);
      if (productImages.length > 0) {
        productImages.forEach((file) => {
          data.append("images", file);
        });
      }

      const response = await axios.post(
        `${BASE_URL}/api/v2/product/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Product added successfully!");
      console.log(response.data);
    } catch {
      const error = "failed to add product";
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-6 px-4">
      <h1 className="text-3xl font-bold font-serif text-primary mb-6">
        Add Product
      </h1>

      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
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
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Product Image
            </label>
            <div>
              <input
                type="file"
                name="file"
                multiple
                accept="image/*"
                disabled={disabled}
                onChange={handleImage}
                className="py-2 focus:outline-none text-gray-700 border border-gray-200 p-2 rounded-md"
              />
            </div>
            <div className="flex gap-2">
              {productImages &&
                productImages.map((image, index) => (
                  <div key={`${index}-image`}>
                    <img
                      src={URL.createObjectURL(image)}
                      className="h-32 w-32 object-cover bg-gray-100"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
