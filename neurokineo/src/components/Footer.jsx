import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center">
      <p className="text-xs text-slate-400">
        © {new Date().getFullYear()} <span className="font-bold text-[#1a6b8a]">NeuroKineo</span> — Quiz de révision pour kinésithérapeutes
      </p>
      <Link
        href="/mentions-legales"
        className="text-xs text-slate-400 hover:text-[#1a6b8a] underline mt-1 inline-block transition-colors"
      >
        Mentions légales
      </Link>
    </footer>
  )
}