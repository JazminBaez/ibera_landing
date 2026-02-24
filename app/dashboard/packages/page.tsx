'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Star, GripVertical } from 'lucide-react'
import { toast } from 'sonner'

interface PackageData {
  id: string
  nameEs: string
  nameEn: string
  namePt: string
  durationEs: string
  durationEn: string
  durationPt: string
  price: string
  descriptionEs: string
  descriptionEn: string
  descriptionPt: string
  includesEs: string[]
  includesEn: string[]
  includesPt: string[]
  featured: boolean
  order: number
  active: boolean
}

const emptyPackage: Omit<PackageData, 'id'> = {
  nameEs: '', nameEn: '', namePt: '',
  durationEs: '', durationEn: '', durationPt: '',
  price: '',
  descriptionEs: '', descriptionEn: '', descriptionPt: '',
  includesEs: [], includesEn: [], includesPt: [],
  featured: false, order: 0, active: true,
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<PackageData | null>(null)
  const [form, setForm] = useState<Omit<PackageData, 'id'>>(emptyPackage)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [includesText, setIncludesText] = useState({ es: '', en: '', pt: '' })

  async function fetchPackages() {
    try {
      const res = await fetch('/api/packages')
      const data = await res.json()
      setPackages(data)
    } catch {
      toast.error('Error al cargar los paquetes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPackages() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyPackage)
    setIncludesText({ es: '', en: '', pt: '' })
    setShowForm(true)
  }

  function openEdit(pkg: PackageData) {
    setEditing(pkg)
    setForm({
      nameEs: pkg.nameEs, nameEn: pkg.nameEn, namePt: pkg.namePt,
      durationEs: pkg.durationEs, durationEn: pkg.durationEn, durationPt: pkg.durationPt,
      price: pkg.price,
      descriptionEs: pkg.descriptionEs, descriptionEn: pkg.descriptionEn, descriptionPt: pkg.descriptionPt,
      includesEs: pkg.includesEs, includesEn: pkg.includesEn, includesPt: pkg.includesPt,
      featured: pkg.featured, order: pkg.order, active: pkg.active,
    })
    setIncludesText({
      es: pkg.includesEs.join('\n'),
      en: pkg.includesEn.join('\n'),
      pt: pkg.includesPt.join('\n'),
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    const payload = {
      ...form,
      includesEs: includesText.es.split('\n').filter(Boolean),
      includesEn: includesText.en.split('\n').filter(Boolean),
      includesPt: includesText.pt.split('\n').filter(Boolean),
    }

    try {
      if (editing) {
        const res = await fetch(`/api/packages/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Paquete actualizado correctamente')
      } else {
        const res = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Paquete creado correctamente')
      }
      setShowForm(false)
      fetchPackages()
    } catch {
      toast.error('Error al guardar el paquete')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Paquete eliminado correctamente')
      setDeleteId(null)
      fetchPackages()
    } catch {
      toast.error('Error al eliminar el paquete')
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
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Paquetes Turísticos</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestiona los paquetes que se muestran en la landing</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nuevo Paquete</span>
        </button>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-serif text-lg text-foreground">¿Eliminar paquete?</h3>
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
            <h3 className="font-serif text-xl text-foreground mb-6">{editing ? 'Editar Paquete' : 'Nuevo Paquete'}</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Nombre (ES)</label>
                  <input type="text" value={form.nameEs} onChange={e => setForm({...form, nameEs: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej: Esencia" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Nombre (EN)</label>
                  <input type="text" value={form.nameEn} onChange={e => setForm({...form, nameEn: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej: Essence" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Nombre (PT)</label>
                  <input type="text" value={form.namePt} onChange={e => setForm({...form, namePt: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej: Essência" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Duración (ES)</label>
                  <input type="text" value={form.durationEs} onChange={e => setForm({...form, durationEs: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej: 1 día" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Duración (EN)</label>
                  <input type="text" value={form.durationEn} onChange={e => setForm({...form, durationEn: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej: 1 day" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Duración (PT)</label>
                  <input type="text" value={form.durationPt} onChange={e => setForm({...form, durationPt: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej: 1 dia" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Precio</label>
                  <input type="text" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej: $45.000" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Orden</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="flex items-end gap-4 pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm">Destacado</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm">Activo</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Descripción (ES)</label>
                  <textarea value={form.descriptionEs} onChange={e => setForm({...form, descriptionEs: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Descripción (EN)</label>
                  <textarea value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Descripción (PT)</label>
                  <textarea value={form.descriptionPt} onChange={e => setForm({...form, descriptionPt: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Incluye (ES) <span className="text-muted-foreground font-normal">- uno por línea</span></label>
                  <textarea value={includesText.es} onChange={e => setIncludesText({...includesText, es: e.target.value})} rows={5} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Incluye (EN) <span className="text-muted-foreground font-normal">- uno por línea</span></label>
                  <textarea value={includesText.en} onChange={e => setIncludesText({...includesText, en: e.target.value})} rows={5} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Incluye (PT) <span className="text-muted-foreground font-normal">- uno por línea</span></label>
                  <textarea value={includesText.pt} onChange={e => setIncludesText({...includesText, pt: e.target.value})} rows={5} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
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

      {/* Table */}
      {packages.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No hay paquetes creados aún.</p>
          <button onClick={openCreate} className="mt-4 text-sm text-primary hover:underline">Crear tu primer paquete</button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Nombre</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Duración</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Precio</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Destacado</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Estado</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {packages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground text-sm">{pkg.nameEs}</p>
                      <p className="text-xs text-muted-foreground">{pkg.nameEn}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-sm text-muted-foreground">{pkg.durationEs}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{pkg.price}</td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      {pkg.featured && <Star className="h-4 w-4 text-amber-500 fill-amber-500 mx-auto" />}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${pkg.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                        {pkg.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(pkg)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Editar">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteId(pkg.id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600" title="Eliminar">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
