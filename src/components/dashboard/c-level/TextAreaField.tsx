import React from 'react';

interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;  
  setValue: React.Dispatch<React.SetStateAction<string>>;  
}

export default function TextAreaField({
  id,
  label,
  placeholder,
  value,
  setValue
}: TextAreaFieldProps) {
  return (
    <div className="mb-4 w-full relative">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        id={id}
        rows={8}
        placeholder={placeholder}
        value={value}  
        onChange={(e) => setValue(e.target.value)}  
        className="text-white text-xs md:text-sm w-full px-[18px] py-4 border rounded-[4px] bg-transparent resize-y"
      />
    </div>
  );
}
