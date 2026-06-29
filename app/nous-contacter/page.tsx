import type { Metadata } from "next"
import Link from "next/link"
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react"
import { PHARMACIE } from "@/lib/constants"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez la Pharmacie Quartier des Hôpitaux au 279 Bd Abdelmoumen Casablanca. Tél : 05 22 86 06 54. WhatsApp disponible.",
}

export default function ContactPage() {
  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
            <span className="text-gray-300">/</span>
            <span className="text-navy font-medium">Contact</span>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <section className="pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>

            {/* Infos pratiques */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-dark">Informations pratiques</h2>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark mb-0.5">Adresse</p>
                    <p className="text-text-muted text-sm">{PHARMACIE.adresse}</p>
                    <Link
                      href={PHARMACIE.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-xs font-medium hover:underline mt-1 inline-block"
                    >
                      Voir sur Google Maps →
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark mb-0.5">Téléphone</p>
                    <Link
                      href={`tel:${PHARMACIE.telephoneLink}`}
                      className="text-text-muted text-sm hover:text-primary transition-colors"
                    >
                      {PHARMACIE.telephone}
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark mb-0.5">WhatsApp</p>
                    <Link
                      href={`https://wa.me/${PHARMACIE.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted text-sm hover:text-primary transition-colors"
                    >
                      {PHARMACIE.whatsappDisplay}
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark mb-1">Horaires d&apos;ouverture</p>
                    <div className="text-sm text-text-muted space-y-0.5">
                      {PHARMACIE.horaires.map((h) => (
                        <div key={h.jour} className="flex gap-3">
                          <span className="w-24 font-medium">{h.jour}</span>
                          <span>
                            {h.ouvert && h.ouverture && h.fermeture
                              ? `${h.ouverture} – ${h.fermeture}`
                              : "Fermé"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment nous trouver */}
              <div className="bg-primary-50 rounded-2xl p-6">
                <h3 className="font-bold text-text-dark mb-2">Comment nous trouver</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Nous sommes situés au 279 Boulevard Abdelmoumen, à proximité du CHU Ibn Rochd
                  et de l&apos;Hôpital 20 Août. Facilement accessible en tramway (arrêt Abdelmoumen)
                  et en voiture. Parking disponible à proximité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section aria-label="Carte de localisation" className="h-96">
        <iframe
          src={PHARMACIE.googleMapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation Pharmacie Quartier des Hôpitaux"
        />
      </section>
    </>
  )
}
