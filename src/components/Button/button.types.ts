import { ComponentBase } from "@/utils/types/components/component-base.type";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ComponentBase & {
    variant?: ButtonVariant;
    shape?: ButtonShape;
  };

export type ButtonVariant = "default" | "soft" | "outline" | "dash" | "active";
export type ButtonShape = "default" | "wide" | "circle" | "square" | "block";
