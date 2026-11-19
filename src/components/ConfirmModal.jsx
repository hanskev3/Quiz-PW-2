// Umpan balik ke pengguna: konfirmasi sebelum menghapus tugas
export default function ConfirmModal({ title, onCancel, onConfirm }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Hapus Todo</h2>
        <p className="confirm-text">
          Yakin ingin menghapus tugas <strong>{title}</strong>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="actions">
          <button className="btn btn-gray" onClick={onCancel}>Batal</button>
          <button className="btn btn-red" onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  )
}
