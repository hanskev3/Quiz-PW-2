import { useState } from 'react'
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../data'

// Dipakai untuk "Tambah Todo" (todo = null) dan "Update Todo" (todo = objek tugas)
export default function TodoModal({ todo, onCancel, onSubmit }) {
  const isEdit = Boolean(todo)
  const [form, setForm] = useState({
    title: todo?.title ?? '',
    description: todo?.description ?? '',
    status: todo?.status ?? 'todo',
    priority: todo?.priority ?? 'low',
    deadline: todo?.deadline ?? '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Judul wajib diisi.')
      return
    }
    if (!form.deadline) {
      setError('Deadline wajib diisi.')
      return
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() })
  }

  return (
    <div className="overlay" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 className="modal-title">{isEdit ? 'Update Todo' : 'Tambah Todo'}</h2>

        <label htmlFor="title">Judul</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} />

        <label htmlFor="description">Deskripsi</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />

        <div className="row">
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="priority">Prioritas</label>
            <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <label htmlFor="deadline">Deadline</label>
        <input id="deadline" name="deadline" type="date" value={form.deadline} onChange={handleChange} />

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="button" className="btn btn-red" onClick={onCancel}>Batal</button>
          <button type="submit" className="btn btn-blue">{isEdit ? 'Update' : 'Tambah'}</button>
        </div>
      </form>
    </div>
  )
}
