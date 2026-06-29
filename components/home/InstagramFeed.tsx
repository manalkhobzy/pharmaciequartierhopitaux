import Link from "next/link"
import { PHARMACIE } from "@/lib/constants"

function InstagramIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function InstagramFeed() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 rounded-2xl px-8 py-10 text-center text-white">
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <InstagramIcon size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Suivez-nous sur Instagram</h2>
          <p className="text-white/70 text-sm mb-6">
            Conseils santé, nouveautés et actualités de la pharmacie
          </p>
          <Link
            href={PHARMACIE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold text-sm px-7 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
          >
            <InstagramIcon size={16} className="text-primary-500" />
            @{PHARMACIE.instagram}
          </Link>
        </div>
      </div>
    </section>
  )
}
