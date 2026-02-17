import { forwardRef } from "react";
import { Input as HeroInput, InputProps as HeroInputProps } from "@heroui/react";
import { LucideIcon } from "lucide-react";
import { AlertCircle } from "lucide-react";

interface InputProps extends HeroInputProps {
  icon?: LucideIcon;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, classNames, errorMessage, isInvalid, ...props }, ref) => {
    return (
      <HeroInput
        ref={ref}
        variant="bordered"
        labelPlacement="inside"
        isInvalid={isInvalid}
        errorMessage={
          errorMessage ? (
            <span className="flex items-center gap-1 mt-0.5">
              <AlertCircle size={11} className="shrink-0" />
              {errorMessage}
            </span>
          ) : undefined
        }
        startContent={
          Icon && (
            <Icon
              className={[
                "w-4 h-4 shrink-0 pointer-events-none transition-colors duration-200",
                isInvalid
                  ? "text-red-400"
                  : "text-default-400 group-data-[focus=true]:text-orange-500 group-data-[filled=true]:text-orange-400",
              ].join(" ")}
            />
          )
        }
        classNames={{
          base: "group",
          label: [
            "text-sm font-medium text-default-400",
            "transition-all duration-200",
            // Filled
            "group-data-[filled=true]:text-default-500",
            // Focus
            "group-data-[focus=true]:text-orange-500",
            // Invalid
            isInvalid ? "!text-red-500" : "",
          ]
            .filter(Boolean)
            .join(" "),
          input: [
            "text-sm text-default-900 placeholder:text-default-300",
            "group-data-[has-value=true]:text-default-900",
            "bg-transparent",
          ].join(" "),
          inputWrapper: [
            "border-2 bg-white/70",
            "shadow-none",
            "transition-all duration-200",
            // Default
            "border-default-200",
            // Hover
            "group-hover:border-orange-300 group-hover:bg-white",
            // Focus
            "group-data-[focus=true]:border-orange-500",
            "group-data-[focus=true]:bg-white",
            "group-data-[focus=true]:shadow-[0_0_0_3px_rgb(249,115,22,0.12)]",
            // Invalid
            "data-[invalid=true]:border-red-400",
            "data-[invalid=true]:shadow-[0_0_0_3px_rgb(239,68,68,0.10)]",
            "data-[invalid=true]:bg-red-50/40",
            // Hover invalid
            "group-hover:data-[invalid=true]:border-red-500",
          ].join(" "),
          innerWrapper: "gap-2.5",
          errorMessage: "text-xs font-medium text-red-500",
          ...classNames,
        }}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";