import { Loader2 } from "lucide-react";

const ButtonLoading = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <Loader2 className={`animate-spin ${className}`} />
      <h1 className={``}>{text}</h1>
    </div>
  );
};

export default ButtonLoading;
