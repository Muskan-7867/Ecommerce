import React from "react";

interface InputFieldProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;

}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  value,
  onChange,
  placeholder,
  label,
  
}) => {
  return (
    <div className="mb-2"
>
      <label
        className="block text-[#122539]  font-normal text-[14px] mb-1 "
        htmlFor={id}
      >
        {label}
      </label>
      <input 
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="custom-placeholder text-sm shadow appearance-none border border-primary rounded-full mb-4 lg:w-[35rem] md:w-[28rem] sm:w-[20rem] w-[16rem] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default InputField;
