
<template></template>
<script>
export default {
  name: "",
  data() {
    return { nameOfComponents: " " };
  },
  beforeMount() {
    this.$router.push({
      name: "leaders"
    });
  }
};
</script>
<style>
</style>