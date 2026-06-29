import Link from 'next/link'

const SERVICES = [
  {
    id: 'conseil',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#EBF5FB"/>
        <path d="M24 14a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 14c6.627 0 12 2.686 12 6v2H12v-2c0-3.314 5.373-6 12-6z" fill="#1B3560"/>
        <circle cx="32" cy="16" r="4" fill="#4DC1CB"/>
        <path d="M29 16h6M32 13v6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    titre: 'Conseil pharmaceutique',
    description:
      'Nos pharmaciens vous accompagnent pour tout conseil sur vos médicaments, interactions, posologies et alternatives sans ordonnance.',
    cta: 'Nous appeler',
    href: 'tel:+212522860654',
    ctaStyle: 'navy',
  },
  {
    id: 'ordonnance',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#E8F5E9"/>
        <rect x="13" y="11" width="22" height="28" rx="3" fill="#2E7D32" opacity="0.15"/>
        <rect x="13" y="11" width="22" height="28" rx="3" stroke="#2E7D32" strokeWidth="2"/>
        <path d="M18 19h12M18 24h12M18 29h8" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M33 33l6 6M36 31a5 5 0 1 1-7.07 7.07A5 5 0 0 1 36 31z" stroke="#1B3560" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    titre: "Envoi d'ordonnance",
    description:
      'Envoyez votre ordonnance par WhatsApp. Votre commande est préparée avant votre arrivée pour vous faire gagner du temps.',
    cta: 'Envoyer par WhatsApp',
    href: 'https://wa.me/212653468785?text=Bonjour%2C%20je%20souhaite%20envoyer%20mon%20ordonnance.',
    ctaStyle: 'whatsapp',
  },
  {
    id: 'vaccination',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#EBF5FB"/>
        <path d="M30 14l4 4-14 14-4-4 14-14z" fill="#4DC1CB" opacity="0.3"/>
        <path d="M30 14l4 4-14 14-4-4 14-14z" stroke="#4DC1CB" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 32l-4 4M28 12l4-4M20 17l11 11" stroke="#1B3560" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="34" cy="14" r="2" fill="#1B3560"/>
      </svg>
    ),
    titre: 'Vaccination',
    description:
      'Vaccins disponibles en pharmacie : grippe saisonnière, hépatite B, tétanos et autres vaccins sur prescription. Sur rendez-vous.',
    cta: 'Prendre rendez-vous',
    href: 'https://wa.me/212653468785?text=Bonjour%2C%20je%20souhaite%20prendre%20rendez-vous%20pour%20une%20vaccination.',
    ctaStyle: 'teal',
  },
  {
    id: 'depistage',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#FFF3E0"/>
        <path d="M24 12v4M24 32v4M12 24h4M32 24h4" stroke="#E65100" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="8" fill="#FFF3E0" stroke="#E65100" strokeWidth="2"/>
        <circle cx="24" cy="24" r="3" fill="#E65100"/>
        <path d="M18 18l3 3M30 18l-3 3M18 30l3-3M30 30l-3-3" stroke="#E65100" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    titre: 'Tests & Dépistage rapide',
    description:
      'Tests de glycémie, tension artérielle, cholestérol, et tests antigéniques disponibles sans rendez-vous selon disponibilité.',
    cta: 'Nous contacter',
    href: 'https://wa.me/212653468785?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20les%20tests%20disponibles.',
    ctaStyle: 'navy',
  },
  {
    id: 'grossesse',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#FCE4EC"/>
        <path d="M24 13c2.5 0 4.5 2 4.5 4.5S26.5 22 24 22s-4.5-2-4.5-4.5S21.5 13 24 13z" fill="#E91E63" opacity="0.2" stroke="#E91E63" strokeWidth="1.8"/>
        <path d="M17 35c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#E91E63" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="24" cy="29" r="5" fill="#FCE4EC" stroke="#E91E63" strokeWidth="1.5"/>
        <path d="M22 29c0-1.1.9-2 2-2v4a2 2 0 0 1-2-2z" fill="#E91E63"/>
      </svg>
    ),
    titre: 'Suivi grossesse & maternité',
    description:
      'Accompagnement personnalisé tout au long de la grossesse : vitamines, compléments, matériel de puériculture et conseils adaptés.',
    cta: 'Nous contacter',
    href: 'https://wa.me/212653468785?text=Bonjour%2C%20je%20souhaite%20des%20conseils%20grossesse%20et%20maternit%C3%A9.',
    ctaStyle: 'navy',
  },
  {
    id: 'preparations',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#EDE7F6"/>
        <path d="M20 14h8l2 6H18l2-6z" fill="#7B1FA2" opacity="0.2" stroke="#7B1FA2" strokeWidth="1.8" strokeLinejoin="round"/>
        <rect x="17" y="20" width="14" height="16" rx="2" fill="#EDE7F6" stroke="#7B1FA2" strokeWidth="1.8"/>
        <path d="M21 27h6M24 24v6" stroke="#7B1FA2" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    titre: 'Préparations magistrales',
    description:
      'Préparations sur mesure selon votre prescription : crèmes dermatologiques, gélules dosées, solutions buvables et formules spécifiques.',
    cta: 'Déposer une ordonnance',
    href: 'https://wa.me/212653468785?text=Bonjour%2C%20je%20souhaite%20une%20pr%C3%A9paration%20magistrale.',
    ctaStyle: 'teal',
  },
  {
    id: 'phytotherapie',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#F0FDF4"/>
        <path d="M24 36V22" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 28c0 0-8-4-8-12 4 0 8 4 8 12z" fill="#16A34A" opacity="0.3" stroke="#16A34A" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M24 24c0 0 8-4 8-12-4 0-8 4-8 12z" fill="#16A34A" opacity="0.5" stroke="#16A34A" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    titre: 'Phytothérapie',
    description:
      'Plantes médicinales, tisanes et compléments à base de plantes pour soutenir votre santé naturellement. Conseils personnalisés par nos pharmaciens.',
    cta: 'Nous consulter',
    href: 'https://wa.me/212653468785?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20la%20phytoth%C3%A9rapie.',
    ctaStyle: 'navy',
  },
  {
    id: 'aromatherapie',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#FFF7ED"/>
        <path d="M24 13c0 0-9 8-9 16a9 9 0 0 0 18 0c0-8-9-16-9-16z" fill="#EA580C" opacity="0.2" stroke="#EA580C" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M19 29a5 5 0 0 0 5 5" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 10c1 2 2 3 2 5" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M28 8c1 2 1 3 1 5" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
        <path d="M20 9c1 2 1 3 1 5" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
    titre: 'Aromathérapie',
    description:
      'Huiles essentielles pures et bio, hydrolats et diffuseurs pour le bien-être au quotidien. Nos pharmaciens vous conseillent sur les utilisations et les précautions.',
    cta: 'Nous consulter',
    href: 'https://wa.me/212653468785?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20l%27aromath%C3%A9rapie.',
    ctaStyle: 'navy',
  },
  ]

