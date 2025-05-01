import axios from "axios";
import Form from "./Form";
import { FormData } from "../../../../types/auth";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { addressSchema } from "../../../../Schemas/addressSchema.ts"

type FormErrors = {
  [key in keyof FormData]?: string;
};
const FORM_DATA: FormData = {
  street: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  phone: "",
  address: "",
  address1: ""
};
const AddressForm = () => {
  const { userId } = useParams<{ userId: string }>();
  const token = Cookies.get("authToken");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState<FormData>(FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    const result = addressSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof FormData;
        newErrors[path] = err.message;
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    const Data = {
      ...formData,
      userId
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/address`,
        Data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Address added successfully", response.data);
      setSubmitSuccess(true);

      setFormData(FORM_DATA);
    } catch (error) {
      console.error("Error adding address", error);
      if (axios.isAxiosError(error) && error.response) {
        // Handle server validation errors
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mt-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-md">
        <h1 className="text-2xl font-semibold text-black mb-6 text-center font-serif">
          Add a Shipping Address
        </h1>
        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            Address added successfully!
          </div>
        )}
        <Form
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddressForm;
