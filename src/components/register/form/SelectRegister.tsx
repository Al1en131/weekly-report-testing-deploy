import { FieldApi, FormApi } from "@tanstack/react-form";
import { FieldValidators } from "@tanstack/form-core";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="absolute text-secondary text-xs mt-1">
      {field.state.meta.touchedErrors && (
        <em>{field.state.meta.touchedErrors}</em>
      )}
      {field.state.meta.isValidating && "Validating..."}
    </div>
  );
}

export default function SelectRegister({
  label,
  name,
  validator,
  options,
  form,
  className,
}: {
  label: string;
  name?: string;
  validator?: FieldValidators<any, string, undefined, any, any>;
  options: { value: string; label: string }[];
  form?: FormApi<any, any>;
  className: string;
}) {
  const selectName = name || label.toLowerCase();

  if (!form) {
    return (
      <div className={`${className} relative`}>
        <label className="block" htmlFor={selectName}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
          <span className="text-danger">*</span>
        </label>
        <select
          id={selectName}
          name={selectName}
          className="bg-transparent !text-white mt-2 w-full text-sm rounded-[4px] py-[18px] px-[16px] pr-4 appearance-none outline-none border border-grey"
        >
          {options.map((option) => (
            <option key={option.value} className="" value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className={`${className} relative`}>
      <form.Field name={selectName} validators={validator}>
        {(field) => (
          <>
            <label className="block" htmlFor={selectName}>
              {label.charAt(0).toUpperCase() + label.slice(1)}
              <span className="text-danger">*</span>
            </label>
            <div className="relative items-center">
              <select
                id={selectName}
                name={selectName}
                value={field.state.value || ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-transparent mt-2 w-full text-sm rounded-[4px] py-[17px] px-[15px] pr-4 !text-white appearance-none outline-none border border-grey "
              >
                {options.map((option) => (
                  <option key={option.value} className="text-black" value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-9 transform -translate-y-1/2 text-grey">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                    stroke="#9CA3AF"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <FieldInfo field={field} />
          </>
        )}
      </form.Field>
    </div>
  );
}
