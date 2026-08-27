export default function ProfileNotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: "#0a0a0a",
        color: "#f5f5f5",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Profile not found</h1>
      <p style={{ color: "#a3a3a3", margin: 0 }}>This page doesn&apos;t exist yet.</p>
    </div>
  );
}
