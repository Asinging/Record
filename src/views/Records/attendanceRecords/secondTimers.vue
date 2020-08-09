<template>
  <v-layout>
    <SearchContentParams />
  </v-layout>
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
  mounted() {
    // alert("yes i have arrived");
  },

  methods: {
    // addRecord() {
    //   this.$router.push({
    //     name: "addFinancialRecord"
    //   });
    // }
  },
};
</script>
<style scoped>
.date {
  font-size: 50px;
}
</style>
