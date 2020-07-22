<template >
  <v-container class="pa-2">
    <v-layout>
      <v-flex xs12 md12 lg12>
        <v-sheet height="80">
          <v-layout>
            <v-flex xs6 md4 lg6 flat>
              <i class="mt-3 pa-2" width="10" color="orange">
                <img src="img\devImages\avat1.jpg" height="55" width="50" />
              </i>
            </v-flex>

            <v-flex xs12 md4 lg8>
              <span
                class="pa-0 mb-1 header"
                color="orange--text"
                style="color:#436609"
              >{{orgName.toUpperCase()}}</span>
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script >
//import HomePage from "./homePage.vue";
export default {
  conponents: {
    //HomePage
  },
  data() {
    return {
      orgName: "welcome you need to set our app up for effectiveness"
    };
  }
};
</script>
<style scoped>
#login {
  border-width: 0px;
}
.card_title {
  font-size: 20px;
  font-weight: bold;
  font-family: helvetica;
  color: #436609;
}
.card_action {
  font-family: helvetica;
  font-weight: bold;
  padding: 3px !important;
}
#login {
  text-decoration: none;
}
</style>