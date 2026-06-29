'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, PlusCircle, LogOut, Cross, Images, SlidersHorizontal } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const SECTIONS = [
  {
    label: null,
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'Contenu',
    items: [
      { href: '/admin/articles', label: 'Articles', icon: FileText, exact: false },
      { href: '/admin/articles/nouveau', label: 'Nouvel article', icon: PlusCircle, exact: true },
    ],
  },
  {
    label: 'Apparence',
    items: [
      { href: '/admin/slides', label: 'Slider homepage', icon: Images, exact: false },
      { href: '/admin/slides/nouveau', label: 'Nouveau slide', icon: SlidersHorizontal, exact: true },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Cross size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">Pharmacie</p>
            <p className="text-[10px] text-gray-500 leading-tight">Back-office</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {SECTIONS.map((section, si) => (
          <div key={si} className={si > 0 ? 'mt-3' : ''}>
            {section.label && (
              <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const active = exact ? pathname === href : pathname.startsWith(href) && !(exact === false && href === '/admin/articles' && pathname.startsWith('/admin/articles/nouveau'))
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Déconnexion */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={17} strokeWidth={1.8} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
