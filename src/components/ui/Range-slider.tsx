import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { Tooltip } from "react-tooltip";
import { cn } from "@/lib/utils";
import { commaSpliter } from "@/utils/commaSpliter";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const Slider: any = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    defaultValue: number[];
    onValueChange: (value: number[]) => void;
    onBlur: () => void;
    reset: boolean;
    setReset: (value: boolean) => void;
  }
>(
  (
    {
      className,
      defaultValue,
      onValueChange,
      onBlur,
      setReset,
      reset,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState(defaultValue);
    const t = useTranslations("Tiltle");
    const { locale } = useParams();

    console.log(value, "value");

    React.useEffect(() => {
      // if (reset) {
      setValue(defaultValue);
      // }
    }, [reset, defaultValue]);

    // const handleChange = (newValue: number[]) => {
    //   setValue(newValue);
    //   setTimeout(() => {
    //     onValueChange(newValue);
    //   }, 500);
    // };

    const debouncedOnChange = React.useCallback(
      debounce((newValue: number[]) => {
        onValueChange(newValue);
      }, 500),
      []
    );

    // Debounce function for mechanism of onValueChange to wait with delay to call the function
    function debounce(func: Function, delay: number) {
      let timeoutId: ReturnType<typeof setTimeout>;
      return function (...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    }

    const handleChange = React.useCallback(
      (newValue: number[]) => {
        setValue(newValue);
        if (debouncedOnChange) {
          debouncedOnChange(newValue);
        }
      },
      [debouncedOnChange]
    );

    const handleBlur = () => {
      onBlur();
    };

    return (
      <>
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          value={value}
          onValueChange={handleChange}
          onBlur={handleBlur}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          {value.map((val, index) => (
            <React.Fragment key={index}>
              <SliderPrimitive.Thumb
                id={`tooltip-${index}`}
                className="block cursor-pointer h-4 w-4 rounded-full  border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              />
              <Tooltip
                anchorSelect={`#tooltip-${index}`}
                content={`${commaSpliter(val)}`}
              />
            </React.Fragment>
          ))}
        </SliderPrimitive.Root>
        <div
          dir="ltr"
          className="flex justify-between gap-2 items-center mt-4 w-full"
        >
          <span className="bg-slate-200 rounded-sm py-1 px-3 text-center">
            {commaSpliter(value[0])} {t("currency")}
          </span>
          <hr className="h-[0.5px] rotate-90 w-full max-w-[20px] bg-gray-400 border-0 dark:bg-gray-700" />
          <span className="bg-slate-200 rounded-sm py-1 px-3 text-center">
            {commaSpliter(value[1])} {t("currency")}
          </span>
        </div>
      </>
    );
  }
);

Slider.displayName = "PriceRangeSlider";

export { Slider };
