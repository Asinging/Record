<template>
  <div>
    <v-app>
    <Header />
    <v-main>
      <v-content transition="slide-x-transition">
        <v-card flat color="white" class="main_view">
          <Header2 />
          <router-view></router-view>
        </v-card>
      </v-content>
    </v-main>
     </v-app> 
  </div>
  <!-- </v-app> -->
</template>
<script>
import Header from "./components/header.vue";
import Header2 from "./components/header2.vue";

export default {
  name: "App",
  components: {
    Header,
    Header2
  },
  data() {
    return {};
  }
};
</script>
<style>
</style>

