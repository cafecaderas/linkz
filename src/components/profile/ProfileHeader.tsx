import styles from "./profile.module.css";

export function ProfileHeader({ displayName, bio }: { displayName: string; bio: string }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.displayName}>{displayName}</h1>
      <p className={styles.bio}>{bio}</p>
    </div>
  );
}
