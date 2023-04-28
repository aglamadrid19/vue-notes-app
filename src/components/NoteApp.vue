<script>
  
  export default {
    data() {
      return {
        dialog: false,
        edit: false,
        notes: [],
        noteTitle: "",
        noteContent: "",
        index: null
      }
    },
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
        console.log("edit note")
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
      if(localStorage.notes) {
        this.notes = JSON.parse(localStorage.notes)
      }
    }
  }
</script>

<template>
  <MainMenu></MainMenu>
  <v-layout>
    <!-- Page content -->
    <v-main>
      <v-container>
        <v-row align="center">
          <!-- New / Edit Note dialog -->
          <v-dialog
            v-model="dialog"
            fullscreen
            :scrim="true"
          >

            <template v-slot:activator="{ props }">
              <v-col cols="12" class="d-flex justify-center">
                <v-btn
                  icon
                  v-bind="props"
                >
                  <v-icon>mdi mdi-note-plus</v-icon>
                </v-btn>
              </v-col>
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

          <v-col v-if="notes.length === 0" cols="12">
            <h2 class="mt-5 text-center">no notes found<br>create a new one</h2>
          </v-col>
          
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

<style scoped>
.v-layout {
    height: 100%;
}
.v-toolbar {
  align-items: flex-start;
  display: flex;
  flex: 0 1 auto;
}
.center-text {
  text-align: center;
}
</style>