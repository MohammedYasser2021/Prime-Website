"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { FaMinus, FaPlus } from "react-icons/fa6";

import { ChevronDown } from "lucide-react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  view?: "arrows" | "plusMinus";
  t?: any;
  tags?: boolean;
};

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, view, t, tags, ...props }, ref) => (
  <AccordionPrimitive.Header
    className={cn("data-[state=open]:text-primary flex")}
  >
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all group",
        className
      )}
      {...props}
    >
      {children}
      {view === "arrows" ? (
        <>
          {tags && (
            <>
              <h1 className="font-bold text-center text-sm pt-0.5 group-data-[state=closed]:hidden">
                {t("ProductPage.sections.titles.tags.hide")}
              </h1>
              <h1 className="font-bold text-center text-sm pt-0.5 group-data-[state=open]:hidden">
                {t("ProductPage.sections.titles.tags.show")}
              </h1>
            </>
          )}
          <ChevronDown className="text-lg shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </>
      ) : (
        <>
          <FaPlus className="text-lg shrink-0 transition-all duration-300 group-data-[state=open]:hidden " />
          <FaMinus
            className={cn(
              "text-lg shrink-0 transition-all duration-300 group-data-[state=closed]:hidden"
            )}
          />
        </>
      )}{" "}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
