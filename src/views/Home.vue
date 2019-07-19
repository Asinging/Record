<
<template>
  <v-sheet
    color="primary"
    height="80px"
    style="text-align:center; color:white;padding:20px; font:bold 30px rockwell condense"
    md1
  >PENTECOST {{greeting}} </v-sheet>
</template> 

<script>
module.exports = {
  data: function() {
    return {
      greeting: "you are a great man"
    };
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>