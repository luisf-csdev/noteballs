import { createRouter, createWebHashHistory } from 'vue-router'

import NotesView from '@/views/NotesView.vue'
import EditNoteView from '@/views/EditNoteView.vue'
import StatsView from '@/views/StatsView.vue'
import AuthView from '@/views/AuthView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: NotesView,
  },
  {
    path: '/edit-note/:id',
    name: 'edit-note',
    component: EditNoteView,
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const { user, waitUserReady } = useAuthStore()

  await waitUserReady()

  if (!user.id && to.name !== 'auth') {
    return next({ name: 'auth' })
  }

  if (user.id && to.name === 'auth') {
    return next(false)
  }

  return next()
})

export default router
