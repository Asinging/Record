
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
  mounted() {
    axios
      .get("/members")
      .then((resp) => {
        let response = resp.data;
        if (response.length == []) {
        } else if (response.length) {
          this.$store.dispatch("serverResponse", response);
          this.$router.push({ name: `displayMembers` });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {},
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>