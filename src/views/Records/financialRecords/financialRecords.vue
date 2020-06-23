<template>
  <v-container>
    <v-layout>
      <SearchContentParams />
    </v-layout>
    <v-layout>
      <v-flex offset-xs7>
        <v-Button :clickFnc="addRecord">
          <template #btn>add to record</template>
        </v-Button>
      </v-flex>
    </v-layout>
  </v-container>
</template> 
 <script>
import SearchContentParams from "../recordSearchTool.vue";
import Button from "../../../components/customSlots.vue";
export default {
  components: {
    SearchContentParams,
    "v-Button": Button
  },
  data() {
    return {};
  },
  mounted() {
    // alert("yes i have arrived");
  },

  methods: {
    addRecord() {
      this.$router.push({
        name: "addFinancialRecord"
      });
    }
  }
};
</script>
<style scoped>
.date {
  font-size: 50px;
}
</style>