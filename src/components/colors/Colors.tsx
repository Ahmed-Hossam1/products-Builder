import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const Colors = ({ color, ...rest }: IProps) => {
  return (
      
       <span
       className="my-2 w-5 h-5 rounded-full block cursor-pointer"
       style={{ backgroundColor: color }}
       {...rest}
       ></span> 
  );
};

export default Colors;
