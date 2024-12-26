import { FieldApi, FormApi } from "@tanstack/react-form";
import { FieldValidators } from "@tanstack/form-core";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="text-danger text-xs mt-1">
      {field.state.meta.touchedErrors ? (
        <span>⚠ {field.state.meta.touchedErrors}</span>
      ) : null}
      {field.state.meta.isValidating ? <span>Validating...</span> : null}
    </div>
  );
}

export default function NumberInputRegister({
  label = "WhatsApp Number",
  name,
  validator,
  placeholder = "Enter your WhatsApp number",
  form,
  className,
}: {
  label?: string;
  name?: string;
  validator?: FieldValidators<any, string, undefined, any, any>;
  placeholder?: string;
  form?: FormApi<any, any>;
  className?: string;
}) {
  const inputName = name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`${className} relative`}>
      {form ? (
        <form.Field name={inputName} validators={validator}>
          {(field) => (
            <>
              <label
                className="block  font-medium text-white mb-1"
                htmlFor={inputName}
              >
                {label} <span className="text-danger">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-[#416B84] text-sm py-[18px] px-[16px] text-white border-l border-t border-b border-white rounded-l-md">
                  +62
                </span>
                <input
                  id={inputName}
                  name={inputName}
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-transparent border border-white text-white text-sm rounded-r-md py-[18px] px-[16px] outline-none flex-1 placeholder-[#7A93AC]"
                  type="tel"
                  placeholder={placeholder}
                />
              </div>
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      ) : (
        <div>
          <label
            className="block text-sm font-medium text-white mb-1"
            htmlFor={inputName}
          >
            {label} <span className="text-danger">*</span>
          </label>
          <div className="flex relative items-center">
            <span className="bg-[#416B84] absolute mt-2 text-sm py-[18px] px-[16px] border border-grey text-white rounded-l-md">
              +62
            </span>
            <input
              id={inputName}
              name={inputName}
              className="bg-transparent mt-2 w-full text-sm rounded-[4px] pl-[75px] py-[18px] pr-[16px] outline-none border border-grey"
              type="tel"
              placeholder={placeholder}
            />
          </div>
        </div>
      )}
    </div>
  );
}
