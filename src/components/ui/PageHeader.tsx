export default function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="wrap pt-14 md:pt-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="h1 mt-3">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>}
    </div>
  )
}
