import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;  
  setValue: React.Dispatch<React.SetStateAction<string>>; 
}

export default function InputField({
  id,
  label,
  placeholder,
  value,
  setValue
}: InputFieldProps) {
  return (
    <div className="mb-4 w-full relative">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value} 
        onChange={(e) => setValue(e.target.value)}  
        className="text-white outline-none text-sm w-full px-[18px] py-4 border rounded-[4px] bg-primary border-grey"
      />
    </div>
  );
}
