<template>
  <v-container>
    <v-layout>
      <SearchContentParams />
    </v-layout>
    <!-- <p>the lord is good</p> -->
  </v-container>
</template> 
   <script>
import SearchContentParams from "../Records/recordSearchTool.vue";
//import Button from "../../../components/customSlots.vue";
export default {
  components: {
    SearchContentParams
    // "v-Button": Button
  },
  data() {
    return {};
  },
  mounted() {},

  methods: {}
};
</script> <style scoped>
</style>