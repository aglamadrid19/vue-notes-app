<script>
  export default {
    data: () => ({
      drawer: null,
      loved: false,
    }),
    methods: {
      lovedNote: function() {
        if(localStorage.loved == 1) {
          localStorage.loved = 0
          this.loved = false
        }
        else {
          localStorage.loved = 1
          this.loved = true
        }
      },
    },
    mounted() {
      if(localStorage.loved == 1) {
        this.loved = true
      }
    }
  }
</script>
<template>
  <!-- Top menu -->
  <v-app-bar
    color="teal-darken-4"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <!-- Activate side menu -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title id="logo">
      Notes
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon v-if="loved" @click="lovedNote()" color="warning">mdi mdi-heart </v-icon>
      <v-icon v-else @click="lovedNote()">mdi mdi-heart-outline</v-icon>
    </v-btn>
  </v-app-bar>
    
  <!-- Side menu -->
  <v-navigation-drawer v-model="drawer" temporary>
    <div class="d-flex justify-center mt-5">
      <v-list nav dense>
        <v-avatar size="175">
          <v-img src="./../assets/profile-pic.jpg"></v-img>
        </v-avatar>
      </v-list>
    </div>

    <div class="d-flex justify-center mt-5">
      <v-btn color="warning" class="mr-3" icon href="https://github.com/aglamadrid19" target="_blank">
        <v-icon>mdi mdi-github</v-icon>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
</style>