<template>
  <v-container fluid grid-list-md pa-2>
    <v-layout wrap align-content-space-around text-xs-center>
      <v-flex xs6 lg6>
        <v-card height="100" class="ma-2" color="indigo">
          <v-icon>book</v-icon>
          <v-card-text class="control_cards">recent messages</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 lg6>
        <v-card height="100" class="ma-2" color="indigo">
          <v-icon>upload</v-icon>
          <v-card-text class="control_cards">most view</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 lg6>
        <v-card height="100" class="ma-2" color="indigo">
          <v-icon>person</v-icon>
          <v-card-text class="control_cards">upload</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 lg6>
        <v-card height="100" class="ma-2" color="indigo">
          <v-icon></v-icon>
          <v-card-text class="control_cards">overview</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {};
</script> 

 
<style scope>
.control_cards {
  font-size: 20px;
  color: white;
  font-family: rockwell-condense;
}
</style>
u