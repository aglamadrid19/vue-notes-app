<script>
  
  export default {
    data() {
      return {
        drawer: false,
        dialog: false,
        edit: false,
        loved: false,
        notes: [],
        noteTitle: "",
        noteContent: "",
        index: null
      }
    },
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
  <MainMenu></MainMenu>
  <v-layout>
    <!-- Page content -->
    <v-main>
      <v-container>
        <v-row justify="center">
          <h2 v-if="notes.length === 0" class="mt-5 text-center">No Notes found.<br>Create a new one</h2>

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
.center-text {
  text-align: center;
}
</style>