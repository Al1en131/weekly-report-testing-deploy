import React, {
  ClassAttributes,
  HTMLAttributes,
  ForwardedRef,
  forwardRef,
} from "react";

type HTMLProps<T> = ClassAttributes<T> & HTMLAttributes<T>;

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {}

const ButtonDelete = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        {...props}
        className="bg-danger w-full mt-5 rounded-[30px] cursor-pointer text-white relative font-semibold py-4"
      >
        {props.children}
      </button>
    );
  }
);

ButtonDelete.displayName = "Button";
export default ButtonDelete;
