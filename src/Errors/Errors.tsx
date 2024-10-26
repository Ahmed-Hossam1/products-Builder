interface IProps {
  msg: string;
}
const Errors = ({ msg }: IProps) => {
  return msg ? (
    <span className="text-red-500 capitalize text-sm">{msg}</span>
  ) : null;
};

export default Errors;
