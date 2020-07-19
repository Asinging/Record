<template>
  <v-btn
    @click="clickFnc"
    text
    depressed
    class="ma-2 mt-0 ml-1 mb-0 pt-2 pb-2 pl-1 pr-1 white--text font-weight-bold"
    color="secondary"
  >
    <slot name="btn" v-bind:btnName="btnName">sumbit</slot>
  </v-btn>
</template>
<script>
export default {
  props: {
    btnName: {
      type: String
    },
    clickFnc: {
      type: Function,
      required: true
    }
  }
};
</script>
<style scoped></style>
