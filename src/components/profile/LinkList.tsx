import type { Link as LinkContent } from "@/content/types";
import type { ButtonTheme } from "@/theme/types";
import { LinkButton } from "./LinkButton";
import styles from "./profile.module.css";

export function LinkList({ links, iconConfig }: { links: LinkContent[]; iconConfig: ButtonTheme["icon"] }) {
  const visible = links.filter((link) => link.enabled).sort((a, b) => a.order - b.order);

  return (
    <ul className={styles.linkList}>
      {visible.map((link) => (
        <li key={link.id}>
          <LinkButton link={link} iconConfig={iconConfig} />
        </li>
      ))}
    </ul>
  );
}
