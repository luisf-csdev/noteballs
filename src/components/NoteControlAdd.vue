<template>
  <BaseNoteControl
    ref="noteControl"
    placeholder="Add a new note"
    :content="newNoteContent"
    @update-note-content="updateNewNoteContent"
  >
    <button
      :disabled="isButtonDisabled"
      class="button is-link has-background-success"
      @click="handleAddNewNote"
    >
      Add New Note
    </button>
  </BaseNoteControl>
</template>

<script setup lang="ts">
import BaseNoteControl from './common/BaseNoteControl.vue'
import { useNoteStore } from '@/stores/note'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const { createNote } = useNoteStore()

const newNoteContent = ref('')

const isButtonDisabled = computed(() => !newNoteContent.value.trim())
const noteControl = ref<typeof BaseNoteControl | null>(null)

function updateNewNoteContent(noteContent: string) {
  newNoteContent.value = noteContent
}

function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleAddNewNote()
  }
}

function handleAddNewNote() {
  if (isButtonDisabled.value) return

  createNote(newNoteContent.value)
  newNoteContent.value = ''

  noteControl.value?.handleFocus()
}

onMounted(() => {
  document.addEventListener('keydown', handleEnter)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEnter)
})
</script>
