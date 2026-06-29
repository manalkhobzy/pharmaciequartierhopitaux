"use client"

import { useForm } from "react-hook-form"
import { Send } from "lucide-react"
import { PHARMACIE } from "@/lib/constants"

interface FormData {
  nom: string
  telephone: string
  objet: string
  message: string
}

const objets = [
  "Question santé",
  "Ordonnance",
  "Information sur un service",
  "Préparation magistrale",
  "Autre",
]

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    const text = encodeURIComponent(
      `Bonjour,\n\nNom : ${data.nom}\nTéléphone : ${data.telephone}\nObjet : ${data.objet}\n\nMessage :\n${data.message}`
    )
    window.open(`https://wa.me/${PHARMACIE.whatsapp}?text=${text}`, "_blank")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-text-dark mb-1.5">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          id="nom"
          type="text"
          autoComplete="name"
          {...register("nom", { required: "Veuillez indiquer votre nom" })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          placeholder="Votre nom"
          aria-invalid={errors.nom ? "true" : "false"}
        />
        {errors.nom && (
          <p role="alert" className="text-red-500 text-xs mt-1">{errors.nom.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-text-dark mb-1.5">
          Téléphone <span className="text-red-500">*</span>
        </label>
        <input
          id="telephone"
          type="tel"
          autoComplete="tel"
          {...register("telephone", { required: "Veuillez indiquer votre téléphone" })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          placeholder="06 XX XX XX XX"
          aria-invalid={errors.telephone ? "true" : "false"}
        />
        {errors.telephone && (
          <p role="alert" className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="objet" className="block text-sm font-medium text-text-dark mb-1.5">
          Objet <span className="text-red-500">*</span>
        </label>
        <select
          id="objet"
          {...register("objet", { required: "Veuillez choisir un objet" })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white"
          aria-invalid={errors.objet ? "true" : "false"}
        >
          <option value="">Choisir un objet…</option>
          {objets.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {errors.objet && (
          <p role="alert" className="text-red-500 text-xs mt-1">{errors.objet.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message", { required: "Veuillez écrire votre message" })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
          placeholder="Votre message…"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p role="alert" className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-primary-light transition-colors"
      >
        <Send size={18} />
        Envoyer via WhatsApp
      </button>
      <p className="text-xs text-text-muted text-center">
        Le formulaire ouvre WhatsApp avec votre message pré-rempli.
      </p>
    </form>
  )
}
