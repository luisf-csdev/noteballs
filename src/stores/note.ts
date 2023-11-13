import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { firestore } from '@/firebase/config'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { useAuthStore } from './auth'

interface Notes {
  id: string
  content: string
  date: string
}

export const useNoteStore = defineStore('noteStore', () => {
  const { user } = useAuthStore()

  const notesCollection = computed(() =>
    user.id ? collection(firestore, 'users', user.id, 'notes') : null,
  )
  const notesDateQuery = computed(() =>
    notesCollection.value
      ? query(notesCollection.value, orderBy('date', 'desc'))
      : null,
  )

  const unsubscribeFirestore = ref<(() => void) | null>(null)

  const notes = ref<Notes[]>([])
  const isNoteReady = ref(false)

  const notesCount = computed(() => notes.value.length)
  const notesCharacterCount = computed(() => {
    let count = 0
    notes.value.forEach((note) => {
      count += note.content.length
    })

    return count
  })

  async function createNote(noteContent: string) {
    const date = new Date().getTime()

    if (notesCollection.value) {
      await addDoc(notesCollection.value, {
        content: noteContent,
        date,
      })
    }
  }

  function readFirestoreNotes() {
    if (notesDateQuery.value) {
      isNoteReady.value = false
      if (unsubscribeFirestore.value) unsubscribeFirestore.value()

      try {
        unsubscribeFirestore.value = onSnapshot(
          notesDateQuery.value,
          (querySnapshot) => {
            const firestoreNotes: Notes[] = []

            querySnapshot.forEach((doc) => {
              const note = {
                id: doc.id,
                content: doc.data().content,
                date: doc.data().date,
              }

              firestoreNotes.unshift(note)
            })

            notes.value = firestoreNotes
            isNoteReady.value = true
          },
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function updateNote(noteId: string, noteContent: string) {
    if (notesCollection.value) {
      await updateDoc(doc(notesCollection.value, noteId), {
        content: noteContent,
      })
    }
  }

  async function deleteNote(noteId: string) {
    if (notesCollection.value) {
      await deleteDoc(doc(notesCollection.value, noteId))
    }
  }

  function clearNotes() {
    notes.value = []
    isNoteReady.value = true
  }

  function getNoteById(noteId: string) {
    const note = notes.value.find((note) => note.id === noteId)
    return note
  }

  function getNoteContent(noteId: string) {
    const note = getNoteById(noteId)
    return note?.content || ''
  }

  return {
    notes,
    isNoteReady,
    notesCount,
    notesCharacterCount,
    createNote,
    readFirestoreNotes,
    updateNote,
    deleteNote,
    clearNotes,
    getNoteContent,
  }
})
