import type { CSSProperties } from "react";
import type { BackgroundConfig } from "@/theme/types";
import { backgroundToStyle } from "@/theme/tokens";
import styles from "./profile.module.css";

export function Background({ config }: { config: BackgroundConfig }) {
  const layerStyle = backgroundToStyle(config);
  const isAnimatedGradient = config.kind === "gradient" && config.animated?.enabled;

  return (
    <>
      <div
        className={styles.backgroundLayer}
        data-animated={isAnimatedGradient ? "true" : "false"}
        style={
          {
            ...layerStyle,
            "--bg-animation-duration":
              config.kind === "gradient" && config.animated
                ? `${config.animated.durationMs}ms`
                : undefined,
          } as CSSProperties
        }
      />
      {config.effects?.noise?.enabled && (
        <div className={styles.noiseLayer} style={{ opacity: config.effects.noise.opacity }} />
      )}
      {config.effects?.vignette?.enabled && (
        <div
          className={styles.vignetteLayer}
          style={{ "--vignette-intensity": config.effects.vignette.intensity } as CSSProperties}
        />
      )}
    </>
  );
}
