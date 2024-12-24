interface Props {
  btnTitle: string;
  classes?: string;
  btnProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  Icon?: React.ReactNode;
}
const Button: React.FC<Props> = ({ btnTitle, classes, btnProps, Icon }) => {
  return (
    <button
      {...btnProps}
      className={`bg-primary transition-all flex gap-4  items-center text-2xl duration-300 px-6 text-white py-2 hover:opacity-90 rounded-md ${classes} `}
    >
      {Icon && Icon}
      <span className="text-lg">{btnTitle}</span>
    </button>
  );
};

export default Button;
