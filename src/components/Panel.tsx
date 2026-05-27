/**
 * Panel — bordered box with brick-red corner ornaments.
 * The border is cream (1px). Four <span> elements handle
 * the corner accents since CSS only gives ::before / ::after.
 */
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
