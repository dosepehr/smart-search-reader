import React, { FC } from "react";
import { InputProps } from "./input.type";

import classNames from "classnames";
import "./style.css";
import { Size, Theme } from "@/utils/types/components/component-base.type";
const sizeClasses: Record<Size, string> = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
  xl: "input-xl",
};
const themeClasses: Record<Theme, string> = {
  accent: "input-accent",
  error: "input-error",
  info: "input-info",
  neutral: "input-neutral",
  primary: "input-primary",
  secondary: "input-secondary",
  success: "input-success",
  warning: "input-warning",
  default: "",
};
const Input: FC<InputProps> = ({
  className,
  type = "text",
  theme = "primary",
  size = "md",
  icon,
  isAnimated,
  animatedText,
  ...rest
}) => {
  const classes = classNames(
    "w-full",
    {
      [`${themeClasses[theme]}`]: theme,
    },
    {
      [`${sizeClasses[size]}`]: size,
    },
    {
      ["floating-label"]: isAnimated,
    },
    className
  );
  return (
    <label className={`input w-full ${classes}`}>
      {isAnimated && <span>{animatedText ?? rest.placeholder}</span>}
      {icon}
      <input type={type} {...rest} />
    </label>
  );
};

export default Input;
