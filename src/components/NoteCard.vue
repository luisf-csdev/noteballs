<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
      </div>
      <div class="columns is-mobile has-text-grey-light mt-2">
        <small class="column">{{ formattedDate }}</small>
        <small class="column has-text-right">{{ characterLength }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/edit-note/${note.id}`" class="card-footer-item"
        >Edit</RouterLink
      >
      <a href="#" class="card-footer-item" @click="handleDeleteClicked">
        Delete
      </a>
      <NoteDeleteModal
        v-show="showDeleteModal"
        :note-id="note.id"
        @cancel-delete="handleCancelDelete"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NoteDeleteModal from './NoteDeleteModal.vue'
import { useDateFormat } from '@vueuse/core'

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
})

const formattedDate = computed(() => {
  const date = new Date(parseInt(props.note.date))
  const formatted = useDateFormat(date, 'YYYY-MM-DD @ HH:mm').value

  return formatted
})

const showDeleteModal = ref(false)

const characterLength = computed(() => {
  const length = props.note.content.length
  const description = length > 1 ? 'characters' : 'character'
  return `${length} ${description}`
})

function handleDeleteClicked() {
  showDeleteModal.value = true
}

function handleCancelDelete() {
  showDeleteModal.value = false
}
</script>
