
<template >
  <v-container fluid>
    <v-layout>
      <v-Display-Members></v-Display-Members>
    </v-layout>
  </v-container>
</template>
<script>
import DisplayMembers from "../../../components/members/displayMembers.vue";
export default {
  name: "Regular-Members",
  components: {
    "v-Display-Members": DisplayMembers,
  },
  data() {
    return {};
  },
  mounted() {},

  methods: {},
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>