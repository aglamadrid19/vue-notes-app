<script>
import SideMenu from './SideMenu.vue'

  export default {
    components: {
      SideMenu
    },
    data: () => ({
      dialog: false,
      edit: false,
      loved: false,
      notes: [],
      noteTitle: "",
      noteContent: "",
      index: null
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
      eraseNote: function(noteId) {
        this.notes.splice(noteId, 1);
        localStorage.notes = JSON.stringify(this.notes)
      },
      saveNote: function(index) {
        // Edit or new Note
        if(index !== null) {
          // Edit
          this.notes[index] = {title: this.noteTitle, content: this.noteContent};
          localStorage.notes = JSON.stringify(this.notes)
        } else {
          // First note
          if (!localStorage.notes) {
            localStorage.notes = JSON.stringify([{title: this.noteTitle, content: this.noteContent}]);
          } else {  
            // More notes
            localStorage.notes = JSON.stringify([{title: this.noteTitle, content: this.noteContent}, ...JSON.parse(localStorage.notes)]);
          }
          // Complete update on local app state
          this.notes = JSON.parse(localStorage.notes)
        }
        
        // Reset status
        this.edit = false
        this.dialog = false;
        this.index = null;
        this.noteTitle = "";
        this.noteContent = "";
      },
      editNote: function(index) {
        this.index = index;
        this.edit = true;
        this.noteTitle = this.notes[index].title;
        this.noteContent = this.notes[index].content;
        this.dialog = true;
      },
      closeNote: function() {
        this.dialog = false;
        this.index = null;
        this.edit = false;
        this.noteTitle = "";
        this.noteContent = "";
      } 
    },
    mounted() {
      if(localStorage.loved == 1) {
        this.loved = true
      }
      if(localStorage.notes) {
        this.notes = JSON.parse(localStorage.notes)
      }
    }
  }
</script>
<template>
  <!-- Top menu -->
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>



    <template v-slot:prepend>
      <SideMenu></SideMenu>
    </template>

    <v-app-bar-title id="logo">
      Notes
    </v-app-bar-title>

    <v-spacer></v-spacer>
    
    <!-- New / Edit Note dialog -->
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="true"
      transition="dialog-bottom-transition"
    >

      <template v-slot:activator="{ props }">
        <v-btn 
          icon
          v-bind="props"
        >
          <v-icon>mdi mdi-note-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-toolbar
          dark
          color="warning"
        >
          <v-btn
            icon
            dark
            @click="closeNote()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title v-if="edit === false">New Note</v-toolbar-title>
          <v-toolbar-title v-else>Edit Note</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              text
              @click="saveNote(index)"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-text-field
            v-model="noteTitle"
            class="mt-4"
            label="Title"
            variant="outlined"
          ></v-text-field>
          <v-textarea
            v-model="noteContent"
            background-color="light-blue"
            color="black"
            label="Note"
          ></v-textarea>
        </v-container>
      </v-card>
    </v-dialog>

    <v-btn icon>
      <v-icon v-if="loved" @click="lovedNote()" color="warning">mdi mdi-heart </v-icon>
      <v-icon v-else @click="lovedNote()">mdi mdi-heart-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

