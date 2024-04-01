<template>
  <nav class="deep-purple darken-3">
    <div class="nav-wrapper container">
      <!-- // TODO: divide to different components -->
      <button v-if="!menuOpened" class="material-icons hide-on-med-and-up white-text menu-button" @click="toggleMenuOpened">menu</button>
      <button v-else class="material-icons hide-on-med-and-up white-text menu-button" @click="toggleMenuOpened">close</button>
      <ul class="hide-on-small-only">
        <li><router-link :to="{ name: 'Books' }">Прочитано</router-link></li>
        <li><router-link :to="{ name: 'Wishlist' }">Хочу прочитать</router-link></li>
        <li v-if="user"><router-link :to="{ name: 'AddBook' }">Добавить прочитанную</router-link></li>
        <li v-else class="right"><router-link :to="{ name: 'Login' }">Войти</router-link></li>
      </ul>
      <!-- // TODO: make it close on click outside
      // TODO: close it when url changes -->
      <transition name="fade">
        <ul v-if="menuOpened" class="nav-menu deep-purple darken-3 z-depth-3">
          <li><router-link :to="{ name: 'Books' }">Прочитано</router-link></li>
          <li><router-link :to="{ name: 'Wishlist' }">Хочу прочитать</router-link></li>
          <li v-if="user"><router-link :to="{ name: 'AddBook' }">Добавить прочитанную</router-link></li>
          <li v-else class="right"><router-link :to="{ name: 'Login' }">Войти</router-link></li>
        </ul>
      </transition>
    </div>
  </nav>
</template>

<script>
import { onMounted, ref } from 'vue'
import { firebase } from '../firebase/init'
export default {
  name: 'Navbar',
  setup() {
    let user = ref(null);
    let menuOpened = ref(false);

    onMounted(() => {
      firebase.auth().onAuthStateChanged(authUser => {
        if (authUser) {
          user.value = authUser
        }
      })
    })

    const toggleMenuOpened = () => {
      menuOpened.value = !menuOpened.value
    }

    return { user, menuOpened, toggleMenuOpened }
  }
}
</script>

<style>
  .nav-wrapper {
    display: flex;
    align-items: center;
  }
  .menu-button {
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 25px;
    user-select: none;
  }
  .menu-button:focus {
    background-color: transparent;
  }
  .menu-button:focus-visible {
    border: 1px solid white;
  }
  @media (max-width: 600px) {
    .nav-menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
</style>
