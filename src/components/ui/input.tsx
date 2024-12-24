import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  err?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, rightIcon, leftIcon, err, type, ...props }, ref) => {
    return (
      <div
        className={`${
          err ? "!border-destructive" : "focus-within:!border-primary"
        } relative flex items-center  transition-{border} transition-colors ease-in-out border border-input bg-background rounded-md hover:border-inputHover  border-[1.5px] `}
      >
        {rightIcon && (
          <div className={`pr-2`}>
            <span>{rightIcon}</span>
          </div>
        )}

        <input
          type={type}
          className={cn(
            "rounded-md h-11 p-4 border-0 bg-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none w-full",
            className
          )}
          ref={ref}
          {...props}
        />

        {leftIcon && (
          <div className={`pl-2`}>
            <span>{leftIcon}</span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
// const Textarea = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, rightIcon, leftIcon, err, type, ...props }, ref) => {
//     return (
//       <div
//         className={`${
//           err ? "!border-destructive" : "focus-within:!border-primary"
//         } relative flex items-center  transition-{border} transition-colors ease-in-out border border-input bg-background rounded-md hover:border-inputHover  border-[1.5px] `}
//       >
//         {rightIcon && (
//           <div className={`pr-2`}>
//             <span>{rightIcon}</span>
//           </div>
//         )}

//         <textarea
//           type={type}
//           className={cn(
//             "rounded-md h-11 p-4 border-0 bg-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none w-full",
//             className
//           )}
//           ref={ref}
//           {...props}
//         />

//         {leftIcon && (
//           <div className={`pl-2`}>
//             <span>{leftIcon}</span>
//           </div>
//         )}
//       </div>
//     );
//   }
// );
// Textarea.displayName = "Textarea";

export { Input };
