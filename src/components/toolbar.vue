<template>
  <v-card light>
    <v-toolbar text dense height="90" flat color="primary">
      <v-app-bar-nav-icon @click="drawer()">
        <v-icon color="white">mdi-view-headline</v-icon>
      </v-app-bar-nav-icon>

      <template v-slot:prepend></template>

      <v-toolbar-title class="white-=text text-center">
        <span class="white--text header" bold v-if="admin">{{admin.toUpperCase()}}</span>
        <span class="white--text header" bold v-else>RECORDS MANAGEMENT</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>

      <!-- sign up  -->

      <v-flex xs3 sm2 lg1 md1>
        <!-- <v-layout> -->
        <v-row>
          <v-icon class color="white" ripple="6">person</v-icon>

          <v-card
            class="white--text ml-2"
            outlined
            color="primary"
            id="login"
            @click="userStatusSend($event)"
            ripples
          >{{userStatusBtn}}</v-card>
        </v-row>
        <!-- // </v-layout> -->
      </v-flex>
    </v-toolbar>
  </v-card>
</template>
<script>
// import { eventBus } from "event.js";
export default {
  data() {
    return {
      draw: false
    };
  },
  methods: {
    drawer() {
      this.draw = !this.draw;
      console.log(this.draw);
      this.$store.dispatch("navigationDrawer", this.draw);
    }
  }
};
</script>