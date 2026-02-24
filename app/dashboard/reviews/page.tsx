'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import { toast } from 'sonner'

interface ReviewData {
  id: string
  name: string
  location: string
  textEs: string
  textEn: string
  textPt: string
  rating: number
  active: boolean
  order: number
}

const emptyReview: Omit<ReviewData, 'id'> = {
  name: '', location: '',
  textEs: '', textEn: '', textPt: '',
  rating: 5, active: true, order: 0,
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<ReviewData | null>(null)
  const [form, setForm] = useState<Omit<ReviewData, 'id'>>(emptyReview)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function fetchReviews() {
    try {
      const res = await fetch('/api/reviews')
      const data = await res.json()
      setReviews(data)
    } catch {
      toast.error('Error al cargar las reseñas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReviews() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyReview)
    setShowForm(true)
  }

  function openEdit(review: ReviewData) {
    setEditing(review)
    setForm({
      name: review.name, location: review.location,
      textEs: review.textEs, textEn: review.textEn, textPt: review.textPt,
      rating: review.rating, active: review.active, order: review.order,
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        const res = await fetch(`/api/reviews/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        toast.success('Reseña actualizada correctamente')
      } else {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        toast.success('Reseña creada correctamente')
      }
      setShowForm(false)
      fetchReviews()
    } catch {
      toast.error('Error al guardar la reseña')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Reseña eliminada correctamente')
      setDeleteId(null)
      fetchReviews()
    } catch {
      toast.error('Error al eliminar la reseña')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Reseñas</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestiona los testimonios que se muestran en la landing</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nueva Reseña</span>
        </button>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-serif text-lg text-foreground">¿Eliminar reseña?</h3>
            <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-secondary transition-colors">Cancelar</button>
              <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full shadow-xl my-8">
            <h3 className="font-serif text-xl text-foreground mb-6">{editing ? 'Editar Reseña' : 'Nueva Reseña'}</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Nombre</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Nombre completo" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Ubicación</label>
                  <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ciudad, País" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Calificación</label>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setForm({...form, rating: n})} className="p-0.5">
                        <Star className={`h-6 w-6 transition-colors ${n <= form.rating ? 'text-amber-500 fill-amber-500' : 'text-border'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Orden</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm">Activo</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Texto (ES)</label>
                <textarea value={form.textEs} onChange={e => setForm({...form, textEs: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Texto (EN)</label>
                <textarea value={form.textEn} onChange={e => setForm({...form, textEn: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Texto (PT)</label>
                <textarea value={form.textPt} onChange={e => setForm({...form, textPt: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
            </div>

            <div className="flex gap-3 mt-8 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm rounded-lg border border-border hover:bg-secondary transition-colors">Cancelar</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
                {saving ? 'Guardando...' : editing ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No hay reseñas creadas aún.</p>
          <button onClick={openCreate} className="mt-4 text-sm text-primary hover:underline">Crear tu primera reseña</button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map(review => (
            <div key={review.id} className="bg-card border border-border rounded-xl p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-0.5">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-border'}`} />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {!review.active && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 mr-2">Inactivo</span>}
                  <button onClick={() => openEdit(review)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setDeleteId(review.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <blockquote className="text-sm text-muted-foreground leading-relaxed flex-grow">&ldquo;{review.textEs}&rdquo;</blockquote>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium text-foreground text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
