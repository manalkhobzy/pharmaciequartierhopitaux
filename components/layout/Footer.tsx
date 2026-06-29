import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-2.5 bg-pharmacy-green rounded-sm absolute" />
                <div className="w-2.5 h-8 bg-pharmacy-green rounded-sm absolute" />
              </div>
            </div>
            <span className="font-bold">Pharmacie Quartier des Hôpitaux</span>
          </div>
          <p className="text-gray-400 leading-relaxed text-xs">
            Votre santé, notre priorité depuis 45 ans.<br />
            Dr Manal Sordo et son équipe.
          </p>
          <a
            href="https://instagram.com/pharmaquartierdeshopitaux"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors"
          >
            @pharmaquartierdeshopitaux
          </a>
          <div className="mt-4">
            <Image
              src="/images/logo.webp"
              alt="Logo Pharmacie & Para Quartier des Hôpitaux"
              width={180}
              height={60}
              className="rounded-md object-contain"
            />
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-3">Navigation</h4>
          <ul className="space-y-2 text-gray-400">
            {[
              { label: 'Accueil', href: '/' },
              { label: 'Notre pharmacie', href: '/notre-pharmacie' },
              { label: 'Nos services', href: '/nos-services' },
              { label: 'Actualités et conseils', href: '/actualites-et-conseils' },
              { label: 'Ordonnance', href: '/ordonnance' },
              { label: 'Nous contacter', href: '/nous-contacter' },
            ].map(item => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors text-xs">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-3">Nos services</h4>
          <ul className="space-y-2 text-gray-400">
            {[
              'Ordonnance WhatsApp',
              'Parapharmacie',
              'Préparations magistrales',
              'Phytothérapie',
              'Vaccination',
            ].map(s => (
              <li key={s}>
                <Link href="/nos-services" className="hover:text-white transition-colors text-xs">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-3">Contact</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li>279 Bd Abdelmoumen<br />Casablanca 20340, Maroc</li>
            <li><a href="tel:+212522860654" className="hover:text-white">05 22 86 06 54</a></li>
            <li><a href="https://wa.me/212653468785" className="hover:text-white">WhatsApp : 06 53 46 87 85</a></li>
            <li>Lun–Ven 9h–20h · Sam 9h–13h30</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Pharmacie & Parapharmacie Quartier des Hôpitaux</span>
          <a
            href="https://www.agencelepanaf.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            Site réalisé par Agence Le Panaf
          </a>
        </div>
      </div>

    </footer>
  )
}
