'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ImageIcon, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface GalleryImageData {
  id: string
  imageUrl: string
  altText: string
  span: string
  order: number
  active: boolean
}

const emptyImage: Omit<GalleryImageData, 'id'> = {
  imageUrl: '', altText: '', span: '', order: 0, active: true,
}

const spanOptions = [
  { value: '', label: 'Normal (1x1)' },
  { value: 'md:col-span-2', label: 'Ancho doble (2x1)' },
  { value: 'md:row-span-2', label: 'Alto doble (1x2)' },
  { value: 'md:col-span-2 md:row-span-2', label: 'Grande (2x2)' },
]

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<GalleryImageData | null>(null)
  const [form, setForm] = useState<Omit<GalleryImageData, 'id'>>(emptyImage)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function fetchImages() {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setImages(data)
    } catch {
      toast.error('Error al cargar las imágenes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchImages() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyImage)
    setShowForm(true)
  }

  function openEdit(img: GalleryImageData) {
    setEditing(img)
    setForm({
      imageUrl: img.imageUrl, altText: img.altText, span: img.span,
      order: img.order, active: img.active,
    })
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.imageUrl.trim()) {
      toast.error('La URL de la imagen es obligatoria')
      return
    }
    setSaving(true)
    try {
      if (editing) {
        const res = await fetch(`/api/gallery/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        toast.success('Imagen actualizada correctamente')
      } else {
        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        toast.success('Imagen agregada correctamente')
      }
      setShowForm(false)
      fetchImages()
    } catch {
      toast.error('Error al guardar la imagen')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Imagen eliminada correctamente')
      setDeleteId(null)
      fetchImages()
    } catch {
      toast.error('Error al eliminar la imagen')
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
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Galería de Imágenes</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestiona las imágenes que se muestran en la galería de la landing</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nueva Imagen</span>
        </button>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-serif text-lg text-foreground">¿Eliminar imagen?</h3>
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
          <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-xl my-8">
            <h3 className="font-serif text-xl text-foreground mb-6">{editing ? 'Editar Imagen' : 'Nueva Imagen'}</h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">URL de la Imagen</label>
                <input type="text" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="/images/gallery-nombre.jpg o URL externa" />
                {form.imageUrl && (
                  <div className="mt-3 relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-secondary">
                    <Image src={form.imageUrl} alt="Preview" fill className="object-cover" sizes="500px" />
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Texto Alternativo (alt)</label>
                <input type="text" value={form.altText} onChange={e => setForm({...form, altText: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Descripción de la imagen para accesibilidad" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Tamaño en Grilla</label>
                <select value={form.span} onChange={e => setForm({...form, span: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {spanOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <p className="text-xs text-muted-foreground mt-1">Define cuánto espacio ocupa la imagen en la grilla de la galería</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
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

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <div className="flex justify-center mb-4">
            <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
          </div>
          <p className="text-muted-foreground">No hay imágenes en la galería aún.</p>
          <button onClick={openCreate} className="mt-4 text-sm text-primary hover:underline">Agregar tu primera imagen</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img.id} className={`relative group rounded-xl overflow-hidden border border-border ${img.span}`}>
              <div className="aspect-square relative bg-secondary">
                <Image src={img.imageUrl} alt={img.altText} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(img)} className="p-2.5 rounded-full bg-white/90 text-foreground hover:bg-white transition-colors" title="Editar">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDeleteId(img.id)} className="p-2.5 rounded-full bg-white/90 text-red-600 hover:bg-white transition-colors" title="Eliminar">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {!img.active && (
                  <div className="absolute top-2 left-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-black/70 text-white">Inactivo</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs truncate">{img.altText || 'Sin descripción'}</p>
                  <p className="text-white/60 text-xs mt-0.5">{spanOptions.find(s => s.value === img.span)?.label || 'Normal'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
