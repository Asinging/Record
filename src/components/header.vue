<template>
  <v-container class="pa-2 ma-3">
    <v-layout>
      <v-flex xs12 md12 lg12 xl12>
        <v-sheet>
          <v-layout ma-4>
            <v-flex xs6 sm6 md6 lg6 xl6>
              <i class="mt-3 pa-2" width="10" color="orange">
                <img src="img\devImages\avat1.jpg" height="55" width="50" />
              </i>
            </v-flex>

            <v-flex xs12 md12 lg12>
              <span
                class="pa-0 mb-1 header"
                style="color:#436609; font-weight:bold "
                >{{
                  appParams ? appParams.toUpperCase() : headerName.toUpperCase()
                }}</span
              >
            </v-flex>
          </v-layout>
        </v-sheet>
        <v-divider style="width:100%" class="mb-10 mt-1"></v-divider>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
//import HomePage from "./homePage.vue";
export default {
  conponents: {
    //HomePage
  },
  data() {
    return {
      headerName: "welcome, The App need to setup with data you will provide",
    };
  },
  mounted() {
    console.log(this.$store.state.appParams.appName);
  },
  computed: {
    appParams() {
      console.log(this.$store.state.appParams.appName);
      return this.$store.state.appParams.appName;
    },
  },
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
