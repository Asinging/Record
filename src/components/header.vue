<template >
  <v-container class="pa-2">
    <v-layout>
      <v-flex xs12 md12 lg12>
        <v-sheet height="80">
          <v-layout>
            <v-flex xs6 md4 lg6 flat>
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
      // cards: [
      //   {
      //     flex: 12,
      //     title: "MISSION",
      //     action: "SEE MORE",
      //     text:
      //       " ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat"
      //   },
      //   {
      //     flex: 12,
      //     title: "VISION",
      //     action: "SEE MORE",
      //     text:
      //       "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat"
      //   },
      //   {
      //     flex: 12,
      //     title: "VALUES  ",
      //     action: "SEE MORE",
      //     text:
      //       "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. id ludus appareat"
      //   }
      // ]
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