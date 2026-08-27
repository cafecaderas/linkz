import type { Link as LinkContent } from "@/content/types";
import type { ButtonTheme } from "@/theme/types";
import styles from "./profile.module.css";

export function LinkButton({ link, iconConfig }: { link: LinkContent; iconConfig: ButtonTheme["icon"] }) {
  const icon = iconConfig.show ? (
    <span className={styles.linkIcon} aria-hidden="true">
      ↗
    </span>
  ) : null;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.linkButton}
    >
      {iconConfig.show && iconConfig.placement === "left" && icon}
      <span>{link.label}</span>
      {iconConfig.show && iconConfig.placement === "right" && icon}
    </a>
  );
}
