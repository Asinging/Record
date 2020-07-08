<template>
  <v-card>
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
    <v-layout>
      <v-flex xs12 md12 lg12>
        <v-sheet class="align-content-center mt-0 pt-5" height="100">
          <v-layout>
            <v-flex xs6 md4 lg6>
              <i class="mt-3 pa-2" width="10" color="orange">
                <img src="img/devImages/newKmiP.jpg" height="55" width="50" />
              </i>
            </v-flex>

            <v-flex xs12 md4 lg8>
              <span
                class="pa-0 mb-1"
                color="orange--text"
                style="color:#436609; font-family:verdana; padding-right:20px; font-weight:bold; font-size:15px"
              >
                KINGDOM MOVEMENT
                <p
                  style="color:#436609; font-family:verdana;  font-weight:bold; font-size:15px; padding-left:20px"
                >INTERNATIONAL</p>
              </span>
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import {eventBus} from "event.js"
export default {
  data() {
    return {
      drawer: false
    };
  },
  methods:{
drawer(){ 
  this.drawer = !this.drawer
  eventBus.$emit("navigationDrawer", this.drawer)
}
  }
  
};
</script>