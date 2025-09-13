import { ComponentBase } from "@/utils/types/components/component-base.type";
import { InputHTMLAttributes } from "react";

export type InputType = "text" | "number" | "password" | "hidden";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  ComponentBase & {
    type?: InputType;
    icon?: React.ReactNode;
    isAnimated?: boolean;
    animatedText?: string;
  };
