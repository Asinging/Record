<template>
  <v-toolbar color="orange" text dense height="85" flat>
    <v-app-bar-nav-icon @click.stop="drawer =!drawer" color="white"></v-app-bar-nav-icon>
    <!-- ? <template v-slot:prepend></template> -->
    <v-toolbar-title class="white-=text text-center">
      <span class="white--text header" bold>KMI UNICAL</span>
    </v-toolbar-title>
    <div class="flex-grow-1"></div>

    <!-- sign up  -->

    <v-flex xs2 sm2 lg2>
      <v-layout>
        <v-row>
          <v-icon class color="white" ripple="6">person</v-icon>
          <router-link to="/login" id="login">
            <v-card class="white--text ml-2" outlined id="login" color="orange" ripple>login</v-card>
          </router-link>
        </v-row>
      </v-layout>
    </v-flex>
  </v-toolbar>
</template>