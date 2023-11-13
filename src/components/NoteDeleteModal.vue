<template>
  <div class="modal is-active px-4">
    <div class="modal-background"></div>
    <div ref="modalCard" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          class="delete"
          aria-label="close"
          @click="handleCancel"
        ></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button type="button" class="button" @click="handleCancel">
          Cancel
        </button>
        <button class="button is-danger" @click="handleDeleteNote">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from '@/stores/note'
import { onClickOutside } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  noteId: { type: String, required: true },
})
const emit = defineEmits(['cancel-delete'])

const { deleteNote } = useNoteStore()

const modalCard = ref(null)

onClickOutside(modalCard, handleCancel)

async function handleDeleteNote() {
  deleteNote(props.noteId)
}

function handleCancel() {
  emit('cancel-delete')
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') handleCancel()
}

onMounted(() => {
  document.addEventListener('keyup', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', handleEscape)
})
</script>
