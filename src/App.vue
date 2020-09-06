<template>
  <div>
    <v-app>
      <NavDrawer />
      <!-- <v-main> -->
      <v-content justify-center>
        <v-card class="align-center elavation-0" height="950" flat>
          <Header />
          <transition name="fade">
            <router-view></router-view>
          </transition>
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
    return {};
  },
  mounted() {
    let vueLoaderConfiguration = {
      canCancel: true,
      onCancel: this.onCancel,
      color: "green",
      loader: "spinner",
      height: 20,
      width: 20,
      duration: 3,

      opacity: 0.5,
    };
    localStorage.setItem(
      "vueLoaderConfig",
      JSON.stringify(vueLoaderConfiguration)
    );
  
  },
};
</script>
<style></style>
