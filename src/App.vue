<template>
  <v-app>
    <v-main>
      <MainMenu></MainMenu>
      <NoteApp></NoteApp>
    </v-main>
  </v-app>
</template>

<script>
import NoteApp from './components/NoteApp.vue';
import MainMenu from './components/MainMenu.vue'

export default {
  name: 'App',

  components: {
    MainMenu,
    NoteApp,
    
},

  data() {
    return {
      //
    }
  },
}
</script>
