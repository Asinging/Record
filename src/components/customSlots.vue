<template>
  <v-btn
    @click="clickFnc"
    text
    depressed
    class="pa-3 white--text font-weight-bold"
    color="secondary"
  ><slot name="button" v-bind:btn="btnName">sumbit</slot>
  </v-btn>
</template>
<script>
export default {
  props: {
    btnName: {
      type: String,
    },
    clickFnc: {
      type: Function,
      required: true,
    },
  },
};
</script>
<style scoped></style>
