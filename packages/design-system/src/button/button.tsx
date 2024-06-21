import styles from './button.module.scss';
import { cn } from "@shop/core";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "default";
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
  const className = styles[props.variant as keyof typeof styles || "default"];
  console.log(className);
  return (
    <button {...props} className={cn(className, props.className)}>
      {props.children}
    </button>
  );
}
