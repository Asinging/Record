<template>
  <div>
    <v-app>
      <NavDrawer />
      <!-- <v-main> -->
      <v-content justify-center>
        <v-card class=" align-center elavation-0" height="800" flat>
          <Header />
          <transition name="fadde"><router-view></router-view></transition>
        </v-card>
      </v-content>
      <!-- </v-main> -->
    </v-app>
  </div>
  <!-- </v-app> -->
</template>
<script>
import NavDrawer from "./components/navigationDrawer.vue";
import Toolbar from "./components/toolbar.vue";
import Header from "./components/header.vue";

export default {
  name: "App",
  components: {
    NavDrawer,

    Header,
  },
  data() {
    return {
      // dark: false
    };
  },
};
</script>
<style></style>
