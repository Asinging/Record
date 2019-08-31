<template>
  <v-app light>
    <Header />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
import Header from "./components/header.vue";
import Home from "/Home.vue";

export default {
  name: "App",
  components: {
    Header,
    Home
  },
  data() {
    return {
      message: ""
      //
    };
  }
};
</script>