const CTA_STYLES: Record<string, string> = {
  navy:
    'inline-flex items-center gap-2 text-sm font-medium text-navy border border-navy rounded-full px-4 py-1.5 hover:bg-navy hover:text-white transition-colors',
  teal:
    'inline-flex items-center gap-2 text-sm font-medium text-teal border border-teal rounded-full px-4 py-1.5 hover:bg-teal hover:text-white transition-colors',
  whatsapp:
    'inline-flex items-center gap-2 text-sm font-medium text-white bg-[#25D366] rounded-full px-4 py-1.5 hover:bg-[#1ebe5d] transition-colors',
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.117 1.532 5.845L.073 23.927l6.227-1.437A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.736-.524-5.284-1.433l-.378-.224-3.929.907.946-3.822-.248-.394A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
            <span className="text-gray-300">/</span>
            <span className="text-navy font-medium">Nos services</span>
          </nav>
        </div>
      </div>

      {/* ── H1 + intro ── */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-navy mb-3">Nos services</h1>
        <p className="text-gray-600 max-w-2xl leading-relaxed">
          La Pharmacie Quartier des Hôpitaux vous propose une gamme complète de services pour prendre soin de votre santé et de celle de votre famille. Notre équipe est disponible pour vous accompagner et répondre à toutes vos questions.
        </p>
      </div>

      {/* ── Grille services ── */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div>{service.icon}</div>

              <div className="flex-1">
                <h2 className="text-lg font-bold text-navy mb-2">{service.titre}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>

              <div>
                <a
                  href={service.href}
                  target={service.href.startsWith('http') ? '_blank' : undefined}
                  rel={service.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={CTA_STYLES[service.ctaStyle]}
                >
                  {service.ctaStyle === 'whatsapp' ? <WhatsAppIcon /> : <ArrowIcon />}
                  {service.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bandeau garde ── */}
      <section className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Pharmacie de garde</h2>
            <p className="text-blue-200 text-sm max-w-md">
              En dehors de nos horaires habituels, retrouvez la pharmacie de garde la plus proche. Notre équipe peut vous orienter par téléphone.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="tel:+212522860654"
              className="inline-flex items-center gap-2 bg-white text-navy font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors text-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16v.92z"/>
              </svg>
              Appeler la pharmacie
            </a>
            <a
              href="https://wa.me/212653468785?text=Bonjour%2C%20je%20cherche%20la%20pharmacie%20de%20garde."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#1ebe5d] transition-colors text-sm"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Infos pratiques ── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Horaires */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-navy" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="font-bold text-navy">Horaires d&apos;ouverture</h3>
            </div>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex justify-between"><span>Lun – Ven</span><span className="font-medium text-navy">9h00 – 20h00</span></li>
              <li className="flex justify-between"><span>Samedi</span><span className="font-medium text-navy">9h00 – 13h30</span></li>
              <li className="flex justify-between"><span>Dimanche</span><span className="font-medium text-gray-400">Fermé</span></li>
            </ul>
          </div>

          {/* Adresse */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-navy" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="font-bold text-navy">Notre adresse</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              279 Boulevard Abdelmoumen<br />
              Quartier des Hôpitaux<br />
              Casablanca 20340
            </p>
            <a
              href="https://maps.google.com/?q=279+Boulevard+Abdelmoumen+Casablanca"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-teal hover:underline"
            >
              Voir sur Google Maps <ArrowIcon />
            </a>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-navy" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16v.92z"/>
                </svg>
              </div>
              <h3 className="font-bold text-navy">Nous contacter</h3>
            </div>
            <div className="space-y-2">
              <a href="tel:+212522860654" className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy transition-colors">
                <span>05 22 86 06 54</span>
              </a>
              <a
                href="https://wa.me/212653468785"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#25D366] font-medium hover:underline"
              >
                <WhatsAppIcon />
                WhatsApp — 06 53 46 87 85
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
