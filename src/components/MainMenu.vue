<template>
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
        <v-icon v-if="loved" @click="lovedNote()" color="warning">mdi mdi-heart </v-icon>
        <v-icon v-else @click="lovedNote()">mdi mdi-heart-outline</v-icon>
      </v-btn>
    </v-app-bar>
</template>