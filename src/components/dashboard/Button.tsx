import React, {
  ClassAttributes,
  HTMLAttributes,
  ForwardedRef,
  forwardRef,
} from "react";

type HTMLProps<T> = ClassAttributes<T> & HTMLAttributes<T>;

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button
      {...props}
      className="bg-secondary mt-5 rounded-[30px] cursor-pointer text-[#1B4E6B] relative text-sm font-medium py-2 px-6"
    >
      {props.children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
