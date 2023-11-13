<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <h1 class="navbar-item is-size-4 is-family-monospace">Noteballs</h1>

        <a
          ref="navbarBurger"
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': showMobileNav }"
          data-target="navbarBasicExample"
          @click.prevent="showMobileNav = !showMobileNav"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        ref="navbarMenu"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
      >
        <div class="navbar-start">
          <button
            v-if="user.id"
            class="button is-small is-info mt-3 ml-3"
            @click="handleLogout"
          >
            Log out {{ user.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink to="/" class="navbar-item" active-class="is-active">
            Notes
          </RouterLink>
          <RouterLink to="/stats" class="navbar-item" active-class="is-active">
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'

const { logoutUser, user } = useAuthStore()

router.beforeResolve(() => {
  showMobileNav.value = false
})

const showMobileNav = ref(false)
const navbarMenu = ref(null)
const navbarBurger = ref(null)

function handleLogout() {
  showMobileNav.value = false
  logoutUser()
}

onClickOutside(
  navbarMenu,
  () => {
    showMobileNav.value = false
  },
  { ignore: [navbarBurger] },
)
</script>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
