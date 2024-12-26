import { FieldApi, FormApi } from "@tanstack/react-form";
import { FieldValidators } from "@tanstack/form-core";
import { HTMLInputTypeAttribute } from "react";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="absolute text-secondary text-xs mt-1 ">
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

export default function InputLogin({
  name,
  validator,
  type,
  placeholder,
  form,
  className,
}: {
  name: string;
  validator: FieldValidators<any, string, undefined, any, any> | undefined;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  form: FormApi<any, any>;
  className: string;
}) {
  return (
    <div className={`${className} relative`}>
      <form.Field name={name} validators={validator}>
        {(field) => {
          // Avoid hasty abstractions. Render props are great!
          return (
            <>
              <label className="block" htmlFor={field.name}>
                {name.charAt(0).toUpperCase()}
                {name.slice(1)}
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-transparent mt-2 w-full text-sm rounded-[4px] py-[18px] px-[16px] outline-none border border-grey"
                type={type}
                placeholder={placeholder}
              />

              <FieldInfo field={field} />
            </>
          );
        }}
      </form.Field>
      {/* <label className="block" htmlFor={id}>
        {name}
      </label>
      <input
        id={id}
        className="bg-transparent mt-2 w-full text-sm rounded-[4px] py-[18px] px-[16px] outline-none border border-grey"
        type={type}
        placeholder={placeholder}
      /> */}
    </div>
  );
}

// mt-12 w-full
