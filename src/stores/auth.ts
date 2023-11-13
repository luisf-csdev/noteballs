import { defineStore } from 'pinia'
import { firebaseAuth } from '@/firebase/config'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { reactive, watchEffect } from 'vue'
import router from '@/router'
import { useNoteStore } from './note'

interface Credentials {
  email: string
  password: string
}

export const useAuthStore = defineStore('authStore', () => {
  const baseUser = {
    id: '',
    email: '',
    isReady: false,
  }

  const user = reactive({ ...baseUser })

  async function registerUser(credentials: Credentials) {
    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        credentials.email,
        credentials.password,
      )

      await handleAuthRedirect()
    } catch (error) {
      console.error(error)
    }
  }

  async function loginUser(credentials: Credentials) {
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        credentials.email,
        credentials.password,
      )

      await handleAuthRedirect()
    } catch (error) {
      console.error(error)
    }
  }

  async function logoutUser() {
    try {
      await signOut(firebaseAuth)
      router.replace({ name: 'auth' })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleAuthRedirect() {
    await router.push({ name: 'notes' })
  }

  async function waitUserReady() {
    return new Promise<void>((resolve) => {
      watchEffect(() => {
        if (user.isReady) {
          resolve()
        }
      })
    })
  }

  onAuthStateChanged(firebaseAuth, (authUser) => {
    const { readFirestoreNotes, clearNotes } = useNoteStore()

    user.isReady = false

    if (!authUser) {
      Object.assign(user, baseUser)
      clearNotes()
    } else {
      user.id = authUser.uid
      if (authUser.email) user.email = authUser.email

      readFirestoreNotes()
    }
    user.isReady = true
  })

  return {
    user,
    registerUser,
    loginUser,
    logoutUser,
    waitUserReady,
  }
})
