<template>
  <div class="card p-4 mb-5" :class="`has-background-${background}-dark`">
    <div class="field">
      <div class="control">
        <label v-if="label" class="label has-text-white">{{ label }}</label>
        <textarea
          ref="noteTextarea"
          v-model="noteContent"
          v-autofocus
          class="textarea"
          :placeholder="placeholder"
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
import { ref, watchEffect } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus'

const props = defineProps({
  content: { type: String, required: true },
  background: { type: String, default: 'success' },
  placeholder: { type: String, required: true },
  label: { type: String, default: '' },
})

const emit = defineEmits(['update-note-content'])

const noteContent = ref('')
const noteTextarea = ref<HTMLTextAreaElement | null>(null)

watchEffect(() => {
  noteContent.value = props.content
})

function handleNoteContent() {
  emit('update-note-content', noteContent.value)
}

function handleFocus() {
  noteTextarea.value?.focus()
}

defineExpose({
  handleFocus,
})
</script>
