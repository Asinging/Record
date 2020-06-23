
<template >
  <v-container>
    <v-layout>
      <Display-Members></Display-Members>
    </v-layout>
  </v-container>
</template>
<script>
import DisplayMembers from "../../../components/members/displayMembers.vue";
export default {
  name: "Irregular-Members",
  components: {
    "Display-Members": DisplayMembers
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>