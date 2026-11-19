// Data dummy. Atribut sesuai ketentuan: id, title, description, priority, deadline, status
export const initialTodos = [
  {
    id: 1,
    title: 'Mengerjakan UAS Lab Basis Data 2',
    description: 'Menyelesaikan project akhir Lab Basis Data.',
    priority: 'high',
    deadline: '2026-11-21',
    status: 'in progress',
  },
  {
    id: 2,
    title: 'Mempelajari Dasar Frontend',
    description: 'Mempelajari dasar HTML, CSS, dan JavaScript sebelum masuk ke React.',
    priority: 'low',
    deadline: '2026-11-25',
    status: 'in progress',
  },
  {
    id: 3,
    title: 'Membuat Website Portofolio',
    description: 'Membuat website portofolio pribadi untuk menampilkan project.',
    priority: 'low',
    deadline: '2026-09-25',
    status: 'done',
  },
  {
    id: 4,
    title: 'Mempelajari Basis Data',
    description: 'Mengulang materi normalisasi dan query SQL dasar.',
    priority: 'low',
    deadline: '2026-11-11',
    status: 'done',
  },
]

export const STATUS_OPTIONS = ['todo', 'in progress', 'done']
export const PRIORITY_OPTIONS = ['low', 'medium', 'high']
