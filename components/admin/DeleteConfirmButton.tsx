'use client'

interface Props {
  formAction: (formData: FormData) => Promise<void>
  id: string
  message?: string
}

export default function DeleteConfirmButton({ formAction, id, message = 'Supprimer définitivement ?' }: Props) {
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
        onClick={(e) => {
          if (!confirm(message)) e.preventDefault()
        }}
      >
        Supprimer
      </button>
    </form>
  )
}
