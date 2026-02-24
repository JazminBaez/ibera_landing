'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Compass, Plane, Calendar, Backpack, Cloud, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

interface RecommendationData {
  id: string
  titleEs: string
  titleEn: string
  titlePt: string
  descriptionEs: string
  descriptionEn: string
  descriptionPt: string
  icon: string
  category: string
  active: boolean
  order: number
}

const emptyRec: Omit<RecommendationData, 'id'> = {
  titleEs: '', titleEn: '', titlePt: '',
  descriptionEs: '', descriptionEn: '', descriptionPt: '',
  icon: 'Compass', category: 'general',
  active: true, order: 0,
}

const iconOptions = [
  { value: 'Compass', label: 'Brújula' },
  { value: 'Plane', label: 'Avión' },
  { value: 'Calendar', label: 'Calendario' },
  { value: 'Backpack', label: 'Mochila' },
  { value: 'Cloud', label: 'Clima' },
  { value: 'ShieldCheck', label: 'Seguridad' },
]

const categoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'clima', label: 'Clima' },
  { value: 'equipamiento', label: 'Equipamiento' },
  { value: 'seguridad', label: 'Seguridad' },
  { value: 'temporada', label: 'Temporada' },
]

const iconMap: Record<string, React.ElementType> = {
  Compass, Plane, Calendar, Backpack, Cloud, ShieldCheck,
}

export default function RecommendationsPage() {
  const [recs, setRecs] = useState<RecommendationData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<RecommendationData | null>(null)
  const [form, setForm] = useState<Omit<RecommendationData, 'id'>>(emptyRec)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function fetchRecs() {
    try {
      const res = await fetch('/api/recommendations')
      const data = await res.json()
      setRecs(data)
    } catch {
      toast.error('Error al cargar las recomendaciones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRecs() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyRec)
    setShowForm(true)
  }

  function openEdit(rec: RecommendationData) {
    setEditing(rec)
    setForm({
      titleEs: rec.titleEs, titleEn: rec.titleEn, titlePt: rec.titlePt,
      descriptionEs: rec.descriptionEs, descriptionEn: rec.descriptionEn, descriptionPt: rec.descriptionPt,
      icon: rec.icon, category: rec.category,
      active: rec.active, order: rec.order,
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (editing) {
        const res = await fetch(`/api/recommendations/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        toast.success('Recomendación actualizada correctamente')
      } else {
        const res = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        toast.success('Recomendación creada correctamente')
      }
      setShowForm(false)
      fetchRecs()
    } catch {
      toast.error('Error al guardar la recomendación')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/recommendations/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Recomendación eliminada correctamente')
      setDeleteId(null)
      fetchRecs()
    } catch {
      toast.error('Error al eliminar la recomendación')
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
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Recomendaciones</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestiona las recomendaciones y tips de viaje</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nueva Recomendación</span>
        </button>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-serif text-lg text-foreground">¿Eliminar recomendación?</h3>
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
            <h3 className="font-serif text-xl text-foreground mb-6">{editing ? 'Editar Recomendación' : 'Nueva Recomendación'}</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Título (ES)</label>
                  <input type="text" value={form.titleEs} onChange={e => setForm({...form, titleEs: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Título (EN)</label>
                  <input type="text" value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Título (PT)</label>
                  <input type="text" value={form.titlePt} onChange={e => setForm({...form, titlePt: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Ícono</label>
                  <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {iconOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Categoría</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Orden</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Descripción (ES)</label>
                  <textarea value={form.descriptionEs} onChange={e => setForm({...form, descriptionEs: e.target.value})} rows={4} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Descripción (EN)</label>
                  <textarea value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} rows={4} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Descripción (PT)</label>
                  <textarea value={form.descriptionPt} onChange={e => setForm({...form, descriptionPt: e.target.value})} rows={4} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-4 h-4 rounded accent-primary" />
                <span className="text-sm">Activo</span>
              </label>
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

      {/* List */}
      {recs.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No hay recomendaciones creadas aún.</p>
          <button onClick={openCreate} className="mt-4 text-sm text-primary hover:underline">Crear tu primera recomendación</button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recs.map(rec => {
            const Icon = iconMap[rec.icon] || Compass
            return (
              <div key={rec.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1">
                    {!rec.active && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Inactivo</span>}
                    <button onClick={() => openEdit(rec)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => setDeleteId(rec.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
                <h3 className="font-medium text-foreground text-sm">{rec.titleEs}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{rec.descriptionEs}</p>
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{categoryOptions.find(c => c.value === rec.category)?.label || rec.category}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
