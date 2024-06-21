import { Button } from "@shop/design-system";

export default function Home() {
  return (
    <main style={{ textAlign: "center", padding: 20 }}>
      <h1>Nice to meet you! I'm Ophir Bucai</h1>
      <p style={{ marginBottom: 10 }}>Welcome to my website</p>
      <div style={{ display: "flex", gap: "0.5em", justifyContent: "center" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button>Default</Button>
      </div>
    </main>
  );
}
