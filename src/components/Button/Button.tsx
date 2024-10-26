import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: React.ReactNode;
  width?: "w-full" | "w-fit";
}
const Button = ({ className, children, width, ...rest }: IProps) => {
  return (
    <button
      className={`${className} ${width} text-center px-4 py-2 rounded-md text-white cursor-pointer font-bold capitalize`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
