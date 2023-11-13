<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input"
                type="email"
                autocomplete="email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                type="password"
                autocomplete="current-password"
                placeholder="Enter a password"
              />
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const { registerUser, loginUser } = useAuthStore()

const register = ref(false)
const formTitle = computed(() => (register.value ? 'Register' : 'Login'))

const credentials = reactive({
  email: '',
  password: '',
})

function handleSubmit() {
  if (!credentials.email || !credentials.password) {
    return alert('Please enter an email and password.')
  }

  if (register.value) {
    registerUser(credentials)
    return
  }

  loginUser(credentials)
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin-inline: auto;
}
</style>
