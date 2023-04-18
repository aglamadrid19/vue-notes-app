<template>
  <v-layout>
    <!-- Top menu -->
    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/800/600?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
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
        <v-icon v-if="loved" @click="loved = !loved" color="warning">mdi mdi-heart </v-icon>
        <v-icon v-else @click="loved = !loved">mdi mdi-heart-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Side menu -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >

      <div
        class="d-flex justify-center mt-5"
      >
        <v-list
          nav
          dense
        >
          <v-avatar 
            size="175"
          >
            <v-img src="./../assets/profile-pic.jpg"></v-img>
          </v-avatar>
        </v-list>
      </div>

      <div
        class="d-flex justify-center mt-5"
      >
        <v-btn color="warning" class="mr-3" icon href="https://github.com/aglamadrid19" target="_blank">
          <v-icon>mdi mdi-github</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>

    <!-- Page content -->
    <v-main>
      <v-container>
        <v-row align="center" justify="center">
          <h2 v-if="notes.length === 0" class="mt-5 text-xs-center">No Notes found.<br>Create a new one!</h2>

          <template v-else v-for="(note, index) in notes" :key="index">
            <v-col cols="12">
              <v-card
                elevation="3"
                :title="`${note.title}`"
              >
                <v-card-text>{{ note.content }}</v-card-text>
                <v-card-actions>
                  <v-btn color="warning" icon @click="editNote(index)">
                    <v-icon>mdi mdi-tooltip-edit</v-icon>
                  </v-btn>
                  <v-btn color="warning" icon @click="eraseNote(index)">
                    <v-icon>mdi mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      dialog: false,
      edit: false,
      group: null,
      loved: false,
      notes: [],
      noteTitle: "",
      noteContent: "",
      index: null
    }),
    methods: {
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
        console.log("closed")
      } 
    },
    mounted() {
      if(localStorage.notes) {
        this.notes = JSON.parse(localStorage.notes)
      }
    }
  }
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
.v-layout {
    height: 100%;
}
.v-toolbar {
  align-items: flex-start;
  display: flex;
  flex: 0 1 auto;
}
</style>