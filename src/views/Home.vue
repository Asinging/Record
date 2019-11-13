<template>
  <v-layout>
    <v-flex>
      <v-row>
        <v-flex xs12 sm12 md lg12>
          <v-card v-for="card in cards" :key="card.title" :cols="card.flex" class="mt-3 ml-2 mr-2">
            <v-card-title v-text="card.title" class="card_title"></v-card-title>
            <v-card-text v-text="card.text"></v-card-text>

            <v-flex offset-xs9 offset-sm11>
              <v-card-action>
                <v-btn v-text="card.action" color="orange" class="ma-2 white--text card_action"></v-btn>
              </v-card-action>
            </v-flex>
          </v-card>
        </v-flex>
      </v-row>
    </v-flex>
  </v-layout>
</template>
  <script >
export default {
  name: "home",
  data() {
    return {
      cards: [
        {
          flex: 12,
          title: "MISSION",
          action: "SEE MORE",
          text:
            " ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat"
        },
        {
          flex: 12,
          title: "VISION",
          action: "SEE MORE",
          text:
            "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat"
        },
        {
          flex: 12,
          title: "VALUES  ",
          action: "SEE MORE",
          text:
            "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. id ludus appareat"
        }
      ]
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
</style>