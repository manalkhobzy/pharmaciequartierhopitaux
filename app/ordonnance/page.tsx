import Link from 'next/link'

// ─── DONNÉES ─────────────────────────────────────────────────────────────────

const ETAPES = [
  {
    numero: 1,
    titre: 'Prenez en photo votre ordonnance',
    description:
      'Photographiez votre ordonnance médicale avec votre téléphone. Assurez-vous que le texte soit lisible et que tous les médicaments soient visibles.',
    bg: '#E8F5E9',
    image: '/images/ordonnance-step-photo.webp',
    icone: (
      <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    numero: 2,
    titre: 'Envoyez sur WhatsApp',
    description:
      'Envoyez la photo de votre ordonnance au 06 53 46 87 85. Vous pouvez également préciser si vous souhaitez un générique ou le princeps, et ajouter un commentaire.',
    bg: '#E3F2FD',
    image: '/images/ordonnance-step-whatsapp.webp',
    icone: (
      <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    numero: 3,
    titre: 'Votre commande est prête',
    description:
      "Nous préparons votre commande et vous prévenons par WhatsApp dès que c'est prêt. Vous n'avez plus qu'à passer à la pharmacie !",
    bg: '#FFF3E0',
    image: '/images/ordonnance-step-retrait.webp',
    icone: (
      <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function OrdonnancePage() {
  return (
    <div className="bg-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
            <span className="text-gray-300">/</span>
            <span className="text-navy font-medium">Envoyer une ordonnance</span>
          </nav>
        </div>
      </div>

      {/* ── TITRE ── */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">Envoyer mon ordonnance</h1>
      </div>

      {/* ── 3 ÉTAPES VISUELLES ── */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ETAPES.map((etape, i) => (
            <div key={etape.numero} className="relative flex flex-col items-center text-center">

              {/* Connecteur entre étapes (desktop) */}
              {i < ETAPES.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-px border-t-2 border-dashed border-gray-300 z-0" />
              )}

              {/* Bloc icône */}
              <div
                className="relative w-24 h-24 rounded-2xl flex items-center justify-center mb-5 shadow-sm z-10"
                style={{ backgroundColor: etape.bg }}
              >
                {etape.icone}
                {/* Badge numéro */}
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow"
                  style={{ backgroundColor: '#1B3560' }}
                >
                  {etape.numero}
                </div>
              </div>

              <p className="font-semibold text-gray-900 text-sm mb-2">{etape.titre}</p>
              <p className="text-gray-500 text-xs leading-relaxed px-2">{etape.description}</p>

            </div>
          ))}
        </div>
      </section>

      {/* ── ZONE WHATSAPP ── */}
      <section className="max-w-3xl mx-auto px-6 pb-8">

        <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 px-8 py-12 text-center">
          <a
            href="https://wa.me/212653468785?text=Bonjour,%20je%20souhaite%20envoyer%20mon%20ordonnance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-3 group"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-light group-hover:opacity-90 transition-opacity shadow"
              style={{ backgroundColor: '#25D366' }}
            >
              +
            </div>
            <p className="text-gray-700 font-semibold text-base">Ajoutez votre ordonnance</p>
            <p className="text-gray-400 text-sm">Appuyez ici pour ouvrir WhatsApp et envoyer votre photo</p>
          </a>
        </div>

        {/* Boutons secondaires */}
        <div className="flex justify-center gap-4 mt-4">
          <a
            href="https://wa.me/212653468785?text=Bonjour,%20je%20souhaite%20renouveler%20mon%20ordonnance"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-400 text-gray-600 text-sm font-medium px-6 py-2 rounded-full hover:border-navy hover:text-navy transition-colors"
          >
            + Renouvellement
          </a>
          <a
            href="https://wa.me/212653468785?text=Bonjour,%20j'ai%20un%20commentaire%20concernant%20mon%20ordonnance%20:"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-400 text-gray-600 text-sm font-medium px-6 py-2 rounded-full hover:border-navy hover:text-navy transition-colors"
          >
            + Commentaires
          </a>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Ou contactez-nous directement sur WhatsApp :{' '}
          <a href="https://wa.me/212653468785" className="text-navy hover:underline font-medium">
            06 53 46 87 85
          </a>
        </p>

      </section>

      <div className="border-t border-gray-100" />

      {/* ── SECTION "GAGNEZ DU TEMPS" ── */}
      <section className="py-12" style={{ backgroundColor: '#EBF5FB' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10">

          <div className="shrink-0">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-3.5 bg-green-600 rounded absolute" />
                  <div className="w-3.5 h-10 bg-green-600 rounded absolute" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="font-bold text-gray-900 text-xl mb-1">Gagnez du temps !</p>
            <p className="text-gray-600 text-base mb-5">
              Envoyez votre ordonnance en 1 message WhatsApp.<br />
              Nous préparons tout. Vous n&apos;avez plus qu&apos;à passer.
            </p>
            <a
              href="https://wa.me/212653468785?text=Bonjour,%20je%20souhaite%20envoyer%20mon%20ordonnance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white font-bold text-sm px-6 py-3 rounded-lg shadow hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Envoyer mon ordonnance — 06 53 46 87 85
            </a>
          </div>

        </div>
      </section>

    </div>
  )
}
