<template>
  <v-app>
    <v-main>
      <NoteApp></NoteApp>
    </v-main>
  </v-app>
</template>

<script>

import NoteApp from './components/NoteApp.vue';

export default {
  name: 'App',

  components: {
    NoteApp
},

  data: () => ({
    //
  }),
}
</script>
