<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ note.notesCount }}</td>
        </tr>
        <tr>
          <td>Number of Character (all notes)</td>
          <td>{{ note.notesCharacterCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from '@/stores/note'

const note = useNoteStore()
</script>
