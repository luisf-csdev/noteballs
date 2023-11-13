<template>
  <div class="notes">
    <NoteControlAdd />
    <NoteLoading v-if="!noteStore.isNoteReady || !user.isReady" />
    <div v-else>
      <NoteCard v-for="note in noteStore.notes" :key="note.id" :note="note" />
      <NoteCardPlaceholder v-if="!noteStore.notes.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteCard from '@/components/NoteCard.vue'
import NoteCardPlaceholder from '@/components/NoteCardPlaceholder.vue'
import NoteControlAdd from '@/components/NoteControlAdd.vue'
import NoteLoading from '@/components/NoteLoading.vue'
import { useAuthStore } from '@/stores/auth'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { user } = useAuthStore()
</script>
