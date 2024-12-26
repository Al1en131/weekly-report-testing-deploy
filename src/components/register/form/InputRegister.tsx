import { FieldApi, FormApi } from "@tanstack/react-form";
import { FieldValidators } from "@tanstack/form-core";
import { HTMLInputTypeAttribute } from "react";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="absolute text-secondary text-xs mt-1">
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

export default function InputRegister({
  label,
  name,
  validator,
  type,
  placeholder,
  form,
  className,
}: {
  label: string;
  name?: string;
  validator?: FieldValidators<any, string, undefined, any, any>;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  form?: FormApi<any, any>;
  className: string;
}) {
  const inputName = name || label.toLowerCase();

  return (
    <div className={`${className} relative`}>
      {form ? (
        <form.Field name={inputName} validators={validator}>
          {(field) => (
            <>
              <label className="block" htmlFor={inputName}>
                {label.charAt(0).toUpperCase() + label.slice(1)}{" "}
                <span className="text-danger">*</span>
              </label>
              <input
                id={inputName}
                name={inputName}
                value={field.state.value || ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-transparent mt-2 w-full text-sm rounded-[4px] py-[18px] px-[16px] outline-none border border-grey"
                type={type}
                placeholder={placeholder}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      ) : (
        <div>
          <label className="block" htmlFor={inputName}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
            <span className="text-danger">*</span>
          </label>
          <input
            id={inputName}
            name={inputName}
            className="bg-transparent mt-2 w-full text-sm rounded-[4px] py-[18px] px-[16px] outline-none border border-grey"
            type={type}
            placeholder={placeholder}
          />
        </div>
      )}
    </div>
  );
}
