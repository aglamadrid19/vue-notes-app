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