export default function Footer() {
  return (
    <footer id="contact" className="px-7 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[8px] tracking-wide text-dim">
      <span>JIRO DAVID · LONDON · 2026</span>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/JiroDavid"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sage hover:text-cream transition-colors"
        >
          GITHUB
        </a>
        <span className="text-dim">·</span>
        <a
          href="https://linkedin.com/in/jirodavid"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sage hover:text-cream transition-colors"
        >
          LINKEDIN
        </a>
        <span className="text-dim">·</span>
        <a
          href="mailto:jirodavid153@gmail.com"
          className="text-sage hover:text-cream transition-colors"
        >
          EMAIL
        </a>
      </div>
    </footer>
  )
}
