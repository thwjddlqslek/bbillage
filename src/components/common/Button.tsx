"use client";
import styles from "@/src/styles/ProductList.module.css";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  text: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  ariaLabel?: string;
}

const Button = ({
  className,
  onClick,
  text,
  href,
  target = "_self",
  ariaLabel,
}: ButtonProps) => {
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={className}
        aria-label={ariaLabel || text}
      >
        <button className={className}>{text}</button>
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {text}
    </button>
  );
};

export default Button;
