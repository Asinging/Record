<template>
  <v-container>
    <v-layout>
      <SearchContentParams />
    </v-layout>
    <v-layout>
      <!-- <div class="flex-grow-1"></div> -->
      <v-flex 3 md10 sm9 xs6 lg6>
        <v-Button :clickFnc="addRecord">
          <template #btn>Update Record</template>
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
    "v-Button": Button,
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
        name: "addFinancialRecord",
      });
    },
  },
};
</script>
<style scoped>
.date {
  font-size: 50px;
}
</style>
