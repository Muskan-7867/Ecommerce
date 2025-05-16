import Form from "./Form";
import { AddressFormData } from "../../../../types/auth";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { addressSchema } from "../../../../Schemas/addressSchema.ts";
import { CreateUserAddress } from "../../../../services/fetchers.ts";

type FormErrors = {
  [key in keyof FormData]?: string;
};
const FORM_DATA: AddressFormData = {
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
 
  const { state } = useLocation();
  const existingAddress = state?.address as
    | Partial<AddressFormData>
    | undefined;
  const [formData, setFormData] = useState<AddressFormData>({
    ...FORM_DATA,
    ...(existingAddress || {})
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [gotoAddressForm, setGoToAddressForm] = useState(true);
  console.log(gotoAddressForm);
  const navigate = useNavigate();

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
    
      setIsSubmitting(false);
      return;
    }


    const Data = {
      ...formData,
      userId
    };

    try {
      const response = await CreateUserAddress(Data, token || "");
      console.log("Address added successfully", response);
      setSubmitSuccess(true);
      setFormData(FORM_DATA);
      navigate(-1);
      setGoToAddressForm(false);
    } catch (error) {
      console.error("Error adding address", error);
     
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mt-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-md">
        <h1 className="text-2xl font-semibold text-black mb-6 text-center font-serif">
          {existingAddress
            ? "Update Shipping Address"
            : "Add a Shipping Address"}
        </h1>

        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            {existingAddress
              ? "Address updated successfully"
              : "Address added successfully"}
          </div>
        )}
        <Form
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
         
          isSubmitting={isSubmitting}
          isEditing={!existingAddress}
        />
      </div>
    </div>
  );
};

export default AddressForm;
