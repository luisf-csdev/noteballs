<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea
          v-model="noteContent"
          class="textarea"
          placeholder="Add a new note"
          @input="handleNoteContent"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['note-content'])

const noteContent = ref('')

function handleNoteContent() {
  emit('note-content', noteContent.value)
}
</script>
