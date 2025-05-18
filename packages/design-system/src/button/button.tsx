import styles from "./button.module.scss";

export type ButtonProps = {
  title: string;
  variant: "primary" | "secondary";
  onClick: () => void;
};

export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className={styles[props.variant]}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}
