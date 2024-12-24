import * as React from "react";

import { ButtonProps, buttonVariants } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { useParams } from "next/navigation";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  locale?: string;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
      "cursor-pointer hover:bg-primary/20"
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  onClick,
  title,

  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    onClick={onClick}
    className={cn("gap-1 ltr:pl-2.5 rtl:pr-2.5 cursor-pointer", className)}
    {...props}
  >
    {" "}
    <ChevronLeftIcon className="h-4 w-4 rtl:rotate-180" />
    <span>{title}</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  onClick,
  title,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    onClick={onClick}
    className={cn("gap-1 pr-2.5 cursor-pointer", className)}
    {...props}
  >
    <span>{title}</span>
    <ChevronRightIcon className="h-4 w-4 rtl:rotate-180" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

type Props = {
  totalItems: number;
  itemsPerPage: number;
  setPage: any;
  pages: number;
  t: any;
};

const ExamplePagination = ({
  totalItems,
  itemsPerPage,
  setPage,
  pages,
  t,
}: Props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const { locale } = useParams();

  React.useEffect(() => {
    // if (totalItems > 0 && itemsPerPage > 0) {
    //   const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
    //   setTotalPages(totalPagesCount);
    // }
    if (pages) {
      setTotalPages(pages);
    }
  }, [pages]);

  //   console.log("totalPages : ", totalPages);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationLink
          key={i}
          isActive={i === currentPage}
          onClick={() => {
            setCurrentPage(i);
            setPage(i); // Set the current page when a page number is clicked
          }}
        >
          {locale === "ar" ? convertNumbersToArabicNumerals(i) : i}
        </PaginationLink>
      );
    }
    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={handlePreviousClick}
          title={t("previous")}
        />
        {renderPageNumbers()}
        <PaginationNext onClick={handleNextClick} title={t("next")} />
      </PaginationContent>
    </Pagination>
  );
};

export default ExamplePagination;
