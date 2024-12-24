import DatePicker, { registerLocale } from "react-datepicker";

import { forwardRef } from "react";
import sa from "date-fns/locale/ar-SA";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

registerLocale("ar", sa as any);
type Props = {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

// Define the type for the custom input props
interface CustomInputProps {
  iconStyle: React.CSSProperties;
  locale: string;
  value?: string;
  onClick?: () => void;
}

// Custom header to include only dropdowns
const CustomHeader = ({ date, changeYear, changeMonth, locale }: any) => {
  const monthNames = new Intl.DateTimeFormat(locale, { month: "short" }).format(
    new Date(date.getFullYear(), date.getMonth())
  );
  const yearOptions = Array.from({ length: 15 }, (_, i) => {
    const year = new Date().getFullYear() - 7 + i;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  });

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString(locale, { month: "long" });
    return (
      <option key={i} value={i}>
        {month}
      </option>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "5px",
      }}
    >
      <select
        value={date.getMonth()}
        onChange={(e) => changeMonth(Number(e.target.value))}
        style={{ marginRight: "10px" }}
      >
        {monthOptions}
      </select>
      <select
        value={date.getFullYear()}
        onChange={(e) => changeYear(Number(e.target.value))}
        style={{ marginLeft: "10px" }}
      >
        {yearOptions}
      </select>
    </div>
  );
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ iconStyle, locale, ...props }, ref) => (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <input
        ref={ref}
        {...props}
        style={{
          height: "100%",
          outline: "1px solid #989898",
          border: "none",
          borderRadius: "5px",
        }}
        className="!py-[14px]"
      />
      <span style={iconStyle}>
        {/* Replace this with any icon you prefer */}
        📅
      </span>
    </div>
  )
);

CustomInput.displayName = "CustomInput"; // Set a display name for debugging

const DatePickerComponent = ({ date, setDate }: Props) => {
  const t = useTranslations("Profile");
  const { locale } = useParams();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      // Adjust the date to be at the start of the day in UTC
      const adjustedDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      setDate(adjustedDate);
    } else {
      setDate(null);
    }
  };

  // Define inline styles for RTL and LTR
  const iconStyle: React.CSSProperties = {
    position: "absolute",
    [locale === "ar" ? "left" : "right"]: "10px", // Adjust icon position based on locale
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none", // Ensure the icon does not interfere with clicking
  };
  const calendarClassName = "custom-datepicker";

  return (
    <div className="w-fit h-full">
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        placeholderText={t("pickDate")}
        showIcon
        closeOnScroll
        fixedHeight
        locale={locale as string}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select" // This allows for month/year dropdowns
        yearDropdownItemNumber={15} // Number of years to display in the dropdown
        scrollableYearDropdown
        calendarClassName={calendarClassName}
        customInput={
          <CustomInput iconStyle={iconStyle} locale={locale as string} />
        }
        renderCustomHeader={(props) => (
          <CustomHeader {...props} locale={locale} />
        )}
      />

      {/* Custom styles for the selected date */}
      <style jsx global>{`
        .custom-datepicker .react-datepicker__navigation {
          display: none; /* Hide default navigation arrows */
        }
        .custom-datepicker .react-datepicker__header {
          padding: 0; /* Adjust padding if needed */
        }

        .${calendarClassName} .react-datepicker__day--selected {
          background-color: #387b6e; /* Change to your desired color */
          color: white; /* Change text color if needed */
        }

        .${calendarClassName} .react-datepicker__day--selected:hover {
          background-color: #60958b; /* Change to your desired hover color */
        }

        .${calendarClassName} .react-datepicker__day--keyboard-selected {
          background-color: #c3d7d4; /* Change to your desired color for keyboard selection */
          color: black; /* Change text color if needed */
        }

        .${calendarClassName} .react-datepicker__day--keyboard-selected:hover {
          background-color: #74a39a; /* Change to your desired hover color for keyboard selection */
        }
      `}</style>
    </div>
  );
};

export default DatePickerComponent;
