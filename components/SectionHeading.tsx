// Shared heading so every section looks the same
export default function SectionHeading({ id, kicker, children }: { id: string; kicker: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-accent">{kicker}</p>
      <h2 id={id} className="mt-1 text-3xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}
