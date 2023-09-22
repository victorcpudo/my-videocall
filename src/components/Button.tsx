import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ColorScheme = "emerald" | "red" | "gray";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  size?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: "solid" | "link";
  colorScheme?: ColorScheme;
}

export const Button = ({
  children,
  className,
  size = "md",
  isDisabled = false,
  isLoading = false,
  variant = "solid",
  colorScheme = "gray",
  ...rest
}: ButtonProps) => {
  const handleSize = (size: string) => {
    switch (size) {
      case "sm":
        return "px-2 py-1.5 text-xs";

      case "md":
        return "px-3 py-2 text-sm";

      case "lg":
        return "px-6 py-4 text-md";

      default:
        break;
    }
  };

  const handleVariant = (variant: string) => {
    switch (variant) {
      case "solid":
        return "flex justify-center rounded-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:cursor-not-allowed";

      case "link":
        return "font-semibold text-emerald-600 hover:text-emerald-500 hover:underline py-0";
      default:
        break;
    }
  };

  const handleColorScheme = (colorScheme: ColorScheme) => {
    switch (colorScheme) {
      case "emerald":
        return "bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-300";

      case "gray":
        return "bg-gray-600 hover:bg-gray-500 disabled:bg-gray-300";

      case "red":
        return "bg-red-600 hover:bg-red-500 disabled:bg-red-300";

      default:
        break;
    }
  };

  return (
    <button
      className={twMerge(
        handleVariant(variant),
        handleSize(size),
        handleColorScheme(colorScheme),
        className
      )}
      disabled={isDisabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="flex gap-2 items-center text-gray-100">
          {children}
          Loading
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
