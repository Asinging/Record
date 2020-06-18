
<template></template>
<script>
export default {
  name: "Head of Department",
  data() {
    return {
      nameOfComponents: " Head of Department"
    };
  },
  beforeMount() {
    this.$router.push({
      name: "leaders"
    });
  }
};
</script>
<style scoped>
</style>