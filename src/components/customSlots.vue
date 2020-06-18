<template>
  <v-btn
    @click="clickFnc"
    text
    large
    depressed
    tile
    class="ml-1 mb-0 pt-2 pb-2 pl-1 pr-1 white--text addpastordelete"
    color="orange"
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