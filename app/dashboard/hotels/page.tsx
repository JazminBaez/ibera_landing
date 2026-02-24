'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, MapPin, Star, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface HotelData {
  id: string
  name: string
  imageUrl: string
  location: string
  descriptionEs: string
  descriptionEn: string
  descriptionPt: string
  rating: string
  priceRange: string
  link: string | null
  active: boolean
  order: number
}

const emptyHotel: Omit<HotelData, 'id'> = {
  name: '', imageUrl: '', location: '',
  descriptionEs: '', descriptionEn: '', descriptionPt: '',
  rating: '5.0', priceRange: '$$', link: '',
  active: true, order: 0,
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<HotelData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<HotelData | null>(null)
  const [form, setForm] = useState<Omit<HotelData, 'id'>>(emptyHotel)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function fetchHotels() {
    try {
      const res = await fetch('/api/hotels')
      const data = await res.json()
      setHotels(data)
    } catch {
      toast.error('Error al cargar los hospedajes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchHotels() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyHotel)
    setShowForm(true)
  }

  function openEdit(hotel: HotelData) {
    setEditing(hotel)
    setForm({
      name: hotel.name, imageUrl: hotel.imageUrl, location: hotel.location,
      descriptionEs: hotel.descriptionEs, descriptionEn: hotel.descriptionEn, descriptionPt: hotel.descriptionPt,
      rating: hotel.rating, priceRange: hotel.priceRange, link: hotel.link || '',
      active: hotel.active, order: hotel.order,
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { ...form, link: form.link || null }
      if (editing) {
        const res = await fetch(`/api/hotels/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Hospedaje actualizado correctamente')
      } else {
        const res = await fetch('/api/hotels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Hospedaje creado correctamente')
      }
      setShowForm(false)
      fetchHotels()
    } catch {
      toast.error('Error al guardar el hospedaje')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/hotels/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Hospedaje eliminado correctamente')
      setDeleteId(null)
      fetchHotels()
    } catch {
      toast.error('Error al eliminar el hospedaje')
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
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Hospedajes</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestiona los alojamientos recomendados</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nuevo Hospedaje</span>
        </button>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-serif text-lg text-foreground">¿Eliminar hospedaje?</h3>
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
            <h3 className="font-serif text-xl text-foreground mb-6">{editing ? 'Editar Hospedaje' : 'Nuevo Hospedaje'}</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Nombre</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Nombre del alojamiento" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Ubicación</label>
                  <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Localidad" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">URL de Imagen</label>
                <input type="text" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="/images/hotel-nombre.jpg o URL externa" />
                {form.imageUrl && (
                  <div className="mt-2 relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border">
                    <Image src={form.imageUrl} alt="Preview" fill className="object-cover" sizes="600px" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Calificación</label>
                  <input type="text" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="4.8" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Rango de Precio</label>
                  <select value={form.priceRange} onChange={e => setForm({...form, priceRange: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Orden</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Enlace externo (opcional)</label>
                <input type="text" value={form.link || ''} onChange={e => setForm({...form, link: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="https://..." />
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

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-sm">Activo</span>
                </label>
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
      {hotels.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No hay hospedajes creados aún.</p>
          <button onClick={openCreate} className="mt-4 text-sm text-primary hover:underline">Crear tu primer hospedaje</button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map(hotel => (
            <div key={hotel.id} className="bg-card border border-border rounded-xl overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                {hotel.imageUrl ? (
                  <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Sin imagen</div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground text-sm">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span className="text-xs font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>{hotel.location}</span>
                  <span className="ml-auto text-primary font-medium">{hotel.priceRange}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{hotel.descriptionEs}</p>
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
                  {!hotel.active && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Inactivo</span>}
                  <div className="flex items-center gap-1 ml-auto">
                    <button onClick={() => openEdit(hotel)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => setDeleteId(hotel.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
