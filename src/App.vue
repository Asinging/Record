<template>
  <div>
    <v-app dark>
      <NavDrawer />
      <v-main>
        <v-content transition="slide-x-transition">
          <v-card flat color="white" class="main_view">
            <!-- // <Toolbar /> -->
            <Header />
            <router-view></router-view>
          </v-card>
        </v-content>
      </v-main>
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
    Toolbar,
    Header
  },
  data() {
    return {
      // dark: false
    };
  },
  mounted() {}
};
</script>
<style>
</style>

