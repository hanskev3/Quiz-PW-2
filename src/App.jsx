import { useState, useEffect } from 'react'
import { initialTodos } from './data'
import TodoModal from './components/TodoModal'
import ConfirmModal from './components/ConfirmModal'

export default function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [selectedId, setSelectedId] = useState(null) // null = halaman daftar, id = halaman detail
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null) // objek todo yang sedang diedit
  const [deleting, setDeleting] = useState(null) // objek todo yang akan dihapus
  const [toast, setToast] = useState('')

  // Hilangkan notifikasi setelah 2,5 detik
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const selected = todos.find((t) => t.id === selectedId)

  const addTodo = (data) => {
    const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1
    setTodos([...todos, { id: nextId, ...data }])
    setShowAdd(false)
    setToast('Tugas berhasil ditambahkan.')
  }

  const updateTodo = (data) => {
    setTodos(todos.map((t) => (t.id === editing.id ? { ...t, ...data } : t)))
    setEditing(null)
    setToast('Tugas berhasil diperbarui.')
  }

  const deleteTodo = () => {
    setTodos(todos.filter((t) => t.id !== deleting.id))
    if (selectedId === deleting.id) setSelectedId(null)
    setDeleting(null)
    setToast('Tugas berhasil dihapus.')
  }

  return (
    <div className="app">
      {selected ? (
        <section className="detail">
          <div className="detail-card">
            <div className="detail-main">
              <h4>Judul</h4>
              <p>{selected.title}</p>
              <h4>Deskripsi</h4>
              <p className="desc-box">{selected.description || '-'}</p>
            </div>
            <div className="detail-side">
              <h4>Status</h4>
              <p>{selected.status}</p>
              <h4>Prioritas</h4>
              <p>{selected.priority}</p>
              <h4>Deadline</h4>
              <p>{selected.deadline}</p>
            </div>
            <div className="actions detail-actions">
              <button className="btn btn-red" onClick={() => setSelectedId(null)}>Kembali</button>
              <button className="btn btn-blue" onClick={() => setEditing(selected)}>Update</button>
            </div>
          </div>
        </section>
      ) : (
        <>
          <header className="header">
            <h1>Todo List</h1>
            <button className="btn btn-blue" onClick={() => setShowAdd(true)}>Tambah Todo</button>
          </header>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Prioritas</th>
                  <th>Deadline</th>
                  <th className="center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.status}</td>
                    <td>{todo.priority}</td>
                    <td>{todo.deadline}</td>
                    <td className="center">
                      <button className="btn btn-blue btn-sm" onClick={() => setSelectedId(todo.id)}>
                        Detail
                      </button>{' '}
                      <button className="btn btn-red btn-sm" onClick={() => setDeleting(todo)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {todos.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty">
                      Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas pertama.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showAdd && <TodoModal onCancel={() => setShowAdd(false)} onSubmit={addTodo} />}
      {editing && <TodoModal todo={editing} onCancel={() => setEditing(null)} onSubmit={updateTodo} />}
      {deleting && (
        <ConfirmModal title={deleting.title} onCancel={() => setDeleting(null)} onConfirm={deleteTodo} />
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}
