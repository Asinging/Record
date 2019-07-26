<template>
  <div id="inspire">
    <v-navigation-drawer v-model="drawer" dark fixed app class="indigo lighten-4" width="270px">
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="blue" class="ma-0">home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="black--text">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action ripple>
            <v-icon color="blue">home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="black--text">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="blue">contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="black--text">Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="indigo  " fixed app height="70px">
      <v-toolbar-side-icon @click="drawer =!drawer"></v-toolbar-side-icon>
      <v-toolbar-title>HOWORDOG</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to: = "./signUp" ripple>
      <v-sheet color="indigo" >
        <v-icon class="pr-2" medium>person</v-icon>
        <v-tile class="mt-0 login">LOGIN</v-tile>
      </v-sheet>
      </router-link>
    </v-toolbar>
  </div>
</template>

 <script>
export default {
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
};
</script>
<style scope>
.customIconsDesign {
  color: red;
  background: blue;
}
.login {
  font-family:rockell-condense;
  font-size: 20px;
}
</style>
