<template>
  <v-app>
    <Header />
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import Header from "./components/header.vue";

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {};
  }
};
</script>

