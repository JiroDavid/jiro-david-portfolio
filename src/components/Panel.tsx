export default function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative border border-cream ${className}`}>
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
      {children}
    </div>
  )
}
