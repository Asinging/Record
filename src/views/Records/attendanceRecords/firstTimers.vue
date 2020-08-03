<template>
  <v-container>
    <v-layout justify-center>
      <v-card class="elevation-0"><SearchContentParams /></v-card>
    </v-layout>
    <!-- <p>the lord is good</p> -->
  </v-container>
</template>
<script>
import SearchContentParams from "../recordSearchTool.vue";
//import Button from "../../../components/customSlots.vue";
export default {
  components: {
    SearchContentParams,
    // "v-Button": Button
  },
  data() {
    return {};
  },
  mounted() {},

  methods: {},
};
</script>
<style scoped></style>
