import React, {
    ClassAttributes,
    HTMLAttributes,
    ForwardedRef,
    forwardRef,
  } from "react";
  
  type HTMLProps<T> = ClassAttributes<T> & HTMLAttributes<T>;
  
  export interface ButtonProps
    extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}
  
  const ButtonSubmit = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
      return (
        <button
          {...props}
          className="bg-secondary w-full mt-5 overflow-x-auto rounded-[100px] cursor-pointer text-[#1B4E6B] relative font-semibold py-4"
        >
          {props.children}
        </button>
      );
    }
  );
  
  ButtonSubmit.displayName = "Button";
  export default ButtonSubmit;