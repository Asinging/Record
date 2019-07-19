<template>
  <v-app>
    <header/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import header from "./components/header.vue";

export default {
  name: "App",
  components: {
    header
  },
  data() {
    return {
      //
    };
  }
};
</script>
