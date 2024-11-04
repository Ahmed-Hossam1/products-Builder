import { ChangeEvent, memo } from "react";

interface IProps {
  type: string;
  name: string;
  id: string | undefined;
  value : string |number
  onChange : (e : ChangeEvent<HTMLInputElement>) => void
}
const InputModal = ({ type, name, id ,value , onChange }: IProps) => {
  return (
    <input
      className={
        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      }
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
    />
  );
};

export default memo(InputModal);
