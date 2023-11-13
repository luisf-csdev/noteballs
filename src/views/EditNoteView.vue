<template>
  <div class="edit-note">
    <BaseNoteControl
      :label="`Edit note`"
      placeholder="Edit note"
      background="link"
      :content="editNoteContent"
      @update-note-content="updateEditNoteContent"
    >
      <RouterLink to="/" class="button is-link is-light">Cancel</RouterLink>
      <button
        :disabled="!editNoteContent"
        class="button is-link has-background-link"
        @click="handleUpdateNote"
      >
        Save Note
      </button>
    </BaseNoteControl>
  </div>
</template>

<script setup lang="ts">
import BaseNoteControl from '@/components/common/BaseNoteControl.vue'
import { useNoteStore } from '@/stores/note'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const { updateNote, getNoteContent } = useNoteStore()
const { params } = useRoute()
const noteId = params.id as string

const editNoteContent = ref('')
const noteControl = ref<typeof BaseNoteControl | null>(null)

function updateEditNoteContent(noteContent: string) {
  editNoteContent.value = noteContent
}

async function handleUpdateNote() {
  updateNote(noteId, editNoteContent.value)
  router.push({ name: 'notes' })
}

onMounted(() => {
  editNoteContent.value = getNoteContent(noteId)
  noteControl.value?.handleFocus()
})
</script>
