import Image from "next/image";
import type { LayoutTheme } from "@/theme/types";
import styles from "./profile.module.css";

const SHAPE_CLASS: Record<LayoutTheme["avatar"]["shape"], string> = {
  circle: styles.avatarCircle,
  square: styles.avatarSquare,
  rounded: styles.avatarRounded,
};

export function Avatar({ src, alt, shape, size }: { src: string; alt: string; shape: LayoutTheme["avatar"]["shape"]; size: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`${styles.avatar} ${SHAPE_CLASS[shape]}`}
      priority
    />
  );
}
