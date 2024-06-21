import styles from "./button.module.scss";
import { cn } from "@shop/core";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <button {...props} className={cn(styles[props.variant], props.className)}>
      {props.children}
    </button>
  );
}
