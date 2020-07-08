<template>
  <v-app>
    <Header />
    <!-- <Toolbar /> -->
    <v-content transition="slide-x-transition">
      <v-card>
        <router-view></router-view>
      </v-card>
    </v-content>
  </v-app>
</template>
<script>
import Header from "./components/header.vue";
// import Toolbar from "./components/toolbar.vue";

export default {
  name: "App",
  components: {
    Header
    // Toolbar
  },
  data() {
    return {};
  }
  // beforeMount() {
  //   if (
  //     localStorage.getItem("branchCode") == null &&
  //     this.$store.getters.getCode == ""
  //   ) {
  //     this.$router.push("/auth");
  //   }
  // }
};
</script>

