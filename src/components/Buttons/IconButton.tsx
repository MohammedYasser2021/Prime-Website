interface Props {
  btnClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  Icon: React.ReactNode;
}
const IconButton: React.FC<Props> = ({ btnClassName, Icon }) => {
  return (
    <button
      className={`w-[50px] h-[50px] flex items-center justify-center rounded-[25px] hover:bg-gray-200 transition-all duration-300 text-2xl  ${btnClassName}`}
    >
      {Icon}
    </button>
  );
};

export default IconButton;
