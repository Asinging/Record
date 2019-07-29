<template>
  <div id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app width="250px">
      <v-sheet height="70px">
        <v-img :src="`./img/devImages/bible1.jpg`" height="70"></v-img>
      </v-sheet>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="indigo" fixed app>
      <v-navigation-drawer-icon @click="drawer =!drawer">
        <v-icon class="mr-3 mt-0" dark>menu</v-icon>
      </v-navigation-drawer-icon>
      <v-toolbar-title class="mt-1 right">HOWORDOG</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-sheet color="indigo" ripple>
        <router-link to="./login">
          <v-icon class="pr-2 mt-0" medium>person</v-icon>
          <span class="mt-5 login" style="font-size:16px" mt-2>LOGIN</span>
        </router-link>
      </v-sheet>
    </v-toolbar>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      drawer: null,
      model: 1,
      items: [
        { icon: "home", text: "Churches" },
        { icon: "person", text: "MOG" },
        { icon: "book", text: "Messages" }
      ]
    };
  },
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
</style>
