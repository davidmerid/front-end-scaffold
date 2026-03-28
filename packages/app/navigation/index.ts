export { Link } from 'solito/link'
export { useRouter } from 'solito/router'

export const routes = {
  home: '/',
  login: '/login',
  tasks: '/tasks',
  taskDetail: (id: string) => `/tasks/${id}` as const,
} as const
